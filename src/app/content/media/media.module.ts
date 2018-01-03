import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaComponent } from './media.component';
import { mediaRoutes } from './media-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(mediaRoutes)
  ],
  declarations: [
    MediaComponent
  ]
})
export class MediaModule { }
