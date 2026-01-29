import { Component, inject, input } from '@angular/core';

import { ErrorService } from '../../error.service';

@Component({
    selector: 'app-error-modal',
    templateUrl: './error-modal.component.html',
    styleUrl: './error-modal.component.css',
    standalone: false
})
export class ErrorModalComponent {
  title = input<string>();
  message = input<string>();
  private errorService = inject(ErrorService);

  onClearError() {
    this.errorService.clearError();
  }
}
