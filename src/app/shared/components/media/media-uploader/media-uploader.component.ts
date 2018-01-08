import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUploaderConfig } from '../../../interfaces/media/uploader-config.interface';
import { IUploderOptions } from '../../../interfaces/media/uploader-options.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'media-uploader',
  templateUrl: 'media-uploader.component.html'
})
export class MediaUploaderComponent implements OnInit {

  @Input() uploaderOptions: IUploderOptions;
  @Input() uploaderConfig: IUploaderConfig;
  @Input() form: FormGroup;

  @Output() uploadCompleted = new EventEmitter(false);
  @Output() removedMedia = new EventEmitter(false);

  constructor() {
  }

  ngOnInit() {
  }

}
