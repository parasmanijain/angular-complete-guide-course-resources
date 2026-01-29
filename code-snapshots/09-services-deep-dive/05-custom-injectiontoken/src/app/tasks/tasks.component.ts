import { Component } from '@angular/core';

import { NewTaskComponent } from './new-task/new-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
// import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  
  templateUrl: './tasks.component.html',
  imports: [NewTaskComponent, TasksListComponent],
  // providers: [TasksService]
})
export class TasksComponent {}
