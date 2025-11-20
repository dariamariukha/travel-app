import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TravelService, Tour } from '../../services/travel.service';
import { AuthService } from '../../services/auth.service';
import { CountryFormatPipe } from '../../pipes/country-format.pipe'; 

@Component({
  selector: 'app-tour-details',
  standalone: true,
  imports: [CommonModule, CountryFormatPipe],
  templateUrl: './tour-details.html',
  styleUrl: './tour-details.css'
})
export class TourDetails {
  tour?: Tour;

  constructor(
    private route: ActivatedRoute,
    private travelService: TravelService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.tour = this.travelService.getById(id);
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


