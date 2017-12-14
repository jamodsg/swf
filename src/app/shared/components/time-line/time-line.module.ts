import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TimeLineComponent } from './time-line.component';
import { TimeLineFormComponent } from './time-line-form/time-line-form.component';
import { TimeLineListComponent } from './time-line-list/time-line-list.component';
import { TimeLineGraphHorizontalComponent } from './time-line-graph-horizontal/time-line-graph-horizontal.component';
import {
  MatButtonModule,
  MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule,
  MatSelectModule
} from '@angular/material';
import { NgPipesModule } from 'ngx-pipes';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    NgPipesModule,
    QuillModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [
    TimeLineComponent,
    TimeLineFormComponent,
    TimeLineGraphHorizontalComponent,
    TimeLineListComponent
  ],
  exports: [
    TimeLineComponent,
    TimeLineFormComponent,
    TimeLineGraphHorizontalComponent,
    TimeLineListComponent
  ],
  providers: []
})
export class TimeLineModule {
}
