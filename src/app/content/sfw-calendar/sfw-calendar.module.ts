import { NgModule } from '@angular/core';
import { sfwCalendarRoutes } from './sfw-calendar-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CalendarDialogComponent } from './calendar-dialog/calendar-dialog.component';
import { CalendarModule } from 'ap-angular2-fullcalendar';
import { MemberService } from '../../shared/services/member/member.service';
import { CalendarDashboardComponent } from './calendar-dashboard/calendar-dashboard.component';
import { EventsResolver } from './events.resolver';
import { CalendarService } from '../../shared/services/calendar/calendar.service';

@NgModule({
  imports: [
    CalendarModule,
    FlexLayoutModule,
    RouterModule.forChild(sfwCalendarRoutes),
    SharedModule
  ],
  declarations: [
    CalendarDialogComponent,
    CalendarDashboardComponent
  ],
  providers: [
    CalendarService,
    EventsResolver,
    MemberService
  ]
})

export class SFWCalendarModule {
}
