import { Component, inject, input } from '@angular/core';
import { ModalComponent } from "../modal.component";
import { ErrorService } from '../../error.service';

@Component({
    selector: 'app-error-modal',
    
    templateUrl: './error-modal.component.html',
    styleUrl: './error-modal.component.css',
    imports: [ModalComponent]
})
export class ErrorModalComponent {
  title = input<string>();
  message = input<string>();
  private errorService = inject(ErrorService);onClearError() {
    this.errorService.clearError();
  }
}
