import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TravelService, Tour } from '../../services/travel.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  username = '';
  isAdmin = false;
  userTours: Tour[] = [];

  constructor(private auth: AuthService, private router: Router, private travel: TravelService) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.username = user.username || 'Guest';
    this.isAdmin = this.auth.isAdmin();
    this.userTours = this.travel.getCart();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
