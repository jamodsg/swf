import { NgModule } from '@angular/core';
import { MediaUploaderComponent } from './media-uploader/media-uploader.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    FileUploadModule,
    MatIconModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [
    MediaUploaderComponent,
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
  ]
})

export class MediaModule {
}
