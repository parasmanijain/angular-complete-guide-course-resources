import { Component, Input } from '@angular/core';
import { TaskComponent } from './task/task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent],
})
export class TasksComponent {
  @Input() name?: string;
}
