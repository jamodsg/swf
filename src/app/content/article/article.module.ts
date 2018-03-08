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
import { MatButtonModule, MatFormFieldModule, MatSelectModule, MatSnackBarModule } from '@angular/material';
import { ArticleDashboardComponent } from './article-dashboard/article-dashboard.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleMatchesComponent } from './article-matches/article-matches.component';

@NgModule({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    RouterModule.forChild(articleRoutes),
    SharedModule
    // MarkdownModule,
    // TabsModule,
    // TagInputModule
  ],
  declarations: [
    ArticleListComponent,
    ArticlesComponent,
    ArticleDashboardComponent,
    ArticleEditComponent,
    ArticleDetailComponent,
    ArticleMatchesComponent
    /* ArticleActionsComponent,
    ArticleDashboardComponent,
    ArticleDetailComponent,
    ArticleEditComponent,
    ArticleFormComponent,
    ArticleSidebarComponent,
    ArticleTextComponent,
    EmptyFilterPipe,
    MarkdownPreviewComponent,
    MatchDashboardComponent,
    /* ArticleSidebarComponent,
    ArticleTextComponent,
    // Autosize, */
  ],
  providers: [
    ArticleResolver,
    ArticleService,
    CategoryService,
    CategoryTypeService
    /*Ng2BootstrapModule,
    UserService,
    LocationService,
    MatchService,
    TeamService,
    PublicationService,
    WINDOW_PROVIDER */
  ]
})

export class ArticleModule {
}
