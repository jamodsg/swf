import { Routes } from '@angular/router';
import { SFWCalendarComponent } from './sfw-calendar.component';

export const sfwCalendarRoutes: Routes = [

  {
    path: '',
    component: SFWCalendarComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
