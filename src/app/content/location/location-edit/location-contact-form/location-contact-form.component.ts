import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'location-contact-form',
  templateUrl: './location-contact-form.component.html'
})
export class LocationContactFormComponent {

  @Input() form: FormGroup;

  constructor() {
  }

}
