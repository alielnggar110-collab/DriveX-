import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'cars', loadComponent: () => import('./pages/cars/cars.component').then(m => m.CarsComponent) },
  { path: 'cars/:id', loadComponent: () => import('./pages/cars-details/cars-details.component').then(m => m.CarDetailsComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: '**', redirectTo: '' }
];