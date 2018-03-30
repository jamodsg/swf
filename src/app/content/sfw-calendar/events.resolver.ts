import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/forkJoin';
import { ICalendarEvent } from '../../shared/interfaces/calendar-event.interface';
import { MemberService } from '../../shared/services/member/member.service';
import { IMember } from '../../shared/interfaces/member/member.interface';
import { CalendarService } from '../../shared/services/calendar/calendar.service';
import * as moment from 'moment';

@Injectable()
export class EventsResolver implements Resolve<ICalendarEvent[]> {

  private events$: any[] = [];

  constructor(private memberService: MemberService,
    private calendarService: CalendarService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICalendarEvent[]> {

    return this.memberService.members$.switchMap((members: IMember[]) => {

      const memberEvents: ICalendarEvent[] = [];
      members.forEach((member: IMember) => {
        if (member.mainData.birthday) {
          const event: any = {
            title: 'Geburtstag von ' + member.mainData.firstName + ' ' + member.mainData.lastName + ' (' + this.memberService.calculateAge(member.mainData.birthday) + ' Jahre)',
            start: moment(member.mainData.birthday).set('year', moment().year()).format('YYYY-MM-DD')
          };
          memberEvents.push(event);
        }
      });
      this.events$.push(...memberEvents);

      return this.calendarService.getCalendarEvents().map((calEvents: any) => {

        calEvents.items.forEach((event: ICalendarEvent) => {

          const startDate = event.start.dateTime.substr(0, 10);

          const calendarEvent: any = {
            title: event.summary,
            start: startDate
          };
          this.events$.push(calendarEvent);
        });

        return this.events$;
      });
    }).first();
  }
}
