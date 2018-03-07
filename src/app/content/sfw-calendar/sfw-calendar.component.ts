import { Component } from '@angular/core';
import * as moment from 'moment';
import * as $ from 'jquery';
import 'fullcalendar';

@Component({
  selector: 'calendar',
  templateUrl: './sfw-calendar.component.html',
  styleUrls: ['./sfw-calendar.component.scss']
})
export class SFWCalendarComponent {

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
    eventClick: function(event) {
      // opens events in a popup window
      window.open(event.url, 'gcalevent', 'width=700,height=600');
      return false;
    },
    eventLimit: true, // allow "more" link when too many events
    events: [
      {
        title: 'All Day Event',
        start: '2018-03-01'
      },
      {
        title: 'Long Event',
        start: '2018-02-07',
        end: '2018-03-10'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2018-03-09T16:00:00'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2018-03-16T16:00:00'
      }
    ],
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
    weekNumbers: true,
    weekNumberTitle: 'KW'
  };


}
