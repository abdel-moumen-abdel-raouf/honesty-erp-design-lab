import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  OnInit,
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErpText} from '../../primitives/text/text';
import {ErpIconButton} from '../icon-button/icon-button';
import {
  ErpFieldAppearance,
  ErpFieldHelperPosition,
  ErpFieldSize,
  ErpFieldStatus,
  ErpFieldTone,
} from '../input-family/field-contracts';
import {ErpInputBase} from '../input-family/input-base';
import {ErpInputConfigurationState} from '../input-family/input-contracts';
import {ErpTooltip} from '../tooltip/tooltip';

export interface ErpRangeSliderValue {
  readonly lower: number;
  readonly upper: number;
}

type ErpRangeSliderThumb = 'lower' | 'upper';

let nextRangeSliderId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-range-slider',
  imports: [ErpIconButton, ErpText, ErpTooltip],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ErpRangeSlider),
      multi: true,
    },
  ],
  templateUrl: './range-slider.html',
  styleUrls: [
    './range-slider-tokens.scss',
    './range-slider.scss',
    './range-slider-native.scss',
    './range-slider-facets.scss',
  ],
  host: {
    '[attr.data-range-slider-tone]': 'tone()',
    '[attr.data-range-slider-status]': 'status()',
    '[attr.data-range-slider-size]': 'size()',
    '[attr.data-range-slider-appearance]': 'appearance()',
    '[attr.data-range-slider-configuration-state]': 'rangeConfigurationState()',
    '[attr.data-range-slider-lower]': 'currentValue().lower',
    '[attr.data-range-slider-upper]': 'currentValue().upper',
  },
})
export class ErpRangeSlider
  extends ErpInputBase<ErpRangeSliderValue>
  implements OnInit
{
  readonly min = input(0);
  readonly max = input(100);
  readonly step = input(1);
  readonly defaultRange = input<ErpRangeSliderValue | null>(null);
  readonly tone = input<ErpFieldTone>('neutral');
  readonly status = input<ErpFieldStatus>('none');
  readonly size = input<ErpFieldSize>('md');
  readonly appearance = input<ErpFieldAppearance>('standard');
  readonly helperText = input<string | null>(null);
  readonly helperPosition = input<ErpFieldHelperPosition>('below');
  readonly clearable = input(false, {transform: booleanAttribute});

  protected readonly controlId = `erp-range-slider-${++nextRangeSliderId}`;
  protected readonly lowerId = `${this.controlId}-lower`;
  protected readonly upperId = `${this.controlId}-upper`;
  protected readonly helperId = `${this.controlId}-helper`;
  protected readonly trimmedHelperText = computed(
    () => this.helperText()?.trim() ?? '',
  );
  protected readonly rangeConfigurationState =
    computed<ErpInputConfigurationState>(() =>
      this.configurationState() === 'ready' &&
      Number.isFinite(this.min()) &&
      Number.isFinite(this.max()) &&
      Number.isFinite(this.step()) &&
      this.min() <= this.max() &&
      this.step() > 0
        ? 'ready'
        : 'invalid',
    );
  protected readonly rangeEffectiveDisabled = computed(
    () =>
      this.effectiveDisabled() || this.rangeConfigurationState() === 'invalid',
  );
  protected readonly lowerPosition = computed(() =>
    this.positionFor(this.currentValue().lower),
  );
  protected readonly upperPosition = computed(() =>
    this.positionFor(this.currentValue().upper),
  );

  private externalValueWritten = false;

  constructor() {
    super({lower: 0, upper: 100});
  }

  ngOnInit(): void {
    if (!this.externalValueWritten) {
      super.writeValue(this.resetValue());
    }
  }

  override writeValue(value: unknown): void {
    this.externalValueWritten = true;
    super.writeValue(value);
  }

  protected override normalizeValue(value: unknown): ErpRangeSliderValue {
    const candidate = this.isRangeValue(value)
      ? value
      : {lower: this.min(), upper: this.max()};
    const lower = this.clamp(candidate.lower);
    const upper = this.clamp(candidate.upper);

    return lower <= upper
      ? {lower, upper}
      : {lower: upper, upper: lower};
  }

  protected handleInput(thumb: ErpRangeSliderThumb, event: Event): void {
    if (this.rangeEffectiveDisabled()) {
      return;
    }

    const numeric = (event.target as HTMLInputElement).valueAsNumber;
    const current = this.currentValue();
    const next =
      thumb === 'lower'
        ? {lower: Math.min(numeric, current.upper), upper: current.upper}
        : {lower: current.lower, upper: Math.max(numeric, current.lower)};
    this.commitUserValue(next);
  }

  protected handleKeyDown(
    thumb: ErpRangeSliderThumb,
    event: KeyboardEvent,
  ): void {
    if (this.rangeEffectiveDisabled()) {
      return;
    }

    const current = this.currentValue();
    let value = thumb === 'lower' ? current.lower : current.upper;

    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      value += this.step();
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      value -= this.step();
    } else if (event.key === 'Home') {
      value = thumb === 'lower' ? this.min() : current.lower;
    } else if (event.key === 'End') {
      value = thumb === 'lower' ? current.upper : this.max();
    } else {
      return;
    }

    event.preventDefault();
    const next =
      thumb === 'lower'
        ? {lower: Math.min(this.clamp(value), current.upper), upper: current.upper}
        : {lower: current.lower, upper: Math.max(this.clamp(value), current.lower)};
    this.commitUserValue(next);
  }

  protected handleNativeFocus(): void {
    if (!this.rangeEffectiveDisabled()) {
      this.handleFocus();
    }
  }

  protected handleNativeBlur(): void {
    this.handleBlur();
  }

  protected handleClear(): void {
    if (this.clearable() && !this.rangeEffectiveDisabled()) {
      this.commitUserValue(this.resetValue());
    }
  }

  private resetValue(): ErpRangeSliderValue {
    const candidate = this.defaultRange();
    return candidate !== null && this.isValidConfiguredRange(candidate)
      ? {lower: candidate.lower, upper: candidate.upper}
      : {lower: this.min(), upper: this.max()};
  }

  private isRangeValue(value: unknown): value is ErpRangeSliderValue {
    return (
      typeof value === 'object' &&
      value !== null &&
      'lower' in value &&
      'upper' in value &&
      typeof value.lower === 'number' &&
      typeof value.upper === 'number' &&
      Number.isFinite(value.lower) &&
      Number.isFinite(value.upper)
    );
  }

  private isValidConfiguredRange(value: ErpRangeSliderValue): boolean {
    return (
      Number.isFinite(value.lower) &&
      Number.isFinite(value.upper) &&
      value.lower >= this.min() &&
      value.upper <= this.max() &&
      value.lower <= value.upper
    );
  }

  private clamp(value: number): number {
    return Math.min(this.max(), Math.max(this.min(), value));
  }

  private positionFor(value: number): number {
    const extent = this.max() - this.min();
    return extent === 0 ? 0 : ((value - this.min()) / extent) * 100;
  }
}
