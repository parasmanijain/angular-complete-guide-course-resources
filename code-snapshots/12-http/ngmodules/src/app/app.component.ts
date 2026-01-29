import { Component, inject } from '@angular/core';

import { ErrorService } from './shared/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false,
})
export class AppComponent {
  private errorService = inject(ErrorService);
  error = this.errorService.error;
}
