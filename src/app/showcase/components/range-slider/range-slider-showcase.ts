import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpRangeSlider} from '../../../controls/range-slider/range-slider';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'range-slider')!;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-range-slider-showcase',
  imports: [ErpRangeSlider, ErpStack, ErpSurface, ErpText, ReactiveFormsModule],
  templateUrl: './range-slider-showcase.html',
  styleUrl: './range-slider-showcase.scss',
})
export class ErpRangeSliderShowcase {
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
