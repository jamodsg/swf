import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  moduleId: module.id,
  selector: 'media-uploader',
  templateUrl: 'media-uploader.component.html',
  styleUrls: [
    'media-uploader.css'
  ]
})
export class MediaUploaderComponent implements OnInit {

  // https://blog.rsuter.com/angular-2-typescript-property-decorator-that-converts-input-values-to-the-correct-type/
  @Input() uploaderOptions: any = {};
  @Input() showQueue: boolean;
  @Input() showDropZone: boolean;
  @Input() multipleUpload: boolean;

  @Output() notifyParentComponent = new EventEmitter(false);

  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;
  // public uploader: FileUploader;

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    /* this.uploader = new FileUploader(this.uploaderOptions, this.authService);
    this.uploader.onCompleteItem = (item: FileItem) => {
      this.notifyParentComponent.emit(item);
    }; */
  }

  public fileOverBase(e: any): void {
    console.log(e);
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    console.log(e);
    this.hasAnotherDropZoneOver = e;
  }

}
