import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IArticle } from '../../../shared/interfaces/article.interface';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'article-list',
  templateUrl: 'article-list.component.html',
})

export class ArticleListComponent {

  @Input() articles: IArticle[];
  @Input() categories: ICategory[];

  @Output() remove = new EventEmitter(false);
  @Output() update = new EventEmitter(false);

  public form: FormGroup;
  public itemsPerPageOptions = [5, 10, 25, 50, 100];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      searchFor: '',
      limit: 10
    });
  }

  removeArticle(article: IArticle) {
    this.remove.emit(article);
    this.form.controls['searchFor'].reset();
  }

}
