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
  MatCheckboxModule,
  MatDialogModule, MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatRadioModule,
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
import { TagInputModule } from 'ngx-chips';
import { LocationService } from '../../shared/services/location/location.service';
import { TeamService } from '../../shared/services/team/team.service';
import { SeasonService } from '../../shared/services/season/season.service';
import { SharedCategoryModule } from '../../shared/components/category/shared-category.module';
import { SidebarMetaDataComponent } from './article-edit/article-edit-sidebar/sidebar-meta-data/sidebar-meta-data.component';
import { ApplicationService } from '../../shared/services/application/application.service';
import { SidebarMatchDataComponent } from './article-edit/article-edit-sidebar/sidebar-match-data/sidebar-match-data.component';
import { SidebarMainDataComponent } from './article-edit/article-edit-sidebar/sidebar-main-data/sidebar-main-data.component';

@NgModule({
  imports: [
    AceEditorModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
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
    SharedModule,
    SharedCategoryModule,
    TagInputModule
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
    SidebarMetaDataComponent,
    SidebarMatchDataComponent,
    SidebarMainDataComponent,
  ],
  entryComponents: [
    MarkdownHelpComponent
  ],
  providers: [
    ApplicationService,
    ArticleResolver,
    ArticleService,
    CategoryService,
    CategoryTypeService,
    LocationService,
    MatchService,
    MemberService,
    PaginationService,
    SeasonService,
    TeamService,
    UserService
  ]
})

export class ArticleModule {
}
