import { Component } from '@angular/core';

import { AuthComponent } from './auth/auth.component';
import { LearningResourcesComponent } from './learning-resources/learning-resources.component';

@Component({
  selector: 'app-root',templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [AuthComponent, LearningResourcesComponent],
})
export class AppComponent {}
