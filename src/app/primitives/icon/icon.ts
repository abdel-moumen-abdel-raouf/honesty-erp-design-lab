import {NgIcon} from '@ng-icons/core';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import {
  ErpIconAccessibilityState,
  ErpIconName,
  ErpIconSize,
  ErpIconState,
  ErpIconStrokeWidth,
  ErpIconTone,
  ErpIconVariant,
} from './icon-contracts';
import {ERP_ICON_REGISTRY, ErpIconDefinition} from './icon-registry';

const ERP_ICON_STROKE_WIDTH_VALUES: Readonly<Record<ErpIconStrokeWidth, number>> = {
  thin: 1,
  light: 1.5,
  regular: 2,
  medium: 2.5,
  bold: 3,
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-icon',
  imports: [NgIcon],
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
  host: {
    '[attr.data-icon-name]': 'name()',
    '[attr.data-icon-size]': 'size()',
    '[attr.data-icon-tone]': 'tone()',
    '[attr.data-icon-variant]': 'variant()',
    '[attr.data-icon-stroke-width]': 'strokeWidth()',
    '[attr.data-icon-stroke-effective]': "variant() === 'outline' ? 'true' : 'false'",
    '[attr.data-icon-state]': 'state()',
    '[attr.data-icon-mirror-rtl]': 'mirrorInRtl()',
    '[attr.data-icon-accessibility]': 'accessibilityState()',
    '[attr.role]': "state() === 'ready' && accessibilityState() === 'labelled' ? 'img' : null",
    '[attr.aria-label]':
      "state() === 'ready' && accessibilityState() === 'labelled' ? trimmedLabel() : null",
    '[attr.aria-hidden]':
      "state() === 'ready' && accessibilityState() === 'labelled' ? null : 'true'",
  },
})
export class ErpIcon {
  readonly name = input.required<ErpIconName>();
  readonly size = input<ErpIconSize>('md');
  readonly tone = input<ErpIconTone>('inherit');
  readonly variant = input<ErpIconVariant>('outline');
  readonly strokeWidth = input<ErpIconStrokeWidth>('regular');
  readonly decorative = input(true, {
    transform: booleanAttribute,
  });
  readonly label = input('');

  readonly definition = computed<ErpIconDefinition | null>(() => {
    return ERP_ICON_REGISTRY[this.name()] ?? null;
  });

  readonly svg = computed(() => {
    const definition = this.definition();

    if (definition === null) {
      return null;
    }

    return this.variant() === 'filled'
      ? definition.filledSvg
      : definition.outlineSvg;
  });

  readonly resolvedStrokeWidth = computed(
    () => ERP_ICON_STROKE_WIDTH_VALUES[this.strokeWidth()],
  );

  readonly state = computed<ErpIconState>(() => {
    return this.definition() === null ? 'invalid' : 'ready';
  });

  readonly mirrorInRtl = computed(() => this.definition()?.mirrorInRtl ?? false);

  readonly trimmedLabel = computed(() => this.label().trim());

  readonly accessibilityState = computed<ErpIconAccessibilityState>(() => {
    if (this.decorative()) {
      return 'decorative';
    }

    return this.trimmedLabel().length > 0 ? 'labelled' : 'invalid';
  });
}
