import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Injectable } from '@angular/core';
import { FileType } from '../../interfaces/media/file-type.interface';
import { AngularFirestore } from 'angularfire2/firestore';
import { IUploaderOptions } from '../../interfaces/media/uploader-options.interface';
import { Upload } from './upload.class';
import { AuthService } from '../auth/auth.service';
import { MediaItemService } from './media-item.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

export type FilterFunction = {
  name: string,
  fn: (upload?: Upload, options?: IUploaderOptions) => boolean
};

@Injectable()
export class MediaUploaderService {

  private _failFilterIndex: number;

  public options: IUploaderOptions = {
    filters: []
  };

  constructor(private authService: AuthService,
    private storage: AngularFireStorage,
    private mediaItemService: MediaItemService,
    private afs: AngularFirestore) {
 }

  public upload(upload: Upload, options: IUploaderOptions): AngularFireUploadTask {

    options.id = this.afs.createId();
    options.path = options.path ? options.path + '/' + options.id : options.id;

    this.initOptions(options);
    const arrayOfFilters = this._getFilters(this.options.filters ? this.options.filters : []);

    var data = {
      path : options.path
    }

    this.afs.collection("uploader").doc("images").set(data);

    if (this._isValidFile(upload, arrayOfFilters, this.options)) {

      try {
        return this.storage.upload(options.path, upload.file, {
          customMetadata: {
            id: options.id
          }
        });
      } catch (e) {
        upload.error = Observable.throw({
          message: e.message,
          file: upload.file.name
        });
      }
    } else {
      const filter: any = arrayOfFilters[this._failFilterIndex];
      upload.error = Observable.throw({
        message: filter.name,
        file: upload.file.name
      });
    }

    return null;
  }

  private initOptions(options: IUploaderOptions) {
    this.options = (<any>Object).assign(this.options, options);

    if (this.options.queueLimit) {
      this.options.filters.unshift({
        name: 'queueLimit',
        fn: this._queueLimitFilter
      });
    }

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
      return this.options.filters ? this.options.filters : [];
    }
    if (Array.isArray(filters)) {
      return filters;
    }

    const names = filters.match(/[^\s,]+/g);
    return this.options.filters.filter((filter: any) => names.indexOf(filter.name) !== -1);
  }

  private _queueLimitFilter(): boolean {
    return this.options.queueLimit === undefined || this.options.queueSize <= this.options.queueLimit;
  }

  private _fileSizeFilter(upload: Upload): boolean {
    return !(this.options.maxFileSize && upload.file.size > this.options.maxFileSize);
  }

  private _mimeTypeFilter(upload: Upload): boolean {
    console.log(upload);
    return !(this.options.allowedMimeType && this.options.allowedMimeType.indexOf(upload.file.type) === -1);
  }

  private _fileTypeFilter(upload: Upload): boolean {
    return !(this.options.allowedFileType && this.options.allowedFileType.indexOf(FileType.getMimeClass(upload)) === -1);
  }

  private _isValidFile(file: Upload, filters: FilterFunction[], options: IUploaderOptions): boolean {
    this._failFilterIndex = -1;
    return !filters.length ? true : filters.every((filter: FilterFunction) => {
      this._failFilterIndex++;
      console.log(filter);
      console.log(options);
      return filter.fn.call(this, file, options);
    });
  }

  public getDownloadUrl(){
    return  this.afs.doc<String>("uploader/images").valueChanges();
  }

}
