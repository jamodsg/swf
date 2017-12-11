import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from '../../../shared/interfaces/user.interface';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {

  @Input() users: IUser[];

  @Output() remove: EventEmitter<any> = new EventEmitter(false);
  @Output() update: EventEmitter<any> = new EventEmitter(false);
  @Output() updateFilter: EventEmitter<any> = new EventEmitter(false);

  public form: FormGroup;

  public itemsPerPageOptions = [
    5, 10, 25, 50, 100
  ];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      searchFor: '',
      limit: 10
    });

    this.form.valueChanges.subscribe((changes: any) => {
      console.log(changes);
    });
  }

}
