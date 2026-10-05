import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  Directive,
  inject,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {ErpButton} from '../button/button';
import {ErpIconButton} from '../icon-button/icon-button';
import {ErpTooltip} from '../tooltip/tooltip';
import {ErpRepeaterItem, ErpRepeaterItemContext} from '../forms-family/forms-contracts';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector -- ERP template extension points intentionally use the erp prefix.
  selector: 'ng-template[erpRepeaterItem]',
})
export class ErpRepeaterItemTemplate<TValue = unknown> {
  readonly template = inject<TemplateRef<ErpRepeaterItemContext<TValue>>>(TemplateRef);
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP production components intentionally use the erp prefix.
  selector: 'erp-repeater',
  imports: [ErpButton, ErpIconButton, ErpTooltip, NgTemplateOutlet],
  templateUrl: './repeater.html',
  styleUrl: './repeater.scss',
  host: {
    '[attr.data-repeater-count]': 'items().length',
    '[attr.data-repeater-disabled]': 'disabled()',
  },
})
export class ErpRepeater<TValue = unknown> {
  readonly items = input<readonly ErpRepeaterItem<TValue>[]>([]);
  readonly label = input('العناصر المتكررة');
  readonly addLabel = input('إضافة عنصر');
  readonly removeLabel = input('حذف العنصر');
  readonly minItems = input(0);
  readonly maxItems = input<number | null>(null);
  readonly disabled = input(false, {transform: booleanAttribute});
  readonly addRequested = output<void>();
  readonly removeRequested = output<string>();

  private readonly itemTemplate = contentChild(ErpRepeaterItemTemplate<TValue>);
  protected readonly canAdd = computed(() =>
    !this.disabled() && (this.maxItems() === null || this.items().length < (this.maxItems() as number)),
  );
  protected readonly canRemove = computed(() => !this.disabled() && this.items().length > Math.max(0, this.minItems()));

  protected context(item: ErpRepeaterItem<TValue>, index: number): ErpRepeaterItemContext<TValue> {
    return {$implicit: item.value, item, key: item.key, index};
  }

  protected template(): TemplateRef<ErpRepeaterItemContext<TValue>> | null {
    return this.itemTemplate()?.template ?? null;
  }
}
