import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ITimeLineEvent } from '../../../interfaces/time-line-event.interface';

@Component({
  selector: 'time-line-form',
  templateUrl: './time-line-form.component.html'
})
export class TimeLineFormComponent {

  @Input() form: FormGroup;
  @Input() groupName: string;
  @Input() titleMinLength: number;
  @Input() textMinLength: number;

  @Output() cancelAddingEvent: EventEmitter<any> = new EventEmitter(false);
  @Output() saveTimeLineEvent: EventEmitter<ITimeLineEvent> = new EventEmitter(false);

  public colors = ['primary', 'warning', 'danger', 'success', 'info', 'none'];

  constructor(/* public articleService: ArticleService */) {
  }

}
