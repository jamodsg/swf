import { Routes } from '@angular/router';
import { UnAuthGuard } from '../../shared/services/auth/unauth.guard';
import { AuthGuard } from '../../shared/services/auth/auth.guard';

export const mainRoutes: Routes = [
  {
    path: 'login',
    loadChildren: '../auth/login.module#LoginModule',
    canActivate: [UnAuthGuard]
    /* resolve: {
      application: ApplicationsResolver
    }*/
  },
  {
    path: '',
    loadChildren: '../admin/admin.module#AdminModule',
    canActivate: [AuthGuard]
  }
];
