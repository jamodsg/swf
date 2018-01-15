import { NgModule } from '@angular/core';
import { categoryRoutes } from './category-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryResolver } from './category.resolver';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../shared/services/category/category.service';
import { CategoryTypeService } from '../../shared/services/category-type/category-type.service';
import { CategoriesByCategoryTypeComponent } from './categories-by-category-type/categories-by-category-type.component';
import { ChartsModule } from 'ng2-charts';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatTabsModule } from '@angular/material';
import { CategoryAssignedObjectsComponent } from './category-detail/category-assigned-objects/category-assigned-objects.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { QuillModule } from 'ngx-quill';
import { UserService } from '../../shared/services/user/user.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    ChartsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    QuillModule,
    RouterModule.forChild(categoryRoutes),
    SharedModule
  ],
  declarations: [
    CategoryAssignedObjectsComponent,
    CategoryDetailComponent,
    CategoryEditComponent,
    // CategoryAssignObjectsComponent,
    /* CategoryAssignedObjectsComponent,
    CategoryEditMainComponent,
    CategoryItemComponent, */
    CategoryListComponent,
    CategoriesByCategoryTypeComponent,
    CategoriesComponent,
    // CategoryDetailMainComponent
  ],
  providers: [
    CategoryResolver,
    CategoryService,
    CategoryTypeService,
    UserService
    /* ArticleService,
    LocationService,
    SeasonService,
    SponsorService,
    TeamService */
  ]
})

export class CategoryModule {
}
