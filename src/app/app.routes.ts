import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard/dashboard-page.component';
import { SettingsPageComponent } from './pages/settings/settings-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'settings', component: SettingsPageComponent },
  { path: '**', redirectTo: 'dashboard' }
];
