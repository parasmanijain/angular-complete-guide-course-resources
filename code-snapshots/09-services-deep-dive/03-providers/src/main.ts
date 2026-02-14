import { provideZoneChangeDetection } from "@angular/core";
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
// import { TasksService } from './app/tasks/tasks.service';

// bootstrapApplication(AppComponent, {
//   providers: [TasksService]
// }).catch((err) => console.error(err));
bootstrapApplication(AppComponent, {providers: [provideZoneChangeDetection()]}).catch((err) => console.error(err));
