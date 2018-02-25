import { NgModule } from '@angular/core';
import { sfwCalendarRoutes } from './sfw-calendar-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SFWCalendarComponent } from './sfw-calendar.component';

@NgModule({
  imports: [
    FlexLayoutModule,
    RouterModule.forChild(sfwCalendarRoutes),
    SharedModule
  ],
  declarations: [
    SFWCalendarComponent
  ],
  providers: []
})

export class SFWCalendarModule {
}
