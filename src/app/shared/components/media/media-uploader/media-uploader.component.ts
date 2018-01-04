import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { IUploaderConfig } from '../../../interfaces/media/uploader-config.interface';
import { MediaUploaderService } from '../../../services/media/media-uploader.service';

@Component({
  selector: 'media-uploader',
  templateUrl: 'media-uploader.component.html',
  styleUrls: [
    'media-uploader.component.css'
  ]
})
export class MediaUploaderComponent implements OnInit {

  @Input() uploaderOptions: any = {};
  @Input() uploaderConfig: IUploaderConfig = {
    showDropZone: true,
    showQueue: false,
    multiple: true,
    autoUpload: false
  };
  @Output() notifyParentComponent = new EventEmitter(false);

  constructor(private authService: AuthService,
              private mediaUploaderService: MediaUploaderService) {
  }

  ngOnInit() {
  }

  onFileChange(event){
    if(this.uploaderConfig.autoUpload && event.target.files.length > 0) {
      this.uploadFiles(event.target.files);
    }
  }

  uploadFiles(files){
    this.mediaUploaderService.uploadFiles(files, this.uploaderOptions);
  }

}
