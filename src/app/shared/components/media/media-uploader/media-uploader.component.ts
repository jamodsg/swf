import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { IUploaderConfig, IUploderOptions } from '../../../interfaces/media/uploader-config.interface';
import { MediaUploaderService } from '../../../services/media/media-uploader.service';

@Component({
  selector: 'media-uploader',
  templateUrl: 'media-uploader.component.html',
  styleUrls: [
    'media-uploader.component.css'
  ]
})
export class MediaUploaderComponent implements OnInit {

  @Input() uploaderOptions: IUploderOptions = {
    maxFileSize: 100,
  };

  @Input() uploaderConfig: IUploaderConfig = {
    showDropZone: true,
    showQueue: false,
    multiple: true,
    autoUpload: false
  };
  @Output() notifyParentComponent = new EventEmitter(false);

  public errors: any;
  public uploaderResponse: any[];
  public image: string;

  constructor(private authService: AuthService,
    public mediaUploaderService: MediaUploaderService) {
  }

  ngOnInit() {
  }

  onFileChange(event) {
    this.errors = null;
    this.image = null;
    if (this.uploaderConfig.autoUpload && event.target.files.length > 0) {
      if (!this.uploaderConfig.multiple) {
        console.log(event.target.files);
        this.image = event.target.files[0];
      }
      // this.uploadFiles(event.target.files);
    }
  }

  uploadFiles(files) {
    this.mediaUploaderService.uploadFiles(files, this.uploaderOptions).subscribe(
      (uploaderResponse: any[]) => {
        console.log(uploaderResponse);
        this.uploaderResponse = uploaderResponse;
      },
      (error: any) => this.errors = error
    );
  }

}
