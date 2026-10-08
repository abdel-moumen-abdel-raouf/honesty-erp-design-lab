import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpFormSection} from '../../../controls/form-section/form-section';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';
import {ErpButton} from '../../../controls/button/button';
import {ErpTextBox} from '../../../controls/text-box/text-box';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'form-section')!;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-form-section-showcase',
  imports: [ErpFormSection, ErpStack, ErpSurface, ErpText, ErpButton, ErpTextBox],
  templateUrl: './form-section-showcase.html',
  styleUrl: './form-section-showcase.scss',
})
export class ErpFormSectionShowcase {
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
