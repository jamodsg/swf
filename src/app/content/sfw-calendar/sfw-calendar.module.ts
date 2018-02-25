import { NgModule } from '@angular/core';
import { sfwCalendarRoutes } from './sfw-calendar-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SFWCalendarComponent } from './sfw-calendar.component';
import { CalendarComponent } from 'ap-angular2-fullcalendar';

@NgModule({
  imports: [
    FlexLayoutModule,
    RouterModule.forChild(sfwCalendarRoutes),
    SharedModule
  ],
  declarations: [
    CalendarComponent,
    SFWCalendarComponent
  ],
  providers: []
})

export class SFWCalendarModule {
}
