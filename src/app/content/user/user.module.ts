import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { UserListComponent } from './user-list/user-list.component';
import { UsersComponent } from './users/users.component';
// mport { UserItemComponent } from './user-item/user-item.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
/* import { UserEditComponent } from './user-edit/user-edit.component';*/
import { UserResolver } from './user.resolver';
import { userRoutes } from './user-routing.module';
import { UserService } from '../../shared/services/user/user.service';
import { SharedModule } from '../../shared/shared.module';
import { UserListComponent } from './user-list/user-list.component';
import { RolesComponent } from './roles/roles.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
/*
import { UserEditMainProfileComponent } from './user-edit/user-edit-main-profile/user-edit-main-profile.component';
import { UserEditAssignedArticlesComponent } from './user-edit/user-edit-assigned-articles/user-edit-assigned-articles.component';
import { UserEditAssignedTodosComponent } from './user-edit/user-edit-assigned-todos/user-edit-assigned-todos.component';
import { UserEditAssignedUploadsComponent } from './user-edit/user-edit-assigned-uploads/user-edit-assigned-uploads.component';
*/

@NgModule({
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    RouterModule.forChild(userRoutes),
    SharedModule
  ],
  declarations: [
    UserDetailComponent,
    /*UserEditComponent,
    UserEditMainProfileComponent,
    UserItemComponent,
    UserListComponent, */
    UsersComponent,
    UserListComponent,
    RolesComponent,
    StatisticsComponent,
    /* UserEditAssignedArticlesComponent,
    UserEditAssignedTodosComponent,
    UserEditAssignedUploadsComponent, */
  ],
  providers: [
    UserResolver,
    UserService
  ]
})

export class UserModule {
}
