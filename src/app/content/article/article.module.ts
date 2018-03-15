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
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatListModule,
  MatMenuModule, MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
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
import { MarkdownHelpComponent } from './article-edit/markdown-help/markdown-help.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { ArticleEditSidebarComponent } from './article-edit/article-edit-sidebar/article-edit-sidebar.component';

@NgModule({
  imports: [
    AceEditorModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
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
    ArticleDashboardComponent,
    ArticleDetailComponent,
    ArticleEditComponent,
    ArticleEditSidebarComponent,
    ArticleListComponent,
    ArticleMatchesComponent,
    ArticlesComponent,
    MarkdownHelpComponent,
    ScrollableDirective,
  ],
  entryComponents: [
    MarkdownHelpComponent
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
