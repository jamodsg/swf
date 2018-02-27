import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IProfile } from '../../../../shared/interfaces/member/profile.interface';

@Component({
  selector: 'member-edit-profile',
  templateUrl: './member-edit-profile.component.html',
  styleUrls: ['./member-edit-profile.component.scss']
})
export class MemberEditProfileComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() selectedProfileEntry: number;

  @Output() add: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() save: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  @Output() delete: EventEmitter<IProfile> = new EventEmitter<IProfile>(false);
  @Output() edit: EventEmitter<IProfile> = new EventEmitter<IProfile>(false);

  constructor() {
  }

  ngOnInit() {
  }

}
