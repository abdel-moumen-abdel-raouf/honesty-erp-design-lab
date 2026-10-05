import {ChangeDetectionStrategy, Component, DestroyRef, inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpTextBox} from '../../text-box/text-box';
import {ErpDataFilter, ErpDataFilterDefinition} from '../../data-table/data-table-contracts';
import {ERP_OVERLAY_DATA, ERP_OVERLAY_REF} from '../../../shared/overlay/overlay-tokens';
import {ErpOverlayRef} from '../../../shared/overlay/overlay-ref';

export interface ErpFilterDrawerData {
  readonly definitions: readonly ErpDataFilterDefinition[];
  readonly filters: readonly ErpDataFilter[];
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- Internal ERP overlay content intentionally uses the erp prefix.
  selector: 'erp-filter-drawer-content',
  imports: [ErpStack, ErpTextBox, FormsModule],
  templateUrl: './filter-drawer-content.html',
})
export class ErpFilterDrawerContent {
  private readonly data = inject<ErpFilterDrawerData>(ERP_OVERLAY_DATA);
  private readonly ref = inject<ErpOverlayRef<readonly ErpDataFilter[]>>(ERP_OVERLAY_REF);
  private readonly values = signal<Record<string, string>>(
    Object.fromEntries(this.data.filters.map((filter) => [filter.key, filter.value])),
  );
  protected readonly definitions = this.data.definitions;

  constructor() {
    const destroyRef = inject(DestroyRef);
    const unregisterApply = this.ref.registerFrameAction('apply', () => this.apply());
    const unregisterClear = this.ref.registerFrameAction('clear', () => this.values.set({}));
    destroyRef.onDestroy(() => { unregisterApply(); unregisterClear(); });
  }

  protected value(key: string): string { return this.values()[key] ?? ''; }
  protected update(key: string, value: unknown): void {
    this.values.update((current) => ({...current, [key]: String(value ?? '')}));
  }

  private apply(): void {
    const values = this.values();
    this.ref.close(this.definitions
      .map((definition) => ({key: definition.key, label: definition.label, value: (values[definition.key] ?? '').trim()}))
      .filter((filter) => filter.value.length > 0));
  }
}
