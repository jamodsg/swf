import { NgModule } from '@angular/core';
import { articleRoutes } from './articles-routing.module';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleResolver } from './article.resolver';
import { SharedModule } from '../../shared/shared.module';
import { ArticleService } from '../../shared/services/article/article.service';
import { CategoryService } from '../../shared/services/category/category.service';
import { RouterModule } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';

@NgModule({
  imports: [
    RouterModule.forChild(articleRoutes),
    SharedModule
    // MarkdownModule,
    // TabsModule,
    // TagInputModule
  ],
  declarations: [
    ArticleListComponent,
    ArticlesComponent
    /* ArticleActionsComponent,
    ArticleDashboardComponent,
    ArticleDetailComponent,
    ArticleEditComponent,
    ArticleFormComponent,
    ArticlesComponent,
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
    CategoryService
    /*Ng2BootstrapModule,
    UserService,
    CategoryService,
    LocationService,
    MatchService,
    TeamService,
    PublicationService,
    WINDOW_PROVIDER */
  ]
})

export class ArticleModule {
}
