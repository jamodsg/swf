import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUploaderConfig } from '../../../interfaces/media/uploader-config.interface';
import { IUploderOptions } from '../../../interfaces/media/uploader-options.interface';

@Component({
  selector: 'media-uploader',
  templateUrl: 'media-uploader.component.html'
})
export class MediaUploaderComponent implements OnInit {

  @Input() uploaderOptions: IUploderOptions;
  @Input() uploaderConfig: IUploaderConfig;
  @Input() currentImageUrl: string;

  @Output() notifyParentComponent = new EventEmitter(false);

  constructor() {
  }

  ngOnInit() {
  }

}
