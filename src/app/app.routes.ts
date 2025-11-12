import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Destinations } from './pages/destinations/destinations';
import { About } from './pages/about/about';
import { Login } from './pages/login/login';
import { Profile } from './pages/profile/profile';
import { Register } from './pages/register/register';
import { AuthGuard} from './guards/auth-guard';
import { TourDetails } from './pages/tour-details/tour-details';
import { Cart } from './pages/cart/cart'; 
import { Checkout } from './pages/checkout/checkout';
import { ManageTours } from './pages/manage-tours/manage-tours';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'destinations', component: Destinations },
  { path: 'about', component: About },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'profile', component: Profile, canActivate: [AuthGuard] },
  { path: 'tour/:id', component: TourDetails },
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout },
  { path: 'manage-tours', component: ManageTours, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' }
];
