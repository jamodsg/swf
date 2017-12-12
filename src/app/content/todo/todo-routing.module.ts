import { Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component';

export const toDoRoutes: Routes = [
  {
    path: '',
    component: TodosComponent,
    pathMatch: 'full'
  },
  {
    path: 'closed-tasks',
    component: TodosComponent,
    resolve: {
      filter: {
        progress: 100
      }
    }
  },
  {
    path: 'own-tasks',
    component: TodosComponent,
    resolve: {
      filter: {
        assignedMember: '1234567'
      }
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
