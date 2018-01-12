import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUploaderConfig } from '../../../interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../../interfaces/media/uploader-options.interface';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'media-uploader',
  templateUrl: 'media-uploader.component.html'
})
export class MediaUploaderComponent {

  @Input() uploaderOptions: IUploaderOptions;
  @Input() uploaderConfig: IUploaderConfig;
  @Input() form: FormGroup;
  @Input() showOptions: boolean = true;

  @Output() uploadCompleted = new EventEmitter(false);
  @Output() removedMedia = new EventEmitter(false);

  public optionsForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

}
