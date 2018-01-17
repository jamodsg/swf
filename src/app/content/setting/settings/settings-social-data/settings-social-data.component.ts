import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'settings-social-data',
  templateUrl: './settings-social-data.component.html'
})
export class SettingsSocialDataComponent {

  @Input() form: FormGroup;
  @Output() removeSocialProvider: EventEmitter<number> = new EventEmitter(false);
  @Output() addSocialProvider: EventEmitter<boolean> = new EventEmitter(false);

  public socialProviderList: { title: string, icon: string }[] = [
    { title: 'Facebook', 'icon': 'fa fa-facebook' },
    { title: 'Twitter', 'icon': 'fa fa-twitter' },
    { title: 'Youtube', 'icon': 'fa fa-youtube' }
  ];

  constructor() {
  }

}
