import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IUploaderOptions } from '../../../interfaces/media/uploader-options.interface';
import { Upload } from '../../../services/media/upload.class';
import { MediaUploaderService } from '../../../services/media/media-uploader.service';
import { SnackbarComponent } from '../../snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'media-uploader',
  templateUrl: 'media-uploader.component.html',
  styleUrls: ['media-uploader.component.scss']
})
export class MediaUploaderComponent implements OnInit {

  @Input() uploaderOptions: IUploaderOptions;
  @Input() form: FormGroup;

  @Output() uploadCompleted = new EventEmitter(false);

  public currentUploads: Upload[] = [];
  public isHovering: boolean;
  public canUpload: boolean = true;

  constructor(public snackBar: MatSnackBar,
    private mediaUploaderService: MediaUploaderService) {
  }

  ngOnInit() {
  }

  handleDrop(fileList: FileList): void {
    const fileArray = Array.from(fileList);
    this.initUploader(fileArray);
  }

  onFileChange($event: any): void {
    const fileArray = Array.from(($event.target as HTMLInputElement).files);
    this.initUploader(fileArray);
  }

  toggleHover(event: boolean): void {
    this.isHovering = event;
  }

  initUploader(fileArray: File[]): void {
    const reader = new FileReader();

    for (let i = 0; i < fileArray.length; i++) {
      const fileUpload = new Upload(fileArray[i]);
      this.currentUploads.push(fileUpload);
      /*  Preview
      reader.onload = (event: any) => {
        console.log(event.target);
        file.previewImage = event.target.result;
      };
      // reader.readAsDataURL(file); */
    }

    this.checkQueueLength();

    // Start Auto Upload?
    if (this.canUpload && this.form.controls['uploaderConfig']['controls']['autoUpload'].value === true) {
      this.uploadFiles();
    }
  }

  checkQueueLength() {
    this.uploaderOptions.queueSize = this.currentUploads.length;
    if (this.currentUploads.length > this.uploaderOptions.queueLimit) {
      this.canUpload = false;
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          status: 'error',
          message: 'general.media.filter.queueLimit'
        },
        duration: 2500
      });
      this.canUpload = false;
    } else {
      this.canUpload = true;
    }
  }

  uploadFiles() {
    this.currentUploads.forEach((fileUpload: Upload) => {
      this.uploadFile(fileUpload);
    });
  }

  uploadFile(fileUpload: Upload) {

    const uploadTask = this.mediaUploaderService.upload(fileUpload, this.uploaderOptions);

    fileUpload.percentage = uploadTask.percentageChanges();
    fileUpload.downloadUrl = uploadTask.downloadURL();


    uploadTask.snapshotChanges().subscribe(
      (snapshot: any) => {
        fileUpload.isActive = snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
        if (snapshot.bytesTransferred === snapshot.totalBytes) {
          this.uploadCompleted.emit(fileUpload);

          if (this.form.controls['uploaderConfig']['controls']['removeAfterUpload'].value === true) {
            this.deleteFromQueue(fileUpload);
            if (this.currentUploads.length === 0) {
              this.clearQueue();
            }
          }

        }
      },
      (error: any) => console.log(error)
    );
    /* const mediaItem = this.mediaItemService.setNewMediaItem(upload);
          return this.mediaItemService.createMediaItem(mediaItem).then(() => {
            return mediaItem
          }); */
  }

  clearQueue(): void {
    this.currentUploads = [];
    this.form.controls['imageUrl'].reset();
  }

  deleteFromQueue(upload): void {
    this.currentUploads.splice(this.currentUploads.indexOf(upload), 1);
    this.checkQueueLength();
  }
}
