import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpAlert} from '../../../controls/alert/alert';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';
import {CoreBatch as ErpReviewExactCoreShowcase} from '../../../review-internals/exact-core-showcase/core-batch';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'alert')!;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-alert-showcase',
  imports: [ErpAlert, ErpStack, ErpSurface, ErpText, ErpReviewExactCoreShowcase],
  templateUrl: './alert-showcase.html',
  styleUrl: './alert-showcase.scss',
})
export class ErpAlertShowcase {
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
