import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  signal,
  SimpleChanges,
} from '@angular/core';
import {NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErpText} from '../../primitives/text/text';
import {
  ErpFieldSize,
  ErpFieldStatus,
  ErpFieldTone,
} from '../input-family/field-contracts';
import {ErpInputBase} from '../input-family/input-base';

export type ErpCheckBoxMode = 'checkbox' | 'switch' | 'tile';
export type ErpCheckBoxVariant = 'outline' | 'filled' | 'soft';

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
    './check-box-token-frame.scss',
    './check-box-token-geometry.scss',
    './check-box.scss',
    './check-box-states.scss',
    './check-box-switch.scss',
    './check-box-tile.scss',
    './check-box-facets.scss',
    './check-box-sizes.scss',
  ],
  host: {
    '[attr.data-check-box-tone]': 'tone()',
    '[attr.data-check-box-status]': 'effectiveStatus()',
    '[attr.data-check-box-size]': 'size()',
    '[attr.data-check-box-mode]': 'mode()',
    '[attr.data-check-box-variant]': 'variant()',
    '[attr.data-check-box-state]': 'controlState()',
    '[attr.data-check-box-checked]': 'currentValue()',
    '[attr.data-check-box-indeterminate]': 'effectiveIndeterminate()',
    '[attr.data-check-box-readonly]': 'readOnly()',
    '[attr.data-check-box-hide-text]': 'hideText()',
    '[attr.data-check-box-has-description]': 'trimmedDescription().length > 0',
  },
})
export class ErpCheckBox extends ErpInputBase<boolean> {
  readonly description = input<string | null>(null);
  readonly indeterminate = input(false, {transform: booleanAttribute});
  readonly readOnly = input(false, {transform: booleanAttribute});
  readonly hideText = input(false, {transform: booleanAttribute});
  readonly tone = input<ErpFieldTone>('neutral');
  readonly status = input<ErpFieldStatus>('none');
  readonly size = input<ErpFieldSize>('md');
  readonly mode = input<ErpCheckBoxMode>('checkbox');
  readonly variant = input<ErpCheckBoxVariant>('outline');

  private readonly userClearedIndeterminate = signal(false);

  protected readonly controlId = `erp-check-box-${++nextCheckBoxId}`;
  protected readonly effectiveIndeterminate = computed(
    () => this.indeterminate() && !this.userClearedIndeterminate(),
  );
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

  override ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);

    if (changes['indeterminate'] !== undefined) {
      this.userClearedIndeterminate.set(false);
    }
  }

  protected override normalizeValue(value: unknown): boolean {
    return value === true;
  }

  protected override classifyPresence(value: unknown) {
    return value === false ? 'no-selection' as const : null;
  }

  protected handleLabelClick(event: MouseEvent): void {
    if (!this.readOnly()) {
      return;
    }

    event.preventDefault();
    (event.currentTarget as HTMLElement)
      .querySelector<HTMLInputElement>('input')
      ?.focus();
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
      input.indeterminate = this.effectiveIndeterminate();
      return;
    }

    if (this.effectiveIndeterminate()) {
      this.userClearedIndeterminate.set(true);
    }

    this.commitUserValue(input.checked);
  }

  protected handleNativeFocus(): void {
    this.handleFocus();
  }

  protected handleNativeBlur(): void {
    this.handleBlur();
  }
}
