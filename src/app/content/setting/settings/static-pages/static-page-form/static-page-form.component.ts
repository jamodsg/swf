import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'static-page-form',
  templateUrl: './static-page-form.component.html',
  styleUrls: ['./static-page-form.component.scss']
})
export class StaticPageFormComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() selectedStaticPage: number;

  constructor() {
  }

  ngOnInit() {
    // console.log(this.form.controls['staticPages']['controls']);
    // console.log(this.form.controls['staticPages']['controls'][this.selectedStaticPage - 1]['controls']);
  }

}
