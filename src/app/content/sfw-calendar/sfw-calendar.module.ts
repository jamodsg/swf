import { NgModule } from '@angular/core';
import { sfwCalendarRoutes } from './sfw-calendar-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SFWCalendarComponent } from './sfw-calendar.component';
import { CalendarComponent } from 'angular2-fullcalendar/src/calendar/calendar';
import { MatCalendar } from '@angular/material';
import { CalendarModule, CalendarDateFormatter } from 'angular-calendar';

@NgModule({
  imports: [
    CalendarModule.forRoot(),
    FlexLayoutModule,
    RouterModule.forChild(sfwCalendarRoutes),
    SharedModule
  ],
  declarations: [
    CalendarComponent,
    SFWCalendarComponent,
    FullcalendarComponent,
    CalendarDialogComponent
  ],
  entryComponents: [ CalendarDialogComponent ],
  providers: []
})

export class SFWCalendarModule {
}
