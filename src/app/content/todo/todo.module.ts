import { NgModule } from '@angular/core';
import { toDoRoutes } from './todo-routing.module';
import { TodosComponent } from './todos/todos.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../shared/services/task/task.service';
import { SharedModule } from '../../shared/shared.module';
import { TaskModule } from '../../shared/components/task/task.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(toDoRoutes),
    SharedModule,
    TaskModule
  ],
  declarations: [
    TodosComponent
  ],
  providers: [
    TaskService
  ]
})
export class TodoModule { }
