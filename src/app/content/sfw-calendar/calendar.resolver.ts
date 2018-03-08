import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MemberService } from '../../shared/services/member/member.service';
import { IMember } from '../../shared/interfaces/member/member.interface';
import * as moment from 'moment';
import 'rxjs/operator/map';
import 'rxjs/operator/take';

@Injectable()
export class CalendarResolver implements Resolve<Observable<{
  title: string,
  start: string,
  end: string
}[]>> {

  constructor(private memberService: MemberService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{
    title: string,
    start: string,
    end: string
  }[]> {

    return this.getEvents().map((events: {
      title: string,
      start: string,
      end: string
    }[]) => {
      console.log(events);
      return events;
      /*$('sfwCalendar').fullCalendar('addEventSource', {
        events: events
      });*/
    });
  }

  getEvents(): Observable<{
    title: string,
    start: string,
    end: string
  }[]> {
    return this.memberService.members$.map((members: IMember[]) => {
      return null;
    });

  }
}
