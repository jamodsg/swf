import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { AngularFireStorage } from 'angularfire2/storage';
import { Injectable } from '@angular/core';
import { IUploderOptions } from '../../interfaces/media/uploader-config.interface';
import { FileType } from '../../interfaces/media/file-type.interface';
import { AngularFireUploadTask } from 'angularfire2/storage/task';
import { AngularFirestore } from 'angularfire2/firestore';
import { FileLikeObject } from 'ng2-file-upload';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

export type FilterFunction = {
  name: string,
  fn: (item?: FileLikeObject, options?: IUploderOptions) => boolean
};

@Injectable()
export class MediaUploaderService {

  public uploadPercent: Observable<number>;
  public downloadUrl: Observable<string>;
  public uploadErrors: Observable<any>;

  public options: IUploderOptions = {
    filters: []
  };

  private queueSize: number;
  private _failFilterIndex: number;

  constructor(private storage: AngularFireStorage, private afs: AngularFirestore) {
  }

  public uploadFiles(files, options): Observable<any[]> {
    const uploadPath = options.path + '/' + options.id + '/' + this.afs.createId();

    this.setOptions(options);

    const arrayOfFilters = this._getFilters(this.options.filters);

    const list: File[] = [];
    for (const file of files) {
      list.push(file);
    }
    this.queueSize = list.length;

    return Observable.of(
      list.map((some: File) => {

        const temp = new FileLikeObject(some);

        if (typeof some.size !== 'number') {
          return Observable.throw({
            message: 'The file specified is no longer valid',
            file: some.name
          });
        }

        if (this._isValidFile(temp, arrayOfFilters, this.options)) {
          const task = this.storage.upload(uploadPath, some);
          return {
            percentageChanges: task.percentageChanges(),
            downloadUrl: task.downloadURL()
          };
        } else {
          const filter: any = arrayOfFilters[this._failFilterIndex];
          return Observable.throw({
            message: filter.name,
            file: some.name
          });
        }
      })
    );
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
    return this.options.queueLimit === undefined || this.queueSize <= this.options.queueLimit;
  }

  private _fileSizeFilter(item: FileLikeObject): boolean {
    return !(this.options.maxFileSize && item.size > this.options.maxFileSize);
  }

  private _mimeTypeFilter(item: FileLikeObject): boolean {
    return !(this.options.allowedMimeType && this.options.allowedMimeType.indexOf(item.type) === -1);
  }

  private _fileTypeFilter(item: FileLikeObject): boolean {
    return !(this.options.allowedFileType && this.options.allowedFileType.indexOf(FileType.getMimeClass(item)) === -1);
  }

  private _isValidFile(file: FileLikeObject, filters: FilterFunction[], options: IUploderOptions): boolean {
    this._failFilterIndex = -1;
    return !filters.length ? true : filters.every((filter: FilterFunction) => {
      this._failFilterIndex++;
      return filter.fn.call(this, file, options);
    });
  }

}
