import { Component, OnInit, ViewChild } from '@angular/core';
import { MemberService } from '../../../shared/services/member/member.service';
import { IMember } from '../../../shared/interfaces/member/member.interface';
import { ICalendarEvent } from '../../../shared/interfaces/calendar-event.interface';
import 'fullcalendar';
import * as moment from 'moment';
import * as $ from 'jquery';
import { CalendarComponent } from 'ap-angular2-fullcalendar';

@Component({
  selector: 'calendar-dashboard',
  templateUrl: './calendar-dashboard.component.html',
  styleUrls: ['./calendar-dashboard.component.scss']
})
export class CalendarDashboardComponent implements OnInit {

  @ViewChild('calendar') calendar: CalendarComponent;

  public isInitialized: boolean = false;

  calendarOptions: Object = {
    allDayText: 'ganztägig',
    buttonText: {
      today: 'Heute',
      month: 'Monat',
      week: 'Woche',
      day: 'Tag',
      list: 'Liste'
    },
    defaultDate: moment().toISOString(),
    displayEventEnd: true,
    editable: false,
    /*eventClick: function (event) {
      // opens events in a popup window
      window.open(event.url, 'gcalevent', 'width=700,height=600');
      return false;
    },*/
    events: function(start, end, timezone, callback) {
      console.log('123');
      this.memberService.members$.subscribe((members: IMember[]) => {
        console.log(members.length);
        this.loadBirthdays(members).then((events: ICalendarEvent[]) => {
          this.isInitialized = true;
          console.log('callback');
          callback(this.setEvents(events));
        });
      });
    },
    eventLimit: true, // allow "more" link when too many events
    firstDay: 1,
    fixedWeekCount: true,
    footer: true,
    header: {
      left: 'title',
      center: 'month, basicWeek, basicDay', // agendaWeek,
      right: 'today prev,next'
    },
    height: '100',
    locale: 'de',
    slotDuration: '15',
    slotLabelFormat: 'hh:mm',
    timeFormat: 'hh:mm',
    timezone: 'local',
    validRange: {
      start: moment().subtract('1', 'years').startOf('year').format('YYYY-MM-DD'),
      end: moment().add('1', 'years').endOf('year').format('YYYY-MM-DD'),
    },
    weekNumbers: true,
    weekNumberTitle: 'KW'
  };

  public events: ICalendarEvent[] = [];

  constructor(private memberService: MemberService) {
  }

  ngOnInit() {
  }

  loadBirthdays(members: IMember[]): Promise<ICalendarEvent[]> {
    console.log('--- ' + members.length + ' ---');
    let years = [];
    years.push(moment().subtract('1', 'year').format('YYYY'));
    years.push(moment().format('YYYY'));
    years.push(moment().add('1', 'year').format('YYYY'));

    members.forEach((member: IMember) => {
      if (member.mainData.birthday) {
        for (let i in years) {
          let event: ICalendarEvent = {
            title: 'Geburtstag ' + member.mainData.firstName + ' ' + member.mainData.lastName,
            start: moment(member.mainData.birthday).set('year', years[i]).format('YYYY-MM-DD')
          };
          this.events.push(event);
        }
      }
    });
    return Promise.resolve(this.events);
  }

  onDateChanged($event) {
    console.log($event);
  }

}
