import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { IMember } from '../../../../shared/interfaces/member/member.interface';

@Component({
  selector: 'club-management',
  templateUrl: './club-management.component.html',
  styleUrls: ['club-management.component.scss']
})
export class ClubManagementComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() selectedClubManagementPosition: number;
  @Input() members: IMember[];
  @Input() positions: ICategory[];

  @Output() add: EventEmitter<boolean> = new EventEmitter(false);
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() save: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  public step = -1;

  constructor() {
  }

  ngOnInit() {
    console.log(this.form.controls['management']['controls']['positions']['controls']);
  }

  setStep(index: number) {
    this.step = index;
  }

}
