import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  
import { TravelService, Tour } from '../../services/travel.service';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './destinations.html',
  styleUrl: './destinations.css'
})
export class Destinations implements OnInit {
  tours: Tour[] = [];
  filteredTours: Tour[] = [];

  selectedCountries: string[] = [];
  minPrice?: number;
  maxPrice?: number;

  countries: string[] = [
  'France',
  'Ukraine',
  'Austria',
  'Italy',
  'Poland',
  'Germany',
  'Switzerland',
  'Spain'
];

  constructor(
    private travelService: TravelService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.tours = this.travelService.getAllTours();
    this.filteredTours = [...this.tours];
  }

  toggleCountry(country: string) {
    if (this.selectedCountries.includes(country)) {
      this.selectedCountries = this.selectedCountries.filter(c => c !== country);
    } else {
      this.selectedCountries.push(country);
    }
    this.applyFilters();
  }

  applyFilters() {
    this.filteredTours = this.travelService.filterTours(
      this.selectedCountries,
      this.minPrice,
      this.maxPrice
    );
  }

  resetFilters() {
    this.selectedCountries = [];
    this.minPrice = undefined;
    this.maxPrice = undefined;
    this.filteredTours = [...this.tours];
  }

  addToCart(tour: Tour) {
    if (!this.auth.isLoggedIn()) {
      alert('Please log in to add tours to your cart.');
      return;
    }
    this.travelService.addToCart(tour);
    alert(`Tour "${tour.title}" added to your cart!`);
  }
}
