import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TravelService } from '../../services/travel.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {
  checkoutForm: FormGroup;
  total = 0;

  constructor(private fb: FormBuilder, private travelService: TravelService, private router: Router) {
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      payment: ['', Validators.required]
    });


    this.total = this.travelService.getCart().reduce((sum, item) => sum + item.price, 0);
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      alert(`Thank you, ${this.checkoutForm.value.name}! Your booking is confirmed.`);
      this.travelService.clearCart();
      this.router.navigate(['/home']);
    }
  }
}
