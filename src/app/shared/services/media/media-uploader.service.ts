import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Injectable } from '@angular/core';
import { FileType } from '../../interfaces/media/file-type.interface';
import { AngularFirestore } from 'angularfire2/firestore';
import { IUploaderOptions } from '../../interfaces/media/uploader-options.interface';
import { Upload } from './upload.class';
import { AuthService } from '../auth/auth.service';
import { MediaItemService } from './media-item.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

export type FilterFunction = {
  name: string,
  fn: (item?: Upload, options?: IUploaderOptions) => boolean
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

  public upload(upload: Upload, options): AngularFireUploadTask {

    upload.id = this.afs.createId();
    upload.path = options.path + '/' + options.id + '/' + upload.id;

    this.initOptions(options);
    const arrayOfFilters = this._getFilters(this.options.filters ? this.options.filters : []);

    if (typeof upload.file.size !== 'number') {
      upload.error = Observable.throw({
        message: 'The file specified is no longer valid',
        file: upload.file.name
      });
    }

    if (this._isValidFile(upload, arrayOfFilters, this.options)) {
      return this.storage.upload(upload.path, upload.file, {
        customMetadata: {
          id: upload.id
        }
      });

    } else {
      const filter: any = arrayOfFilters[this._failFilterIndex];
      upload.error = Observable.throw({
        message: filter.name,
        file: upload.file.name
      });
    }
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
    return !(this.options.maxFileSize && item.file.size > this.options.maxFileSize);
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
