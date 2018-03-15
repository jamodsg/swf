import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'article-edit-sidebar',
  templateUrl: './article-edit-sidebar.component.html',
  styleUrls: ['./article-edit-sidebar.component.scss']
})
export class ArticleEditSidebarComponent implements OnInit {

  public form: FormGroup;
  public options = {
    direction :  'row',
    mainAxis  : 'space-around',
    crossAxis :  'center'
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      direction: '',
      mainAxis: '',
      crossAxis: ''
    });

    this.form.valueChanges.subscribe((changes: any) => {
      this.options = changes;
    });
  }

  layoutAlign() {
    console.log(this.options);
    return `${this.options.mainAxis} ${this.options.crossAxis}`;
  }

}
