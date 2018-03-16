import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { IArticle } from '../../shared/interfaces/article.interface';
import { ArticleService } from '../../shared/services/article/article.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/first';
import 'rxjs/operator/map';
import 'rxjs/operator/take';
import { IClub } from '../../shared/interfaces/club/club.interface';

@Injectable()
export class ArticleResolver implements Resolve<IArticle> {

  constructor(private articleService: ArticleService,
    private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IArticle> {

    if (Object.keys(route.params).length === 0) {
      return this.articleService.setNewArticle();
    }

    return this.articleService.getArticleById(route.params['articleId']).take(1).map((article: IArticle) => {
      if (article && article.id) {
        return article;
      } else {
        this.router.navigate(['/articles']).then();
      }
    });
  }

}
