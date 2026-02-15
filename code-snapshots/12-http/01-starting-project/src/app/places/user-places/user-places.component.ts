import { Component } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';

@Component({
  selector: 'app-user-places',
  
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.scss',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent {
}
