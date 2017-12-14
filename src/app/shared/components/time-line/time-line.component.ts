import { Component, Input } from '@angular/core';
import { ITimeLineEvent } from '../../interfaces/time-line-event.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'time-line',
  templateUrl: './time-line.component.html'
})
export class TimeLineComponent {

  @Input() form: FormGroup;
  @Input() timeLineEvents: ITimeLineEvent[];

  showTable: boolean = false;
  showForm: boolean = false;

  constructor() {
  }

  toggleTableView() {
    this.showTable = !this.showTable;
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

}
