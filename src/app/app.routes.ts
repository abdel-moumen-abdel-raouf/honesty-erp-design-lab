import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'foundation/colors',
    loadComponent: () =>
      import('./foundation/colors/colors').then((m) => m.Colors),
  },
  {
    path: '',
    redirectTo: 'foundation/colors',
    pathMatch: 'full',
  },
];
