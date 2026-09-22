import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ErpContainer} from '../../primitives/container/container';
import {ErpDivider} from '../../primitives/divider/divider';
import {ErpGrid} from '../../primitives/grid/grid';
import {ErpIcon} from '../../primitives/icon/icon';
import {
  ERP_ICON_NAMES,
  ErpIconName,
  ErpIconSize,
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

  readonly sizes: readonly ErpIconSize[] = [
    'inherit',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
    '3xl',
  ];

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
