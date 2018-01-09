import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { AngularFireStorage } from 'angularfire2/storage';
import { Injectable } from '@angular/core';
import { FileType } from '../../interfaces/media/file-type.interface';
import { AngularFirestore } from 'angularfire2/firestore';
import { IUploderOptions } from '../../interfaces/media/uploader-options.interface';
import { Upload } from './upload.class';
import { IMediaItem } from '../../interfaces/media/media-item.interface';
import { AuthService } from '../auth/auth.service';

export type FilterFunction = {
  name: string,
  fn: (item?: Upload, options?: IUploderOptions) => boolean
};

@Injectable()
export class MediaUploaderService {

  public options: IUploderOptions = {
    filters: [],
    queueLimit: 999
  };

  private _failFilterIndex: number;
  private uploadId: string;

  constructor(private authService: AuthService,
              private storage: AngularFireStorage,
              private afs: AngularFirestore) {
  }

  public upload(upload: Upload, options): Observable<any> {
    this.uploadId = this.afs.createId();

    const uploadPath = options.path + '/' + options.id + '/' + this.uploadId;

    this.setOptions(options);
    const arrayOfFilters = this._getFilters(this.options.filters);

    if (typeof upload.file.size !== 'number') {
      upload.error = Observable.of({
        message: 'The file specified is no longer valid',
        file: upload.file.name
      });
    }

    if (this._isValidFile(upload, arrayOfFilters, this.options)) {
      const task = this.storage.upload(uploadPath, upload.file, {
        customMetadata: {
          id: this.uploadId,
        }
      });
      upload.id = this.uploadId;
      upload.assignedObjectId = options.id;
      upload.assignedObjectType = options.path;
      upload.percentageChanges = task.percentageChanges();
      upload.downloadUrl = task.downloadURL();
      upload.name = upload.file.name;

      return this.saveFileData(upload);
    } else {
      const filter: any = arrayOfFilters[this._failFilterIndex];
      console.log(filter.name);
      upload.error = Observable.of({
        message: filter.name,
        file: upload.file.name
      });
    }
  }

  private saveFileData(upload: Upload): Observable<IMediaItem> {
    return upload.downloadUrl.map((downloadUrl: string) => {
      const data: IMediaItem = {
        id: upload.id,
        assignedObjectId: upload.assignedObjectId,
        assignedObjectType: upload.assignedObjectType,
        downloadUrl: downloadUrl,
        name: upload.name,
        size: upload.file.size,
        type: upload.file.type,
        isExternal: false,
        creation: this.authService.getCreation()
      };
      this.afs.doc('media/' + upload.id).set(data);
      return data;
    });
  }

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
  }

  private setOptions(options: IUploderOptions) {
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

  private _isValidFile(file: Upload, filters: FilterFunction[], options: IUploderOptions): boolean {
    this._failFilterIndex = -1;
    return !filters.length ? true : filters.every((filter: FilterFunction) => {
      this._failFilterIndex++;
      return filter.fn.call(this, file, options);
    });
  }

}