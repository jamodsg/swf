import { RouterModule, Routes } from '@angular/router';
import { ClubManagementsComponent } from './club-managements/club-managements.component';
import { ModuleWithProviders } from '@angular/core';
import { ClubManagementListComponent } from './club-management-list/club-management-list.component';
import { ClubManagementFormComponent } from './club-management-form/club-management-form.component';
import { ClubManagementResolver } from './club-management.resolver';

export const routes: Routes = [
  {
    path: '',
    component: ClubManagementsComponent,
    children: [
      {
        path: '',
        component: ClubManagementListComponent
      },
      {
        path: 'edit/:managementId',
        component: ClubManagementFormComponent,
        resolve: {
          clubManagement: ClubManagementResolver
        }
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

export const clubManagementRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
