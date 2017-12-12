import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { RolesComponent } from './roles/roles.component';
import { StatisticsComponent } from './statistics/statistics.component';
/*
import { UserEditAssignedUploadsComponent } from './user-edit/user-edit-assigned-uploads/user-edit-assigned-uploads.component';
import { UserEditAssignedTodosComponent } from './user-edit/user-edit-assigned-todos/user-edit-assigned-todos.component';
import { UserEditAssignedArticlesComponent } from './user-edit/user-edit-assigned-articles/user-edit-assigned-articles.component';
import { UserEditMainProfileComponent } from './user-edit/user-edit-main-profile/user-edit-main-profile.component';
import { UserEditComponent } from './user-edit/user-edit.component';
*/

export const userRoutes: Routes = [
  {
    path: '',
    component: UsersComponent,
    pathMatch: 'full'
  }/*,
  {
    path: 'edit/:userId',
    component: UserEditComponent,
    resolve: {
      user: UserResolver
    },
    pathMatch: 'full',
    children: [
      {
        path: '',
        component: UserEditMainProfileComponent
      },
      {
        path: 'articles',
        component: UserEditAssignedArticlesComponent
      },
      {
        path: 'todos',
        component: UserEditAssignedTodosComponent
      },
      {
        path: 'uploads',
        component: UserEditAssignedUploadsComponent
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  }*/,
  {
    path: 'detail/:userId',
    component: UserDetailComponent,
    /* resolve: {
      user: UserResolver
    } */
  },
  {
    path: 'roles',
    component: RolesComponent
  },
  {
    path: 'statistics',
    component: StatisticsComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
