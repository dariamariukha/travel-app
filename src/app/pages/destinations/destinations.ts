import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationCard } from '../../shared/destination-card/destination-card';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule, DestinationCard],
  templateUrl: './destinations.html',
  styleUrl: './destinations.css'
})
export class Destinations {
  destinations = [
    { name: 'Paris', description: 'The city of lights and love.' },
    { name: 'Kyiv', description: 'A beautiful city on the Dnieper River.' },
    { name: 'Vienna', description: 'Classical music and imperial architecture.' }
  ];
}