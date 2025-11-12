import { Injectable } from '@angular/core';

type Role = 'admin' | 'user';
interface CurrentUser { username: string; role: Role; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly KEY_IS_LOGGED_IN = 'isLoggedIn';
  private readonly KEY_ROLE = 'role';
  private readonly KEY_CURRENT_USER = 'currentUser';
  private readonly KEY_REGISTERED_USER = 'user'; 

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'Admin123') {
      const user: CurrentUser = { username, role: 'admin' };
      localStorage.setItem(this.KEY_IS_LOGGED_IN, 'true');
      localStorage.setItem(this.KEY_ROLE, 'admin');
      localStorage.setItem(this.KEY_CURRENT_USER, JSON.stringify(user));
      return true;
    }

    const raw = localStorage.getItem(this.KEY_REGISTERED_USER);
    if (raw) {
      try {
        const regUser = JSON.parse(raw) as { username: string; password: string };
        if (regUser.username === username && regUser.password === password) {
          const user: CurrentUser = { username, role: 'user' };
          localStorage.setItem(this.KEY_IS_LOGGED_IN, 'true');
          localStorage.setItem(this.KEY_ROLE, 'user');
          localStorage.setItem(this.KEY_CURRENT_USER, JSON.stringify(user));
          return true;
        }
      } catch {}
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem(this.KEY_IS_LOGGED_IN);
    localStorage.removeItem(this.KEY_ROLE);
    localStorage.removeItem(this.KEY_CURRENT_USER);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.KEY_IS_LOGGED_IN) === 'true';
  }

  getCurrentUser(): CurrentUser | null {
    const raw = localStorage.getItem(this.KEY_CURRENT_USER);
    if (!raw) return null;
    try { return JSON.parse(raw) as CurrentUser; } catch { return null; }
  }

  isAdmin(): boolean {
    const role = localStorage.getItem(this.KEY_ROLE);
    if (role) return role === 'admin';
    const user = this.getCurrentUser();
    return !!user && user.role === 'admin';
  }
}
