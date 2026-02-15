import { Component } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';

@Component({
  selector: 'app-tasks',
  
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  imports: [TaskComponent],
})
export class TasksComponent {
  userTasks: Task[] = [];
}
