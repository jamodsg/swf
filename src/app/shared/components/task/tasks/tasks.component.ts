import { Component, Input } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { Observable } from 'rxjs/Observable';
import { ITask } from '../../../interfaces/task.interface';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent {

  @Input() type: string = '';

  tasks$: Observable<ITask[]>;
  public showForm: boolean = false;

  constructor(private taskService: TaskService) {
    this.tasks$ = taskService.tasks$;
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

}
