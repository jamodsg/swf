import { Component, Input } from '@angular/core';
import { ITimeLineEvent } from '../../interfaces/time-line-event.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'time-line',
  templateUrl: './time-line.component.html'
})
export class TimeLineComponent {

  @Input() form: FormGroup;
  @Input() groupName: string;
  @Input() title: string;
  // @Input() timeLineEvents: ITimeLineEvent[];

  showTable: boolean = false;
  showForm: boolean = true;

  constructor() {
  }

  toggleTableView() {
    this.showTable = !this.showTable;
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

}
