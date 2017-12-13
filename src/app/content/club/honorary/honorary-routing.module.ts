import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HonorariesComponent } from './honoraries/honoraries.component';
import { HonorariesListComponent } from './honorary-list/honorary-list.component';
import { HonoraryFormComponent } from './honorary-form/honorary-form.component';
import { ClubResolver } from '../club.resolver';

export const routes: Routes = [
  {
    path: '',
    component: HonorariesComponent,
    children: [
      {
        path: '',
        component: HonorariesListComponent
      },
      {
        path: 'edit',
        component: HonoraryFormComponent,
        /* resolve: {
          honorary: MemberResolver
        } */
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

export const honoraryRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
