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
    path: 'foundation/feedback-colors',
    loadComponent: () =>
      import('./foundation/feedback-colors/feedback-colors').then(
        (m) => m.FeedbackColors
      ),
  },
  {
    path: 'foundation/typography',
    loadComponent: () =>
      import('./foundation/typography/typography').then((m) => m.Typography),
  },
  {
    path: 'foundation/spacing',
    loadComponent: () =>
      import('./foundation/spacing/spacing').then((m) => m.Spacing),
  },
  {
    path: 'foundation/borders-radius',
    loadComponent: () =>
      import('./foundation/borders-radius/borders-radius').then(
        (m) => m.BordersRadius
      ),
  },
  {
    path: 'foundation/elevation',
    loadComponent: () =>
      import('./foundation/elevation/elevation').then((m) => m.Elevation),
  },
  {
    path: 'foundation/motion',
    loadComponent: () =>
      import('./foundation/motion/motion').then((m) => m.Motion),
  },
  {
    path: 'foundation/density',
    loadComponent: () =>
      import('./foundation/density/density').then((m) => m.Density),
  },
  {
    path: 'foundation/layout-grid',
    loadComponent: () =>
      import('./foundation/layout-grid/layout-grid').then((m) => m.LayoutGrid),
  },
  {
    path: '',
    redirectTo: 'foundation/colors',
    pathMatch: 'full',
  },
];
