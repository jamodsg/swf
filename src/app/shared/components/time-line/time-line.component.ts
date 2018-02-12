import { Component, Input, OnInit } from '@angular/core';
import { ITimeLineEvent } from '../../interfaces/time-line-event.interface';

@Component({
  selector: 'time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent implements OnInit {

  @Input() events: ITimeLineEvent[];
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
