import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpSidebar} from '../../../controls/sidebar/sidebar';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'sidebar')!;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-sidebar-showcase',
  imports: [ErpSidebar, ErpStack, ErpSurface, ErpText],
  templateUrl: './sidebar-showcase.html',
  styleUrl: './sidebar-showcase.scss',
})
export class ErpSidebarShowcase {
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
