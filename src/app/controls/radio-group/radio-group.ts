import {booleanAttribute, ChangeDetectionStrategy, Component, ElementRef, computed, forwardRef, inject, input} from '@angular/core';
import {FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ErpText} from '../../primitives/text/text';
import {ErpInputBase} from '../input-family/input-base';
import {ErpRadioBox} from '../radio-box/radio-box';
import {ErpRadioGroupOption} from '../composite-family/composite-contracts';

let nextRadioGroupId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'erp-radio-group',
  imports: [ErpRadioBox, ErpText, FormsModule],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ErpRadioGroup), multi: true}],
  templateUrl: './radio-group.html',
  styleUrl: './radio-group.scss',
  host: {'[attr.data-radio-group-value]': 'currentValue()', '[attr.data-radio-group-state]': 'groupState()'},
})
export class ErpRadioGroup extends ErpInputBase<string | null> {
  readonly options = input.required<readonly ErpRadioGroupOption[]>();
  readonly required = input(false, {transform: booleanAttribute});
  protected readonly groupId = `erp-radio-group-${++nextRadioGroupId}`;
  protected readonly coordinatedName = computed(() => this.name() ?? this.groupId);
  protected readonly groupState = computed(() => this.configurationState() === 'invalid' ? 'invalid' : this.effectiveDisabled() ? 'disabled' : 'ready');
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  constructor() { super(null); }
  protected override normalizeValue(value: unknown): string | null { return typeof value === 'string' && this.options().some((option) => option.value === value && !option.disabled) ? value : null; }
  protected select(option: ErpRadioGroupOption, checked: boolean): void { if (checked && !option.disabled) this.commitUserValue(option.value); }
  protected handleKeydown(event: KeyboardEvent): void {
    if (!['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'].includes(event.key)) return;
    const enabled = this.options().filter((option) => !option.disabled);
    if (enabled.length === 0) return;
    event.preventDefault();
    const current = Math.max(0, enabled.findIndex((option) => option.value === this.currentValue()));
    const delta = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : -1;
    const next = enabled[(current + delta + enabled.length) % enabled.length];
    if (this.commitUserValue(next.value)) {
      queueMicrotask(() => {
        const option = [
          ...this.host.nativeElement.querySelectorAll<HTMLElement>(
            'erp-radio-box[data-radio-value]',
          ),
        ].find((element) => element.dataset['radioValue'] === next.value);

        option?.querySelector<HTMLInputElement>('input')?.focus();
      });
    }
  }
}
