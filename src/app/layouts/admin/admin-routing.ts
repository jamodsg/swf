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
        path: 'apps',
        loadChildren: '../../content/apps/apps.module#AppsModule'
      },
      {
        path: 'widgets',
        loadChildren: '../../content/widgets/widgets.module#WidgetsModule'
      },
      {
        path: 'material',
        loadChildren: '../../content/material/material.module#MaterialComponentsModule'
      },
      {
        path: 'ecommerce',
        loadChildren: '../../content/ecommerce/ecommerce.module#EcommerceModule'
      },
      {
        path: 'taskboard',
        loadChildren: '../../content/taskboard/taskboard.module#TaskboardModule'
      },
      {
        path: 'forms',
        loadChildren: '../../content/forms/forms.module#FormModule'
      },
      {
        path: 'tables',
        loadChildren: '../../content/tables/tables.module#TablesModule'
      },
      {
        path: 'charts',
        loadChildren: '../../content/chartlib/chartlib.module#ChartlibModule'
      },
      {
        path: 'maps',
        loadChildren: '../../content/maps/maps.module#MapModule'
      },
      {
        path: 'dragndrop',
        loadChildren: '../../content/dragndrop/dragndrop.module#DragndropModule'
      },
      {
        path: 'pages',
        loadChildren: '../../content/pages/pages.module#PagesModule'
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  }
];
