import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TimeLineComponent } from './time-line.component';
import { TimeLineFormComponent } from './time-line-form/time-line-form.component';
import { TimeLineListComponent } from './time-line-list/time-line-list.component';
import { TimeLineGraphHorizontalComponent } from './time-line-graph-horizontal/time-line-graph-horizontal.component';
import { MatCardModule, MatIconModule } from '@angular/material';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    NgPipesModule,
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
