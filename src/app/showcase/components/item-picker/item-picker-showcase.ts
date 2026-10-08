import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpItemPicker} from '../../../controls/item-picker/item-picker';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'item-picker')!;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-item-picker-showcase',
  imports: [ErpItemPicker, ErpStack, ErpSurface, ErpText, ReactiveFormsModule],
  templateUrl: './item-picker-showcase.html',
  styleUrl: './item-picker-showcase.scss',
})
export class ErpItemPickerShowcase {
  readonly entry = ENTRY;
  readonly cases = ENTRY.showcaseCases;
  readonly lastEvent = signal('لم يحدث تفاعل بعد');
  private readonly modelValues = signal<Readonly<Record<string, unknown>>>({});
  readonly control = new FormControl<unknown>(null);

  constructor() {
    this.control.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.recordEvent('valueChange', value);
    });
  }

  modelValue(name: string, fallback: unknown): unknown {
    return this.modelValues()[name] ?? fallback;
  }

  recordModel(name: string, value: unknown): void {
    this.modelValues.update((current) => ({...current, [name]: value}));
    this.recordEvent(`${name}Change`, value);
  }

  recordEvent(name: string, value: unknown): void {
    let rendered = '';
    try { rendered = typeof value === 'string' ? value : JSON.stringify(value); }
    catch { rendered = String(value); }
    this.lastEvent.set(`${name}: ${rendered}`);
  }
}
