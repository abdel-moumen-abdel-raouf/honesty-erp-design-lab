import {ChangeDetectionStrategy, Component, input} from '@angular/core';

export type ErpSurfaceTone = 'canvas' | 'default' | 'elevated' | 'inverse';
export type ErpSurfaceBorder = 'none' | 'subtle' | 'default' | 'strong';
export type ErpSurfaceElevation = 'none' | 'raised' | 'overlay';
export type ErpSurfaceRadius = 'none' | 'control' | 'surface' | 'overlay' | 'full';
export type ErpSurfacePadding = 'none' | 'tight' | 'default' | 'loose';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-surface',
  templateUrl: './surface.html',
  styleUrl: './surface.scss',
  host: {
    '[attr.data-tone]': 'tone()',
    '[attr.data-border]': 'border()',
    '[attr.data-elevation]': 'elevation()',
    '[attr.data-radius]': 'radius()',
    '[attr.data-padding]': 'padding()',
  },
})
export class ErpSurface {
  readonly tone = input<ErpSurfaceTone>('default');
  readonly border = input<ErpSurfaceBorder>('none');
  readonly elevation = input<ErpSurfaceElevation>('none');
  readonly radius = input<ErpSurfaceRadius>('surface');
  readonly padding = input<ErpSurfacePadding>('default');
}
