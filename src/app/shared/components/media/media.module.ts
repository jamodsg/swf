import { NgModule } from '@angular/core';
import { MediaUploaderComponent } from './media-uploader/media-uploader.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatProgressBarModule } from '@angular/material';
import { FileUploadModule } from 'ng2-file-upload';
import { MediaCenterComponent } from './media-center/media-center.component';
import { MediaGalleryComponent } from './media-gallery/media-gallery.component';
import { MediaGalleryFormComponent } from './media-gallery-form/media-gallery-form.component';
import { MediaGalleryItemComponent } from './media-gallery-item/media-gallery-item.component';
import { MediaGalleryListComponent } from './media-gallery-list/media-gallery-list.component';
import { MediaUploaderService } from '../../services/media/media-uploader.service';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { MediaUploadFormComponent } from './media-uploader/media-upload-form/media-upload-form.component';

@NgModule({
  imports: [
    AngularFireStorageModule,
    CommonModule,
    FileUploadModule,
    MatIconModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [
    MediaCenterComponent,
    MediaGalleryComponent,
    MediaGalleryFormComponent,
    MediaGalleryItemComponent,
    MediaGalleryListComponent,
    MediaUploaderComponent,
    MediaUploadFormComponent,
    /*
    FileSelectDirective,
    FilterByGalleryPipe,
    ImagePreviewDirective,
    InlineEditComponent,
    MediaCenterComponent,
    MediaGalleryComponent,
    MediaGalleryFormComponent,
    MediaGalleryListComponent,
    MediaGalleryItemComponent,
    MediaLinkUploaderComponent,
    MediaThumbnailComponent,
    MediaUploaderUnsplashComponent */
  ],
  exports: [
    MediaCenterComponent,
    MediaUploaderComponent
    /*
    FileSelectDirective,
    InlineEditComponent,
    FilterByGalleryPipe,
    ImagePreviewDirective,
    MediaGalleryComponent,
    MediaGalleryItemComponent,
    MediaGalleryListComponent,
    MediaCenterComponent,
    MediaThumbnailComponent */
  ],
  providers: [
    MediaUploaderService
  ]
})

export class MediaModule {
}
