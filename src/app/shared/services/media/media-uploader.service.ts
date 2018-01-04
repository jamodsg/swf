import { Observable } from 'rxjs/Observable';
import { AngularFireStorage } from 'angularfire2/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class MediaUploaderService {

  uploadPercent: Observable<number>;
  downloadUrl: Observable<string>;

  constructor(private storage: AngularFireStorage){
  }

  uploadFiles(files, options){

    const uploadPath = options.path + '/' + options.id;
    console.log(options);

    for(let i = 0; i < files.length; i++){
      console.log(files[i]);
    }
  }

  /*
  public setOptions(options: FileUploaderOptions): void {
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

    for (let i = 0; i < this.queue.length; i++) {
      this.queue[i].url = this.options.url;
    }
  }

  private _generateUniqueId(n: number = 5) {
    return (Math.random().toString(36) + '00000000000000000').slice(2, n + 2);
  }

  public addToQueue(files: File[], options?: FileUploaderOptions, filters?: FilterFunction[] | string): void {

    const list: File[] = [];
    for (const file of files) {
      list.push(file);
    }
    const arrayOfFilters = this._getFilters(filters);
    const count = this.queue.length;
    const addedFileItems: FileItem[] = [];

    list.map((some: File) => {
      if (!options) {
        options = this.options;
      }
      const temp = new FileLikeObject(some);
      if (this._isValidFile(temp, arrayOfFilters, options)) {
        const fileItem = new FileItem(this, some, options);
        addedFileItems.push(fileItem);
        this.queue.push(fileItem);
      } else {
        const filter = arrayOfFilters[this._failFilterIndex];
        this.error = filter;
      }
    });

    if (this.queue.length !== count) {
      this.progress = this._getTotalProgress();
    }
    if (this.options.autoUpload) {
      this.uploadAll();
    }
  }

  public removeFromQueue(value: FileItem): void {
    const index = this.getIndexOfItem(value);
    const item = this.queue[index];
    if (item && item.isUploading) {
      item.cancel();
    }
    this.queue.splice(index, 1);
    this.progress = this._getTotalProgress();
  }

  public clearQueue(): void {
    while (this.queue.length) {
      this.queue[0].remove();
    }
    this.progress = 0;
  }

  public uploadItem(value: FileItem): void {
    const index = this.getIndexOfItem(value);
    const item = this.queue[index];
    item._prepareToUploading();
    if (this.isUploading) {
      console.log('already uploading');
      return;
    }
    this.isUploading = true;
    (this as any)['upload'](item);
  }

  public cancelItem(value: FileItem): void {
    const index = this.getIndexOfItem(value);
    const item = this.queue[index];
    if (item && item.isUploading) {
      this.uploadTask.cancel();
    }
  }

  public uploadAll(): void {
    const items = this.getNotUploadedItems().filter((item: FileItem) => {
      return !item.isUploading;
    });
    if (!items.length) {
      return;
    }
    items.map((item: FileItem) => item._prepareToUploading());
    items[0].upload();
  }

  public cancelAll(): void {
    const items = this.getNotUploadedItems();
    items.map((item: FileItem) => {
      item.cancel();
      item.onCancel();
    });
  }

  public getIndexOfItem(value: any): number {
    return typeof value === 'number' ? value : this.queue.indexOf(value);
  }

  public getNotUploadedItems(): Array<any> {
    return this.queue.filter((item: FileItem) => {
      return !item.isUploaded;
    });
  }

  public getReadyItems(): Array<any> {
    return this.queue
      .filter((item: FileItem) => (item.isReady && !item.isUploading))
      .sort((item1: any, item2: any) => item1.index - item2.index);
  }

  public _mimeTypeFilter(item: FileLikeObject): boolean {
    return !(this.options.allowedMimeType && this.options.allowedMimeType.indexOf(item.type) === -1);
  }

  public _fileSizeFilter(item: FileLikeObject): boolean {
    return !(this.options.maxFileSize && item.size > this.options.maxFileSize);
  }

  public _fileTypeFilter(item: FileLikeObject): boolean {
    return !(this.options.allowedFileType &&
      this.options.allowedFileType.indexOf(FileType.getMimeClass(item)) === -1);
  }

  public onCompleteItem(item: FileItem): void {
    this.removeFromQueue(item);
    item.onComplete();
    const nextItem = this.getReadyItems()[0];
    this.isUploading = false;
    if (nextItem) {
      nextItem.upload();
      return;
    }
    this.progress = this._getTotalProgress();
  }


  public upload(item: FileItem) {
    this._onBeforeUploadItem(item);

    const uploader = this;

    if (typeof item._file.size !== 'number') {
      throw new TypeError('The file specified is no longer valid');
    }

    uploader.uploadTask = firebase.storage().ref()
      .child(this.options.uploadFolder)
      .child(this._generateUniqueId(10))
      .put(item._file);

    uploader.uploadTask.on('state_changed', (snapshot: any) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      uploader._onProgressItem(item, progress);
      switch (snapshot.state) {
        case 'paused':
          // console.log('Upload is paused');
          break;
        case 'running':
          uploader.isUploading = true;
          break;
      }
    },
      (error: any) => {
        console.log(error);
        item.onError();
      },
      () => {
        item.url = uploader.uploadTask.snapshot.downloadURL;
        uploader.onCompleteItem(item);
        item.onSuccess();
        uploader.onSuccessItem(item);
      }
    );
  }

  public onSuccessItem(item: FileItem) {
  }


  public _getTotalProgress(value: number = 0): number {
    if (this.options.removeAfterUpload) {
      return value;
    }
    const notUploaded = this.getNotUploadedItems().length;
    const uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
    const ratio = 100 / this.queue.length;
    const current = value * ratio / 100;
    return Math.round(uploaded * ratio + current);
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
    return this.options.queueLimit === undefined || this.queue.length < this.options.queueLimit;
  }

  private _isValidFile(file: FileLikeObject, filters: FilterFunction[], options: FileUploaderOptions): boolean {
    this._failFilterIndex = -1;
    return !filters.length ? true : filters.every((filter: FilterFunction) => {
      this._failFilterIndex++;
      return filter.fn.call(this, file, options);
    });
  }

  private _onBeforeUploadItem(item: FileItem): void {
    item._onBeforeUpload();
  }

  private _onProgressItem(item: FileItem, progress: any): void {
    const total = this._getTotalProgress(progress);
    this.progress = total;
    item._onProgress(progress);
  }
  */
}
