import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {
  ErpFieldSize,
  ErpFieldStatus,
  ErpFieldTone,
} from '../input-family/field-contracts';
import {ErpInputBase} from '../input-family/input-base';
import {ErpText} from '../../primitives/text/text';

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
  ],
  templateUrl: './check-box.html',
  styleUrl: './check-box.scss',
  host: {
    '[attr.data-check-box-tone]': 'tone()',
    '[attr.data-check-box-status]': 'status()',
    '[attr.data-check-box-size]': 'size()',
    '[attr.data-check-box-state]': 'controlState()',
    '[attr.data-check-box-checked]': 'currentValue()',
    '[attr.data-check-box-indeterminate]': 'indeterminate()',
  },
})
export class ErpCheckBox extends ErpInputBase<boolean> {
  readonly indeterminate = input(false, {transform: booleanAttribute});
  readonly tone = input<ErpFieldTone>('neutral');
  readonly status = input<ErpFieldStatus>('none');
  readonly size = input<ErpFieldSize>('md');

  protected readonly controlId = `erp-check-box-${++nextCheckBoxId}`;
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
