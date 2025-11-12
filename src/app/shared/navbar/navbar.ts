import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  constructor(public auth: AuthService) {}

  logout() {
    this.auth.logout();
  }

  isAdmin(): boolean {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return false;
    const user = JSON.parse(currentUser);
    return user.role === 'admin';
  }
}
