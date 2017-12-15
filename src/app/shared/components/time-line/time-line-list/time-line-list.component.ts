import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITimeLineEvent } from '../../../interfaces/time-line-event.interface';

@Component({
  selector: 'time-line-list',
  templateUrl: './time-line-list.component.html'
})
export class TimeLineListComponent {

  /* @Input() item: any;
  @Input() showTable: boolean = true;
  @Input() showForm: boolean = true;
  @Input() showActionLinks: boolean = true; */
  @Input() events: ITimeLineEvent[];

  @Output() deleteTimeLineEvent = new EventEmitter(false);

  constructor() {
  }

}
