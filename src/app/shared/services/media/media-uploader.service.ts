import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Injectable } from '@angular/core';
import { FileType } from '../../interfaces/media/file-type.interface';
import { AngularFirestore } from 'angularfire2/firestore';
import { IUploaderOptions } from '../../interfaces/media/uploader-options.interface';
import { Upload } from './upload.class';
import { IMediaItem } from '../../interfaces/media/media-item.interface';
import { AuthService } from '../auth/auth.service';
import { MediaItemService } from './media-item.service';
import 'rxjs/add/observable/fromPromise';
import * as firebase from 'firebase';
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;

export type FilterFunction = {
  name: string,
  fn: (item?: Upload, options?: IUploaderOptions) => boolean
};

@Injectable()
export class MediaUploaderService {

  public options: IUploaderOptions = {
    filters: [],
    queueLimit: 999
  };

  private _failFilterIndex: number;

  public task: AngularFireUploadTask;

  public percent$: Observable<number>;
  public url$: Observable<string>;
  public state$: Observable<string>;
  public bytes$: Observable<number[]>;
  public mediaItem$: Promise<IMediaItem>;


  constructor(private authService: AuthService,
              private storage: AngularFireStorage,
              private mediaItemService: MediaItemService,
              private afs: AngularFirestore) {
  }

  public upload(upload: Upload, options): Promise<IMediaItem> {

    upload.id = this.afs.createId();
    const uploadPath = options.path + '/' + options.id + '/' + upload.id;

    this.setOptions(options);
    const arrayOfFilters = this._getFilters(this.options.filters);

    if (typeof upload.file.size !== 'number') {
      upload.error = Observable.of({
        message: 'The file specified is no longer valid',
        file: upload.file.name
      });
    }

    if (this._isValidFile(upload, arrayOfFilters, this.options)) {
      let storageRef = firebase.storage().ref();
      let uploadTask = storageRef.child(uploadPath).put(upload.file);

      this.percent$ = this.task.percentageChanges();
      this.state$ = this.task.snapshotChanges().map(task => {
        return task.bytesTransferred === task.totalBytes ? 'success' : task.state;
      });
      this.bytes$ = this.task.snapshotChanges().map(task => [task.bytesTransferred, task.totalBytes]);
      this.url$ = this.task.downloadURL();

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: UploadTaskSnapshot) => {
          console.log(snapshot);
        },
        (error: any) => {
          upload.error = Observable.of({
            message: error.message,
            file: upload.file.name
          });
          console.log(error);
        },
        () => {
          upload.downloadUrl = uploadTask.snapshot.downloadURL;
          upload.name = upload.file.name;
          upload.assignedObjects = [{
            id: options.id,
            type: options.path
          }];
          const mediaItem = this.mediaItemService.setNewMediaItem(upload);
          this.mediaItem$ = this.mediaItemService.createMediaItem(mediaItem);
        });

      if (this.mediaItem$) {
        console.log(this.mediaItem$);
        return Promise.resolve(this.mediaItem$);
      }
    } else {
      const filter: any = arrayOfFilters[this._failFilterIndex];
      console.log(filter.name);
      upload.error = Observable.of({
        message: filter.name,
        file: upload.file.name
      });
    }
  }

  /*
  private deleteFileData(key: string) {
    console.log(key);
    return Promise.resolve();
  }

  deleteFile(upload: Upload) {
    this.deleteFileData(upload.id).then(() => {
      this.deleteFileStorage(upload.name);
    }).catch((error) => console.log(error));
  }

  public deleteFileStorage(name: string) {
    console.log(name);
    // return this.storage.storage.ref().delete(name);
  } */

  private setOptions(options: IUploaderOptions) {
    this.options = (<any>Object).assign(this.options, options);

    this.options.filters.unshift({
      name: 'queueLimit',
      fn: this._queueLimitFilter
    });

    if (this.options.maxFileSize) {
      this.options.filters.unshift({
        name: 'fileSize',
        fn: this._fileSizeFilter
      });
    }

    if (this.options.allowedFileType) {
      this.options.filters.unshift({
        name: 'fileType',
        fn: this._fileTypeFilter
      });
    }

    if (this.options.allowedMimeType) {
      this.options.filters.unshift({
        name: 'mimeType',
        fn: this._mimeTypeFilter
      });
    }
  }

  private _getFilters(filters: FilterFunction[] | string): FilterFunction[] {
    if (!filters) {
      return this.options.filters;
    }
    if (Array.isArray(filters)) {
      return filters;
    }
    if (typeof filters === 'string') {
      const names = filters.match(/[^\s,]+/g);
      return this.options.filters
        .filter((filter: any) => names.indexOf(filter.name) !== -1);
    }
    return this.options.filters;
  }

  private _queueLimitFilter(): boolean {
    return this.options.queueLimit === undefined || this.options.queueSize <= this.options.queueLimit;
  }

  private _fileSizeFilter(item: Upload): boolean {
    return !(this.options.maxFileSize && item.size > this.options.maxFileSize);
  }

  private _mimeTypeFilter(item: Upload): boolean {
    return !(this.options.allowedMimeType && this.options.allowedMimeType.indexOf(item.file.type) === -1);
  }

  private _fileTypeFilter(item: Upload): boolean {
    return !(this.options.allowedFileType && this.options.allowedFileType.indexOf(FileType.getMimeClass(item.file)) === -1);
  }

  private _isValidFile(file: Upload, filters: FilterFunction[], options: IUploaderOptions): boolean {
    this._failFilterIndex = -1;
    return !filters.length ? true : filters.every((filter: FilterFunction) => {
      this._failFilterIndex++;
      return filter.fn.call(this, file, options);
    });
  }

}
