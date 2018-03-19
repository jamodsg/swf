import { Component, OnInit, ViewChild } from '@angular/core';
import { ICalendarEvent } from '../../../shared/interfaces/calendar-event.interface';
import 'fullcalendar';
import * as $ from 'jquery';
import * as moment from 'moment';
import { CalendarComponent } from 'ap-angular2-fullcalendar';
import { ActivatedRoute } from '@angular/router';

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
    events: [],
    eventClick: function (event) {
      // opens events in a popup window
      // window.open(event.url, 'gcalevent', 'width=700,height=600');
      return false;
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

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { calendarEvents: ICalendarEvent[] }) => {
      let cal = $('calendar');
      cal.fullCalendar('renderEvents', data.calendarEvents, true);
      this.isInitialized = true;
    });
  }

}
