import { Routes } from '@angular/router';
import { CalendarComponent } from './calendar.component';

export const calendarRoutes: Routes = [

  {
    path: '',
    component: CalendarComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
