import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ILocation } from '../../../../shared/interfaces/location.interface';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { IUploaderOptions } from '../../../../shared/interfaces/media/uploader-options.interface';
import { IUploaderConfig } from '../../../../shared/interfaces/media/uploader-config.interface';
import { MediaUploaderService } from '../../../../shared/services/media/media-uploader.service';
import { AngularFireStorage } from 'angularfire2/storage';
@Component({
  selector: 'club-edit-main',
  templateUrl: './club-edit-main.component.html'
})
export class ClubEditMainComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() locations: ILocation[];
  @Input() members: IMember[];

  @ViewChild('description') description: QuillEditorComponent;


  imageUrl = "assets/images/avtar_male.jpg";

  constructor(
    private storage: AngularFireStorage,
    private mediaUploaderService: MediaUploaderService
  ) {
    this.getDownloadUrl()
  }

  ngOnInit() {
  }

  public uploaderConfig: IUploaderConfig = {
    showOptions: true,
    autoUpload: true,
    showDropZone: true,
    multiple: false,
    removeAfterUpload: true,
    showQueue: false
  };

  public uploaderOptions: IUploaderOptions = {
    // allowedMimeType: ['image.*'],
    // allowedFileType: ['jpeg', 'jpg', 'gif', 'bmp', 'png'],
    // maxFileSize: 10000000,
    // queueLimit: 1
  };

  getDownloadUrl(){
    var imageURL = this.mediaUploaderService.getDownloadUrl();
    imageURL.subscribe(result => {
        const ref = this.storage.ref(result['path']);
        ref.getDownloadURL().subscribe(res => {
          this.imageUrl = res;
        });
    });
  }

}
