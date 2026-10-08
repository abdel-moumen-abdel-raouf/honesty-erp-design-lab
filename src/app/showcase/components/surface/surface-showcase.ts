import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpText} from '../../../primitives/text/text';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'surface')!;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-surface-showcase',
  imports: [ErpSurface, ErpStack, ErpText],
  templateUrl: './surface-showcase.html',
  styleUrl: './surface-showcase.scss',
})
export class ErpSurfaceShowcase {
  readonly entry = ENTRY;
  readonly cases = ENTRY.showcaseCases;
  readonly lastEvent = signal('لم يحدث تفاعل بعد');
  private readonly modelValues = signal<Readonly<Record<string, unknown>>>({});

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
