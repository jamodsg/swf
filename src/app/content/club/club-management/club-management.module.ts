import { NgModule } from '@angular/core';
import { ClubManagementListComponent } from './club-management-list/club-management-list.component';
import { ClubManagementsComponent } from './club-managements/club-managements.component';
import { ClubManagementFormComponent } from './club-management-form/club-management-form.component';
import { clubManagementRoutingModule } from './club-management-routing';
import { ClubManagementResolver } from './club-management.resolver';
import { SharedPagesModule } from '../../../shared/shared-pages.module';

@NgModule({
  imports: [
    clubManagementRoutingModule,
    SharedPagesModule
  ],
  declarations: [
    ClubManagementListComponent,
    ClubManagementFormComponent,
    ClubManagementsComponent
  ],
  providers: [
    ClubManagementResolver
  ]
})
export class ClubManagementModule {
}
