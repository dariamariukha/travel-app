import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Destinations } from './pages/destinations/destinations';
import { About } from './pages/about/about';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'destinations', component: Destinations},
  { path: 'about', component: About },
  { path: '**', redirectTo: 'home' }
];
