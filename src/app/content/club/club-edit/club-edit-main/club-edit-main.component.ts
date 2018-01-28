import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ILocation } from '../../../../shared/interfaces/location.interface';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { IMember } from '../../../../shared/interfaces/member/member.interface';

@Component({
  selector: 'club-edit-main',
  templateUrl: './club-edit-main.component.html'
})
export class ClubEditMainComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() locations: ILocation[];
  @Input() members: IMember[];

  @ViewChild('description') description: QuillEditorComponent;

  constructor() { }

  ngOnInit() {
  }


}
