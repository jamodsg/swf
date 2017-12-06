import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: '../../content/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  }
];
