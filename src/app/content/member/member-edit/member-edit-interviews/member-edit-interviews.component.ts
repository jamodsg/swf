import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'member-edit-interviews',
  templateUrl: './member-edit-interviews.component.html',
  styleUrls: ['./member-edit-interviews.component.scss']
})
export class MemberEditInterviewsComponent implements OnInit {

  @Input() form: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }

}
