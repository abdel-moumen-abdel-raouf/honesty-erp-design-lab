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
  ErpIconTone,
} from './icon-contracts';
import {ERP_ICON_REGISTRY, ErpIconDefinition} from './icon-registry';

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
  readonly decorative = input(true, {
    transform: booleanAttribute,
  });
  readonly label = input('');

  readonly definition = computed<ErpIconDefinition | null>(() => {
    return ERP_ICON_REGISTRY[this.name()] ?? null;
  });

  readonly svg = computed(() => this.definition()?.svg ?? null);

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
