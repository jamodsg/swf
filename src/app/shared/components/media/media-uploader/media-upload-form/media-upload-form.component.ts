import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUploaderConfig } from '../../../../interfaces/media/uploader-config.interface';
import { MediaUploaderService } from '../../../../services/media/media-uploader.service';
import { IUploderOptions } from '../../../../interfaces/media/uploader-options.interface';
import { Upload } from '../../../../services/media/upload.class';
import { FormGroup } from '@angular/forms';
import { IMediaItem } from '../../../../interfaces/media/media-item.interface';

@Component({
  selector: 'media-upload-form',
  templateUrl: './media-upload-form.component.html',
  styleUrls: [
    'media-upload-form.component.css'
  ]
})
export class MediaUploadFormComponent implements OnInit {

  @Input() uploaderOptions: IUploderOptions;
  @Input() uploaderConfig: IUploaderConfig;
  @Input() currentImageUrl: string;
  @Input() form: FormGroup;

  @Output() uploadCompleted = new EventEmitter(false);
  @Output() removedMedia = new EventEmitter(false);

  public selectedFiles: FileList | null;
  public currentUploads: Upload[] = [];

  constructor(public mediaUploaderService: MediaUploaderService) {
  }

  ngOnInit() {
  }

  onFileChange($event: any) {
    this.selectedFiles = ($event.target as HTMLInputElement).files;
    if (this.uploaderConfig.autoUpload) {
      this.uploadFile();
    }
  }

  deleteMedia(currentImageUrl: string) {
    console.log(currentImageUrl);
    // this.mediaUploaderService.deleteFileStorage(currentImageUrl);
  }

  uploadFile() {
    const fileArray = Array.from(this.selectedFiles);
    this.uploaderOptions.queueSize = fileArray.length;
    fileArray.forEach((file) => {
      const fileUpload = new Upload(file);
      this.currentUploads.push(fileUpload);
      this.mediaUploaderService.upload(fileUpload, this.uploaderOptions).subscribe(
        (mediaItem: IMediaItem) => {
          console.log(mediaItem);
          this.currentUploads.splice(this.currentUploads.indexOf(fileUpload), 1);
          this.uploadCompleted.emit(mediaItem);
        },
        (error: any) => console.log('Error ' + error)
      );
    });
  }

}
