import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ErpContainer} from '../../primitives/container/container';
import {ErpDivider} from '../../primitives/divider/divider';
import {ErpGrid} from '../../primitives/grid/grid';
import {ErpInline} from '../../primitives/inline/inline';
import {ErpSection} from '../../primitives/section/section';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpSurface} from '../../primitives/surface/surface';
import {
  ERP_TEXT_TYPE_DEFAULTS,
  ErpText,
  ErpTextAlign,
  ErpTextDirection,
  ErpTextFamily,
  ErpTextLineHeight,
  ErpTextOverflow,
  ErpTextSize,
  ErpTextTone,
  ErpTextType,
  ErpTextWeight,
  ErpTextWrap,
} from '../../primitives/text/text';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-typography-primitives',
  imports: [
    ErpContainer,
    ErpDivider,
    ErpGrid,
    ErpInline,
    ErpSection,
    ErpStack,
    ErpSurface,
    ErpText,
  ],
  templateUrl: './typography-primitives.html',
  styleUrl: './typography-primitives.scss',
})
export class TypographyPrimitives {
  readonly allTypes = Object.keys(ERP_TEXT_TYPE_DEFAULTS) as ErpTextType[];
  readonly sizes: Exclude<ErpTextSize, 'auto' | 'inherit'>[] = [
    '2xs',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
    '3xl',
    '4xl',
    '5xl',
  ];
  readonly weights: Exclude<ErpTextWeight, 'auto' | 'inherit'>[] = [
    'regular',
    'medium',
    'bold',
  ];
  readonly lineHeights: Exclude<ErpTextLineHeight, 'auto' | 'inherit'>[] = [
    'tight',
    'snug',
    'compact',
    'normal',
    'comfortable',
    'relaxed',
    'loose',
  ];
  readonly tones: Exclude<ErpTextTone, 'auto' | 'inherit'>[] = [
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
  readonly families: Exclude<ErpTextFamily, 'auto' | 'inherit'>[] = ['ui', 'arabic', 'latin'];
  readonly alignments: ErpTextAlign[] = ['start', 'center', 'end', 'justify'];
  readonly wraps: Exclude<ErpTextWrap, 'auto'>[] = [
    'normal',
    'nowrap',
    'pre',
    'pre-wrap',
    'break-spaces',
  ];
  readonly overflows: ErpTextOverflow[] = ['visible', 'clip', 'ellipsis'];
  readonly directions: Exclude<ErpTextDirection, 'inherit'>[] = ['rtl', 'ltr', 'auto'];
}
