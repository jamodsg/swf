import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IUploaderConfig } from '../../shared/interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../shared/interfaces/media/uploader-options.interface';
import { IMediaItem } from '../../shared/interfaces/media/media-item.interface';

@Component({
  selector: 'uploader',
  templateUrl: './uploader.component.html'
})
export class UploaderComponent implements OnInit {

  public form: FormGroup;
  public uploaderConfig: IUploaderConfig = {
    autoUpload: false,
    showDropZone: true,
    multiple: true,
    removeAfterUpload: true,
    showQueue: true
  };

  public uploaderOptions: IUploaderOptions = {
    path: '',
    id: ''
  };

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      // options: this.initOptions(),
      imageUrl: ''
    });

    this.form.valueChanges.subscribe(
      (changes: any) => {
        delete changes.imageUrl;
        this.uploaderConfig = changes.options
      });
  }


  uploadCompleted(mediaItem: IMediaItem){
    console.log(mediaItem);
  }

  removedMedia($event){
    console.log($event);
  }

}
