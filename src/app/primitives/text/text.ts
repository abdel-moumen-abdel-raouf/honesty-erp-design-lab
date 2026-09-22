import {ChangeDetectionStrategy, Component, ElementRef, computed, inject, input} from '@angular/core';

export type ErpTextType =
  | 'text'
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'heading-4'
  | 'heading-5'
  | 'heading-6'
  | 'paragraph'
  | 'div'
  | 'span'
  | 'pre'
  | 'blockquote'
  | 'address'
  | 'hgroup'
  | 'figure'
  | 'figcaption'
  | 'strong'
  | 'bold'
  | 'emphasis'
  | 'italic'
  | 'underline'
  | 'strike'
  | 'deleted'
  | 'inserted'
  | 'mark'
  | 'small'
  | 'subscript'
  | 'superscript'
  | 'abbreviation'
  | 'definition'
  | 'citation'
  | 'quote'
  | 'time'
  | 'data'
  | 'bdi'
  | 'bdo'
  | 'ruby'
  | 'ruby-text'
  | 'ruby-parenthesis'
  | 'code'
  | 'keyboard'
  | 'sample'
  | 'variable'
  | 'label'
  | 'legend'
  | 'caption'
  | 'summary'
  | 'output'
  | 'list-item'
  | 'term'
  | 'description'
  | 'table-header'
  | 'table-cell'
  | 'link';

export type ErpTextSize =
  | 'auto'
  | 'inherit'
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl';

export type ErpTextWeight = 'auto' | 'inherit' | 'regular' | 'medium' | 'bold';

export type ErpTextTone =
  | 'auto'
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'disabled'
  | 'inverse'
  | 'brand-primary'
  | 'brand-secondary'
  | 'brand-accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export type ErpTextFamily = 'auto' | 'inherit' | 'ui' | 'arabic' | 'latin';

export type ErpTextLineHeight =
  | 'auto'
  | 'inherit'
  | 'tight'
  | 'snug'
  | 'compact'
  | 'normal'
  | 'comfortable'
  | 'relaxed'
  | 'loose';

export type ErpTextFontStyle = 'auto' | 'inherit' | 'normal' | 'italic';
export type ErpTextDecoration = 'auto' | 'inherit' | 'none' | 'underline' | 'line-through';
export type ErpTextAlign = 'inherit' | 'start' | 'center' | 'end' | 'justify';
export type ErpTextWrap = 'auto' | 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'break-spaces';
export type ErpTextOverflow = 'visible' | 'clip' | 'ellipsis';
export type ErpTextDirection = 'inherit' | 'auto' | 'rtl' | 'ltr';
export type ErpTextLineClamp = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type ResolvedTextSize = Exclude<ErpTextSize, 'auto'>;
type ResolvedTextWeight = Exclude<ErpTextWeight, 'auto'>;
type ResolvedTextTone = Exclude<ErpTextTone, 'auto'>;
type ResolvedTextFamily = Exclude<ErpTextFamily, 'auto'>;
type ResolvedTextLineHeight = Exclude<ErpTextLineHeight, 'auto'>;
type ResolvedTextFontStyle = Exclude<ErpTextFontStyle, 'auto'>;
type ResolvedTextDecoration = Exclude<ErpTextDecoration, 'auto'>;
type ResolvedTextWrap = Exclude<ErpTextWrap, 'auto'>;

export interface ErpTextTypePreset {
  readonly size: ResolvedTextSize;
  readonly weight: ResolvedTextWeight;
  readonly tone: ResolvedTextTone;
  readonly family: ResolvedTextFamily;
  readonly lineHeight: ResolvedTextLineHeight;
  readonly fontStyle: ResolvedTextFontStyle;
  readonly decoration: ResolvedTextDecoration;
  readonly wrap: ResolvedTextWrap;
}

