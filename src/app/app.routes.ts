import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'foundation/colors',
    loadComponent: () =>
      import('./foundation/colors/colors').then((m) => m.Colors),
  },
  {
    path: 'foundation/colors/status-hues',
    loadComponent: () =>
      import('./foundation/colors/status-hues/status-hues').then(
        (m) => m.StatusHues
      ),
  },
  {
    path: 'foundation/themes',
    loadComponent: () =>
      import('./foundation/themes/themes').then((m) => m.Themes),
  },
  {
    path: '',
    redirectTo: 'foundation/colors',
    pathMatch: 'full',
  },
];
