import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'transactions', loadComponent: () => import('./pages/transactions/transactions.component').then(m => m.TransactionsComponent) },
  { path: 'recommendations', loadComponent: () => import('./pages/recommendations/recommendations.component').then(m => m.RecommendationsComponent) },
  { path: 'partners', loadComponent: () => import('./pages/partners/partners.component').then(m => m.PartnersComponent) },
  { path: 'profile', loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent) },
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
];
