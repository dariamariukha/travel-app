import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TravelService, Tour } from '../../services/travel.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  cart: Tour[] = [];
  total = 0;

  constructor(private travelService: TravelService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cart = this.travelService.getCart();
    this.total = this.cart.reduce((sum, tour) => sum + tour.price, 0);
  }

  removeTour(id: number) {
    this.travelService.removeFromCart(id);
    this.loadCart();
  }

  clearCart() {
    this.travelService.clearCart();
    this.loadCart();
  }
}
