import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { ITask } from '../../../interfaces/task.interface';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {

  @Input() tasks: ITask[];
  @Input() type: string;

  constructor(public taskService: TaskService) { }

  ngOnInit() {
  }

  completeTask(task: ITask) {
    task.progress = 100;
    this.taskService.updateTask(task.id, task).then(
      () => console.log('task completed'),
      (error: any) => console.log(error)
    );
  }

}
