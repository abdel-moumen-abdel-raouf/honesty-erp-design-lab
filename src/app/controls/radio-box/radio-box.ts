import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
} from '@angular/core';
import {NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErpText} from '../../primitives/text/text';
import {
  ErpFieldSize,
  ErpFieldStatus,
  ErpFieldTone,
} from '../input-family/field-contracts';
import {ErpInputBase} from '../input-family/input-base';

export type ErpRadioBoxMode = 'radio' | 'tile';
export type ErpRadioBoxVariant = 'outline' | 'filled' | 'soft';

let nextRadioBoxId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-radio-box',
  imports: [ErpText],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ErpRadioBox),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ErpRadioBox),
      multi: true,
    },
  ],
  templateUrl: './radio-box.html',
  styleUrls: [
    './radio-box-token-frame.scss',
    './radio-box-token-geometry.scss',
    './radio-box.scss',
    './radio-box-states.scss',
    './radio-box-tile.scss',
    './radio-box-tone-facets.scss',
    './radio-box-variant-facets.scss',
    './radio-box-status-facets.scss',
    './radio-box-sizes.scss',
  ],
  host: {
    '[attr.data-radio-box-tone]': 'tone()',
    '[attr.data-radio-box-status]': 'effectiveStatus()',
    '[attr.data-radio-box-size]': 'size()',
    '[attr.data-radio-box-mode]': 'mode()',
    '[attr.data-radio-box-variant]': 'variant()',
    '[attr.data-radio-box-state]': 'controlState()',
    '[attr.data-radio-box-checked]': 'currentValue()',
    '[attr.data-radio-box-readonly]': 'readOnly()',
    '[attr.data-radio-box-hide-text]': 'hideText()',
    '[attr.data-radio-box-has-description]': 'trimmedDescription().length > 0',
  },
})
export class ErpRadioBox extends ErpInputBase<boolean> {
  readonly description = input<string | null>(null);
  readonly readOnly = input(false, {transform: booleanAttribute});
  readonly hideText = input(false, {transform: booleanAttribute});
  readonly tone = input<ErpFieldTone>('neutral');
  readonly status = input<ErpFieldStatus>('none');
  readonly size = input<ErpFieldSize>('md');
  readonly mode = input<ErpRadioBoxMode>('radio');
  readonly variant = input<ErpRadioBoxVariant>('outline');

  protected readonly controlId = `erp-radio-box-${++nextRadioBoxId}`;
  protected readonly effectiveStatus = computed<ErpFieldStatus>(
    () => (this.valid() ? this.status() : 'danger'),
  );
  protected readonly trimmedDescription = computed(
    () => this.description()?.trim() ?? '',
  );
  protected readonly controlState = computed(() => {
    if (this.configurationState() === 'invalid') {
      return 'invalid';
    }

    return this.effectiveDisabled() ? 'disabled' : 'ready';
  });

  constructor() {
    super(false);
  }

  protected override normalizeValue(value: unknown): boolean {
    return value === true;
  }

  protected override classifyPresence(value: unknown) {
    return value === false ? 'no-selection' as const : null;
  }

  protected handleNativeClick(event: MouseEvent): void {
    if (this.readOnly()) {
      event.preventDefault();
    }
  }

  protected handleNativeKeydown(event: KeyboardEvent): void {
    if (
      this.readOnly() &&
      (event.key === ' ' || event.key === 'Enter')
    ) {
      event.preventDefault();
    }
  }

  protected handleChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (this.readOnly()) {
      input.checked = this.currentValue();
      return;
    }

    if (input.checked && !this.currentValue()) {
      this.commitUserValue(true);
    }
  }

  protected handleNativeFocus(): void {
    this.handleFocus();
  }

  protected handleNativeBlur(): void {
    this.handleBlur();
  }
}