export const ERP_TEXT_TYPE_DEFAULTS = {
  'heading-1': preset('3xl', 'bold', 'primary', 'ui', 'snug', 'normal', 'none', 'normal'),
  'heading-2': preset('xl', 'bold', 'primary', 'ui', 'compact', 'normal', 'none', 'normal'),
  'heading-3': preset('lg', 'bold', 'primary', 'ui', 'normal', 'normal', 'none', 'normal'),
  'heading-4': preset('md', 'bold', 'primary', 'ui', 'comfortable', 'normal', 'none', 'normal'),
  'heading-5': preset('sm', 'medium', 'primary', 'ui', 'normal', 'normal', 'none', 'normal'),
  'heading-6': preset('2xs', 'medium', 'secondary', 'ui', 'comfortable', 'normal', 'none', 'normal'),
  paragraph: preset('md', 'regular', 'primary', 'ui', 'loose', 'normal', 'none', 'normal'),
  div: preset('md', 'regular', 'primary', 'ui', 'loose', 'normal', 'none', 'normal'),
  text: preset('md', 'regular', 'primary', 'ui', 'loose', 'normal', 'none', 'normal'),
  span: preset('inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'normal'),
  pre: preset('sm', 'regular', 'primary', 'ui', 'loose', 'normal', 'none', 'pre-wrap'),
  blockquote: preset('md', 'regular', 'secondary', 'ui', 'loose', 'normal', 'none', 'normal'),
  address: preset('md', 'regular', 'secondary', 'ui', 'loose', 'italic', 'none', 'normal'),
  hgroup: preset('inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'normal'),
  figure: preset('inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'normal'),
  figcaption: preset('2xs', 'regular', 'muted', 'ui', 'comfortable', 'normal', 'none', 'normal'),
  strong: preset('inherit', 'bold', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'normal'),
  bold: preset('inherit', 'bold', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'normal'),
  emphasis: preset('inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'italic', 'inherit', 'normal'),
  italic: preset('inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'italic', 'inherit', 'normal'),
  underline: preset('inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'underline', 'normal'),
  strike: preset('inherit', 'inherit', 'muted', 'inherit', 'inherit', 'inherit', 'line-through', 'normal'),
  deleted: preset('inherit', 'inherit', 'danger', 'inherit', 'inherit', 'inherit', 'line-through', 'normal'),
  inserted: preset('inherit', 'inherit', 'success', 'inherit', 'inherit', 'inherit', 'underline', 'normal'),
  mark: preset('inherit', 'inherit', 'brand-accent', 'inherit', 'inherit', 'inherit', 'none', 'normal'),
  small: preset('sm', 'regular', 'inherit', 'inherit', 'relaxed', 'inherit', 'inherit', 'normal'),
  subscript: preset('2xs', 'regular', 'inherit', 'inherit', 'tight', 'inherit', 'inherit', 'normal'),
  superscript: preset('2xs', 'regular', 'inherit', 'inherit', 'tight', 'inherit', 'inherit', 'normal'),
  abbreviation: preset('inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'underline', 'normal'),
  definition: preset('inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'italic', 'inherit', 'normal'),
  citation: preset('inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'italic', 'inherit', 'normal'),
  quote: preset('inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'normal'),
  time: preset('inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'normal'),
  data: preset('inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'normal'),
  bdi: preset('inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'normal'),
  bdo: preset('inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'normal'),
  ruby: preset('inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'normal'),
  'ruby-text': preset('2xs', 'regular', 'muted', 'inherit', 'tight', 'inherit', 'inherit', 'normal'),
  'ruby-parenthesis': preset('2xs', 'regular', 'muted', 'inherit', 'tight', 'inherit', 'inherit', 'normal'),
  code: preset('sm', 'regular', 'inherit', 'latin', 'comfortable', 'normal', 'none', 'normal'),
  keyboard: preset('sm', 'regular', 'inherit', 'latin', 'comfortable', 'normal', 'none', 'normal'),
  sample: preset('sm', 'regular', 'inherit', 'latin', 'comfortable', 'normal', 'none', 'normal'),
  variable: preset('sm', 'regular', 'inherit', 'latin', 'comfortable', 'italic', 'none', 'normal'),
  label: preset('sm', 'medium', 'primary', 'ui', 'normal', 'normal', 'none', 'normal'),
  legend: preset('sm', 'medium', 'primary', 'ui', 'normal', 'normal', 'none', 'normal'),
  caption: preset('2xs', 'regular', 'muted', 'ui', 'comfortable', 'normal', 'none', 'normal'),
  summary: preset('md', 'medium', 'primary', 'ui', 'comfortable', 'normal', 'none', 'normal'),
  output: preset('md', 'regular', 'primary', 'ui', 'loose', 'normal', 'none', 'normal'),
  'list-item': preset('md', 'regular', 'primary', 'ui', 'loose', 'normal', 'none', 'normal'),
  term: preset('sm', 'medium', 'primary', 'ui', 'normal', 'normal', 'none', 'normal'),
  description: preset('md', 'regular', 'primary', 'ui', 'loose', 'normal', 'none', 'normal'),
  'table-header': preset('sm', 'medium', 'primary', 'ui', 'normal', 'normal', 'none', 'normal'),
  'table-cell': preset('sm', 'regular', 'primary', 'ui', 'relaxed', 'normal', 'none', 'normal'),
  link: preset('md', 'medium', 'brand-primary', 'ui', 'comfortable', 'normal', 'underline', 'normal'),
} as const satisfies Readonly<Record<ErpTextType, ErpTextTypePreset>>;

const HEADING_LEVELS: Readonly<Partial<Record<ErpTextType, 1 | 2 | 3 | 4 | 5 | 6>>> = {
  'heading-1': 1,
  'heading-2': 2,
  'heading-3': 3,
  'heading-4': 4,
  'heading-5': 5,
  'heading-6': 6,
};

function preset(
  size: ResolvedTextSize,
  weight: ResolvedTextWeight,
  tone: ResolvedTextTone,
  family: ResolvedTextFamily,
  lineHeight: ResolvedTextLineHeight,
  fontStyle: ResolvedTextFontStyle,
  decoration: ResolvedTextDecoration,
  wrap: ResolvedTextWrap,
): ErpTextTypePreset {
  return {size, weight, tone, family, lineHeight, fontStyle, decoration, wrap};
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-text, [erpText]',
  templateUrl: './text.html',
  styleUrl: './text.scss',
  host: {
    '[attr.data-text-type]': 'type()',
    '[attr.data-text-size]': 'resolvedSize()',
    '[attr.data-text-weight]': 'resolvedWeight()',
    '[attr.data-text-tone]': 'resolvedTone()',
    '[attr.data-text-family]': 'resolvedFamily()',
    '[attr.data-text-line-height]': 'resolvedLineHeight()',
    '[attr.data-text-font-style]': 'resolvedFontStyle()',
    '[attr.data-text-decoration]': 'resolvedDecoration()',
    '[attr.data-text-align]': 'align()',
    '[attr.data-text-wrap]': 'resolvedWrap()',
    '[attr.data-text-overflow]': 'overflow()',
    '[attr.data-text-line-clamp]': 'lineClamp()',
    '[attr.dir]': 'resolvedDirection()',
    '[attr.role]': 'resolvedRole()',
    '[attr.aria-level]': 'resolvedAriaLevel()',
  },
})
export class ErpText {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly type = input<ErpTextType>('text');
  readonly size = input<ErpTextSize>('auto');
  readonly weight = input<ErpTextWeight>('auto');
  readonly tone = input<ErpTextTone>('auto');
  readonly family = input<ErpTextFamily>('auto');
  readonly lineHeight = input<ErpTextLineHeight>('auto');
  readonly fontStyle = input<ErpTextFontStyle>('auto');
  readonly decoration = input<ErpTextDecoration>('auto');
  readonly align = input<ErpTextAlign>('inherit');
  readonly wrap = input<ErpTextWrap>('auto');
  readonly overflow = input<ErpTextOverflow>('visible');
  readonly lineClamp = input<ErpTextLineClamp>(0);
  readonly direction = input<ErpTextDirection>('inherit');

  readonly isCustomHost = this.elementRef.nativeElement.tagName === 'ERP-TEXT';

  readonly resolvedSize = computed<ResolvedTextSize>(() => {
    const value = this.size();
    return value === 'auto' ? ERP_TEXT_TYPE_DEFAULTS[this.type()].size : value;
  });

  readonly resolvedWeight = computed<ResolvedTextWeight>(() => {
    const value = this.weight();
    return value === 'auto' ? ERP_TEXT_TYPE_DEFAULTS[this.type()].weight : value;
  });

  readonly resolvedTone = computed<ResolvedTextTone>(() => {
    const value = this.tone();
    return value === 'auto' ? ERP_TEXT_TYPE_DEFAULTS[this.type()].tone : value;
  });

  readonly resolvedFamily = computed<ResolvedTextFamily>(() => {
    const value = this.family();
    return value === 'auto' ? ERP_TEXT_TYPE_DEFAULTS[this.type()].family : value;
  });

  readonly resolvedLineHeight = computed<ResolvedTextLineHeight>(() => {
    const value = this.lineHeight();
    return value === 'auto' ? ERP_TEXT_TYPE_DEFAULTS[this.type()].lineHeight : value;
  });

  readonly resolvedFontStyle = computed<ResolvedTextFontStyle>(() => {
    const value = this.fontStyle();
    return value === 'auto' ? ERP_TEXT_TYPE_DEFAULTS[this.type()].fontStyle : value;
  });

  readonly resolvedDecoration = computed<ResolvedTextDecoration>(() => {
    const value = this.decoration();
    return value === 'auto' ? ERP_TEXT_TYPE_DEFAULTS[this.type()].decoration : value;
  });

  readonly resolvedWrap = computed<ResolvedTextWrap>(() => {
    const value = this.wrap();
    return value === 'auto' ? ERP_TEXT_TYPE_DEFAULTS[this.type()].wrap : value;
  });

  readonly resolvedDirection = computed(() => {
    const value = this.direction();
    return value === 'inherit' ? null : value;
  });

  private readonly headingLevel = computed(() => {
    return this.isCustomHost ? (HEADING_LEVELS[this.type()] ?? null) : null;
  });

  readonly resolvedRole = computed(() => (this.headingLevel() === null ? null : 'heading'));
  readonly resolvedAriaLevel = computed(() => this.headingLevel());
}
