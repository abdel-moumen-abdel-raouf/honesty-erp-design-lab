import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ErpContainer} from '../../primitives/container/container';
import {ErpDivider} from '../../primitives/divider/divider';
import {ErpGrid} from '../../primitives/grid/grid';
import {ErpIcon} from '../../primitives/icon/icon';
import {
  ERP_ICON_NAMES,
  ERP_ICON_SIZES,
  ERP_ICON_STROKE_WIDTHS,
  ERP_ICON_VARIANTS,
  ErpIconName,
  ErpIconTone,
} from '../../primitives/icon/icon-contracts';
import {ErpInline} from '../../primitives/inline/inline';
import {ErpSection} from '../../primitives/section/section';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpSurface} from '../../primitives/surface/surface';
import {ErpText} from '../../primitives/text/text';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-icon-primitives',
  imports: [
    ErpContainer,
    ErpDivider,
    ErpGrid,
    ErpIcon,
    ErpInline,
    ErpSection,
    ErpStack,
    ErpSurface,
    ErpText,
  ],
  templateUrl: './icon-primitives.html',
  styleUrl: './icon-primitives.scss',
})
export class IconPrimitives {
  readonly iconNames = ERP_ICON_NAMES;
  readonly sizes = ERP_ICON_SIZES;
  readonly variants = ERP_ICON_VARIANTS;
  readonly strokeWidths = ERP_ICON_STROKE_WIDTHS;

  readonly tones: readonly ErpIconTone[] = [
    'inherit',
    'primary',
    'secondary',
    'muted',
    'disabled',
    'inverse',
    'brand-primary',
    'brand-secondary',
    'brand-accent',
    'success',
    'warning',
    'danger',
    'info',
  ];

  readonly directionalIconNames: readonly ErpIconName[] = [
    'chevron-start',
    'chevron-end',
    'login',
    'logout',
    'skip-start',
    'skip-end',
  ];
}
