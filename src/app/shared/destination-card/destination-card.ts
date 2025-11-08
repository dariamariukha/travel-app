import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-destination-card',
  standalone: true,
  templateUrl: './destination-card.html',
  styleUrl: './destination-card.css'
})
export class DestinationCard {
  @Input() destination: any;
}

