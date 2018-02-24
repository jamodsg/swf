import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  // dataSource: any;
  currentDate: Date = new Date(2017, 4, 25);

  constructor(@Inject(HttpClient) private httpCllient: HttpClient) {

    /* this.dataSource = new DataSource({
      store: new CustomStore({
        load: (options) => this.getData(options, { showDeleted: false })
      })
    }); */
  }

  /*
  private getData(options: any, requestOptions: CalendarRequestOptionsArgs) {
    let PUBLIC_KEY = 'AIzaSyBnNAISIUKe6xdhq1_rjor2rxoI3UlMY7k',
      CALENDAR_ID = 'f7jnetm22dsjc3npc2lu3buvu4@group.calendar.google.com';
    let dataUrl = [ 'https://www.googleapis.com/calendar/v3/calendars/',
      CALENDAR_ID, '/events?key=', PUBLIC_KEY].join('');
    return this.httpCllient..get(dataUrl, [ requestOptions ]).toPromise().then(this.extractData);
  }

  private extractData(res: Response) {
    return res.json().items;
  } */
}
