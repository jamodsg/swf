import { NgModule } from '@angular/core';
import { articleRoutes } from './articles-routing.module';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleResolver } from './article.resolver';
import { SharedModule } from '../../shared/shared.module';
import { ArticleService } from '../../shared/services/article/article.service';
import { CategoryService } from '../../shared/services/category/category.service';
import { RouterModule } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { CategoryTypeService } from '../../shared/services/category-type/category-type.service';
import { MatButtonModule, MatFormFieldModule, MatListModule, MatSelectModule, MatSidenavModule, MatSnackBarModule, MatTabsModule, MatToolbarModule } from '@angular/material';
import { ArticleDashboardComponent } from './article-dashboard/article-dashboard.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleMatchesComponent } from './article-matches/article-matches.component';
import { MatchModule } from '../../shared/components/match/match.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatchService } from '../../shared/services/match/match.service';
import { MemberService } from '../../shared/services/member/member.service';
import { UserService } from '../../shared/services/user/user.service';
import { PaginationService } from '../../shared/services/pagination/pagination.service';
import { ScrollableDirective } from '../../shared/directives/scrollable/scrollable.directive';

@NgModule({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatchModule,
    PerfectScrollbarModule,
    RouterModule.forChild(articleRoutes),
    SharedModule
  ],
  declarations: [
    ArticleListComponent,
    ArticlesComponent,
    ArticleDashboardComponent,
    ArticleEditComponent,
    ArticleDetailComponent,
    ArticleMatchesComponent,
    ScrollableDirective
  ],
  providers: [
    ArticleResolver,
    ArticleService,
    CategoryService,
    CategoryTypeService,
    MatchService,
    MemberService,
    PaginationService,
    UserService
  ]
})

export class ArticleModule {
}
