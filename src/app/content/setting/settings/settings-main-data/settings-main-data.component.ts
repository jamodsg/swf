import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApplicationService } from '../../../../shared/services/application/application.service';

@Component({
  selector: 'settings-main-data',
  templateUrl: './settings-main-data.component.html'
})
export class SettingsMainDataComponent implements OnInit {

  @Input() form: FormGroup;

  constructor(public applicationService: ApplicationService
    /* public rolesService: NgxRolesServic */) { }

  ngOnInit() {
    console.log(this.form);
  }

}
