import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/map';
import 'rxjs/add/operator/first';
import { ICalendarEvent } from '../../shared/interfaces/calendar-event.interface';
import { MemberService } from '../../shared/services/member/member.service';
import { IMember } from '../../shared/interfaces/member/member.interface';
import * as moment from 'moment';

@Injectable()
export class EventsResolver implements Resolve<ICalendarEvent[]> {

  private events$: ICalendarEvent[] = [];

  constructor(private memberService: MemberService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICalendarEvent[]> {

    let years = [];
    years.push(moment().subtract('1', 'year').format('YYYY'));
    years.push(moment().format('YYYY'));
    years.push(moment().add('1', 'year').format('YYYY'));

    return this.memberService.members$.map((members: IMember[]) => {

      members.forEach((member: IMember) => {
        if (member.mainData.birthday) {
          for (let i in years) {
            let event: ICalendarEvent = {
              title: 'Birthday ' + member.mainData.firstName + ' ' + member.mainData.lastName,
              start: moment(member.mainData.birthday).set('year', years[i]).format('YYYY-MM-DD')
            };
            this.events$.push(event);
          }
        }
      });

      console.log(this.events$);

      return this.events$;
    }).first();
  }
}
