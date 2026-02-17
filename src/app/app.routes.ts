import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { DashboardPageComponent } from './pages/dashboard/dashboard-page.component';
import { LandingPageComponent } from './pages/landing/landing-page.component';
import { RegisterPageComponent } from './pages/register/register-page.component';
import { SettingsPageComponent } from './pages/settings/settings-page.component';
import { SignInPageComponent } from './pages/sign-in/sign-in-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'landing' },
  { path: 'landing', component: LandingPageComponent },
  { path: 'sign-in', component: SignInPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'dashboard', component: DashboardPageComponent, canActivate: [authGuard] },
  { path: 'settings', component: SettingsPageComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'landing' }
];
