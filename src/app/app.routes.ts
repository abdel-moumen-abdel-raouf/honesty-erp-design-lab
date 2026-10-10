import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'patterns/entity-wizard',
    data: {pattern: 'entity-wizard'},
    loadComponent: () =>
      import('./review-internals/planned-ui-patterns/planned-ui-patterns').then(
        (module) => module.ErpReviewPlannedUiPattern,
      ),
  },
  {
    path: 'patterns/entity-directory',
    data: {pattern: 'entity-directory'},
    loadComponent: () =>
      import('./review-internals/planned-ui-patterns/planned-ui-patterns').then(
        (module) => module.ErpReviewPlannedUiPattern,
      ),
  },
  {
    path: 'patterns/entity-detail',
    data: {pattern: 'entity-detail'},
    loadComponent: () =>
      import('./review-internals/planned-ui-patterns/planned-ui-patterns').then(
        (module) => module.ErpReviewPlannedUiPattern,
      ),
  },
  {
    path: 'components',
    loadComponent: () =>
      import('./showcase/component-catalog/component-catalog-page').then(
        (module) => module.ComponentCatalogPage,
      ),
  },
  {
    path: 'components/:componentId',
    loadComponent: () =>
      import('./showcase/component-showcase/component-showcase').then(
        (module) => module.ComponentShowcase,
      ),
  },
  {path: 'foundation/overview', redirectTo: 'components', pathMatch: 'full'},
  {path: 'primitives/structural', redirectTo: 'components', pathMatch: 'full'},
  {path: 'primitives/typography', redirectTo: 'components/text', pathMatch: 'full'},
  {path: 'primitives/icons', redirectTo: 'components/icon', pathMatch: 'full'},
  {path: 'controls/buttons', redirectTo: 'components/button', pathMatch: 'full'},
  {path: 'controls/tooltips', redirectTo: 'components/tooltip', pathMatch: 'full'},
  {path: 'controls/inputs', redirectTo: 'components/text-box', pathMatch: 'full'},
  {path: 'controls/empty-states', redirectTo: 'components/empty-state', pathMatch: 'full'},
  {path: 'controls/overlays', redirectTo: 'components', pathMatch: 'full'},
  {path: 'controls/core-batch', redirectTo: 'components', pathMatch: 'full'},
  {path: 'controls/data-batch', redirectTo: 'components', pathMatch: 'full'},
  {path: 'controls/forms-batch', redirectTo: 'components', pathMatch: 'full'},
  {path: 'controls/entity-form-batch', redirectTo: 'components', pathMatch: 'full'},
  {path: 'controls/shell-batch', redirectTo: 'components', pathMatch: 'full'},
  {path: 'foundation/colors', redirectTo: 'components', pathMatch: 'full'},
  {path: 'foundation/colors/status-hues', redirectTo: 'components', pathMatch: 'full'},
  {path: 'foundation/themes', redirectTo: 'components', pathMatch: 'full'},
  {path: 'foundation/feedback-colors', redirectTo: 'components/status-badge', pathMatch: 'full'},
  {path: 'foundation/typography', redirectTo: 'components/text', pathMatch: 'full'},
  {path: 'foundation/charts', redirectTo: 'components', pathMatch: 'full'},
  {path: 'foundation/preferences', redirectTo: 'components', pathMatch: 'full'},
  {path: 'foundation/spacing', redirectTo: 'components', pathMatch: 'full'},
  {path: 'foundation/borders-radius', redirectTo: 'components', pathMatch: 'full'},
  {path: 'foundation/elevation', redirectTo: 'components/surface', pathMatch: 'full'},
  {path: 'foundation/motion', redirectTo: 'components', pathMatch: 'full'},
  {path: 'foundation/density', redirectTo: 'components', pathMatch: 'full'},
  {path: 'foundation/layout-grid', redirectTo: 'components/grid', pathMatch: 'full'},
  {path: 'foundation/layers', redirectTo: 'components/surface', pathMatch: 'full'},
  {path: '', redirectTo: 'components', pathMatch: 'full'},
];
