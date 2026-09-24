import {
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
  ],
  templateUrl: './radio-box.html',
  styleUrl: './radio-box.scss',
  host: {
    '[attr.data-radio-box-tone]': 'tone()',
    '[attr.data-radio-box-status]': 'status()',
    '[attr.data-radio-box-size]': 'size()',
    '[attr.data-radio-box-state]': 'controlState()',
    '[attr.data-radio-box-checked]': 'currentValue()',
  },
})
export class ErpRadioBox extends ErpInputBase<boolean> {
  readonly tone = input<ErpFieldTone>('neutral');
  readonly status = input<ErpFieldStatus>('none');
  readonly size = input<ErpFieldSize>('md');

  protected readonly controlId = `erp-radio-box-${++nextRadioBoxId}`;
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
    if ((event.target as HTMLInputElement).checked && !this.currentValue()) {
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
