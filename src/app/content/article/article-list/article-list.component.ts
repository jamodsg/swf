import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IArticle } from '../../../shared/interfaces/article.interface';
import { ICategory } from '../../../shared/interfaces/category.interface';

@Component({
  selector: 'article-list',
  templateUrl: 'article-list.component.html',
})

export class ArticleListComponent {

  @Input() articles: IArticle[];
  @Input() categories: ICategory[];

  @Output() remove = new EventEmitter(false);
  @Output() update = new EventEmitter(false);

  constructor() {
  }

}
