import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'static-page',
  templateUrl: './static-page.component.html'
})
export class StaticPageComponent {

  @Input() form: FormGroup;
  @Input() selectedStaticPage: number;
  @Output() removeStaticPage: EventEmitter<number> = new EventEmitter(false);

  constructor() {
  }

}
