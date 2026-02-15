import { Component } from '@angular/core';
import { NewTicketComponent } from "./new-ticket/new-ticket.component";

@Component({
    selector: 'app-tickets',
    
    templateUrl: './tickets.component.html',
    styleUrl: './tickets.component.scss',
    imports: [NewTicketComponent]
})
export class TicketsComponent {

}
