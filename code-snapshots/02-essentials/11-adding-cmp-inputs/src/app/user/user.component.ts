import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  standalone: true,
})
export class UserComponent {
  @Input() avatar!: string;
  @Input() name!: string;
  get imagePath() {
    return 'assets/users/' + this.avatar;
  }
  onSelectUser() {}
}
