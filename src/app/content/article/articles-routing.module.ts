import { Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';

export const articleRoutes: Routes = [

  {
    path: '',
    component: ArticlesComponent,
    pathMatch: 'full'
  }, /*
      {
        path: 'dashboard',
        component: ArticleDashboardComponent
      },
      {
        path: 'match-dashboard',
        component: MatchDashboardComponent
      },
      {
        path: 'edit/:id',
        component: ArticleEditComponent,
        resolve: {
          article: ArticleResolver
        }
      },
      {
        path: 'detail/:id',
        component: ArticleDetailComponent,
        resolve: {
          article: ArticleResolver
        }
      }*/
  {
    path: '**',
    redirectTo: ''
  }
];

