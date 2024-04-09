import { Routes } from '@angular/router';
import { BoRequestComponent } from './components/bo-requests/bo-requests.component';

export const routes: Routes = [
  { path: '', redirectTo: 'back-office/requests', pathMatch: 'full' },
  {
    path: 'back-office/requests',
    component: BoRequestComponent,
  },
];
