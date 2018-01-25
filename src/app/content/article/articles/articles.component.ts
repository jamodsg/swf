import { Component } from '@angular/core';
import { ArticleService } from '../../../shared/services/article/article.service';
import { CategoryService } from '../../../shared/services/category/category.service';
import { IArticle } from '../../../shared/interfaces/article.interface';
import { Observable } from 'rxjs/Observable';
import { SnackbarComponent } from '../../../shared/components/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material';
import { ICategory } from '../../../shared/interfaces/category.interface';

@Component({
  selector: 'articles',
  templateUrl: './articles.component.html'
})

export class ArticlesComponent {

  public articles$: Observable<IArticle[]>;
  public categories$: Observable<ICategory[]>;

  constructor(private articleService: ArticleService,
    private categoryService: CategoryService,
    public snackBar: MatSnackBar, ) {
    this.articles$ = articleService.articles$;
    this.categories$ = categoryService.categories$;
  }

  removeArticle($event) {
    this.articleService.removeArticle($event).then(
      () => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            status: 'success',
            message: 'general.articles.edit.deleteSuccess'
          },
          duration: 2500
        });
      },
      (error: any) => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            status: 'error',
            message: error
          },
          duration: 2500
        });
      });
  }

  updateArticle($event) {
    this.articleService.updateArticle($event.article.id, $event.article).then(
      () => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            status: 'success',
            message: 'general.articles.edit.updateSuccess'
          },
          duration: 2500
        });
      },
      (error: any) => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            status: 'error',
            message: error
          },
          duration: 2500
        });
      });
  }
}
