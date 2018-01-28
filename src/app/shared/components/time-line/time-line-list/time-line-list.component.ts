import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITimeLineEvent } from '../../../interfaces/time-line-event.interface';

@Component({
  selector: 'time-line-list',
  templateUrl: './time-line-list.component.html',
  styleUrls: ['time-line-list.component.scss']
})
export class TimeLineListComponent implements OnInit {

  /* @Input() item: any;
  @Input() showTable: boolean = true;
  @Input() showForm: boolean = true;
  @Input() showActionLinks: boolean = true; */
  @Input() events: ITimeLineEvent[];

  @Output() deleteTimeLineEvent = new EventEmitter(false);

  public step = -1;

  constructor() {
  }

  ngOnInit() {
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
