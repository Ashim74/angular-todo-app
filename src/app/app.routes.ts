import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      )
  },
  {
    path: 'todos',
    loadChildren: () =>
      import('./features/todo/todo.module').then((m) => m.TodoModule)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
