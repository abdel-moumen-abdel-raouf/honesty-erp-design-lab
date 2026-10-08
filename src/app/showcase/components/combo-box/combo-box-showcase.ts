import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpComboBox} from '../../../controls/combo-box/combo-box';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'combo-box')!;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-combo-box-showcase',
  imports: [ErpComboBox, ErpStack, ErpSurface, ErpText, ReactiveFormsModule],
  templateUrl: './combo-box-showcase.html',
  styleUrl: './combo-box-showcase.scss',
})
export class ErpComboBoxShowcase {
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
