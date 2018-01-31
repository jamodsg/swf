import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PendingChangesGuard } from '../../shared/services/auth/pending-changes.guard';
import { MembersComponent } from './members/members.component';

const routes: Routes = [
  {
    path: '',
    component: MembersComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export const memberRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
