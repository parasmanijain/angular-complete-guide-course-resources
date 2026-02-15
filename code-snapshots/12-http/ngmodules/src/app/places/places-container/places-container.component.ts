import { Component, input } from '@angular/core';

@Component({
    selector: 'app-places-container',
    templateUrl: './places-container.component.html',
    styleUrl: './places-container.component.scss',
    standalone: false
})
export class PlacesContainerComponent {
  title = input.required<string>();
}
