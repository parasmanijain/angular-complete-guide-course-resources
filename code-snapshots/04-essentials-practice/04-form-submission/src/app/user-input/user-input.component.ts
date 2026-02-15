import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-input',imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.scss',
})
export class UserInputComponent {
  onSubmit() {
    console.log('SUBMITTED!');
  }
}
