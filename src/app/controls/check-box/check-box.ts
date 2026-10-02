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

let nextCheckBoxId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-check-box',
  imports: [ErpText],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ErpCheckBox),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ErpCheckBox),
      multi: true,
    },
  ],
  templateUrl: './check-box.html',
  styleUrls: [
    './check-box.scss',
    './check-box-states.scss',
    './check-box-facets.scss',
    './check-box-sizes.scss',
  ],
  host: {
    '[attr.data-check-box-tone]': 'tone()',
    '[attr.data-check-box-status]': "valid() ? status() : 'danger'",
    '[attr.data-check-box-size]': 'size()',
    '[attr.data-check-box-state]': 'controlState()',
    '[attr.data-check-box-checked]': 'currentValue()',
    '[attr.data-check-box-indeterminate]': 'indeterminate()',
    '[attr.data-check-box-has-description]': 'trimmedDescription().length > 0',
  },
})
export class ErpCheckBox extends ErpInputBase<boolean> {
  readonly description = input<string | null>(null);
  readonly indeterminate = input(false, {transform: booleanAttribute});
  readonly tone = input<ErpFieldTone>('neutral');
  readonly status = input<ErpFieldStatus>('none');
  readonly size = input<ErpFieldSize>('md');

  protected readonly controlId = `erp-check-box-${++nextCheckBoxId}`;
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

  protected handleChange(event: Event): void {
    this.commitUserValue((event.target as HTMLInputElement).checked);
  }

  protected handleNativeFocus(): void {
    this.handleFocus();
  }

  protected handleNativeBlur(): void {
    this.handleBlur();
  }
}
