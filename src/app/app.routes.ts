import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Destinations } from './pages/destinations/destinations';
import { About } from './pages/about/about';
import { Login } from './pages/login/login';
import { Profile } from './pages/profile/profile';
import { AuthGuard } from './guards/auth-guard';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'destinations', component: Destinations},
  { path: 'about', component: About },
  { path: 'login', component: Login },
  { path: 'profile', component: Profile, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' }
];
