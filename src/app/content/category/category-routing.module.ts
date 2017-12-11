import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryResolver } from './category.resolver';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { ICategory } from '../../shared/interfaces/category.interface';
import { CategoryEditComponent } from './category-edit/category-edit.component';

export const categoryRoutes: Routes = [

  {
    path: '',
    component: CategoriesComponent,
    pathMatch: 'full'
  },
  {
    path: 'edit/:categoryId',
    component: CategoryEditComponent,
    resolve: {
      category: CategoryResolver
    }
  },
  {
    path: 'detail/:categoryId',
    component: CategoryDetailComponent,
    resolve: {
      category: CategoryResolver
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
