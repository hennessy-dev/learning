import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'faqs', loadComponent: () => import('./faqs/faqs/faqs.component').then(m => m.FaqsComponent) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/routes') }
];
