import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IClubManagement } from '../../../../../shared/interfaces/club/club-management.interface';
import { IMember } from '../../../../../shared/interfaces/member/member.interface';

@Component({
  selector: 'club-management-form',
  templateUrl: './club-management-form.component.html'
})
export class ClubManagementFormComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() selectedClubManagementPosition: number;
  @Input() positions: IClubManagement[];
  @Input() members: IMember[];

  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() save: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor() { }

  ngOnInit() {
    console.log(this.form);
  }

}
