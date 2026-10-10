import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpFilePicker} from '../../../controls/file-picker/file-picker';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ErpButton} from '../../../controls/button/button';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'file-picker')!;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-file-picker-showcase',
  imports: [ErpFilePicker, ErpReviewShowcaseControlPanel, ErpStack, ErpSurface, ErpText, ReactiveFormsModule, ErpButton],
  templateUrl: './file-picker-showcase.html',
  styleUrl: './file-picker-showcase.scss',
})
export class ErpFilePickerShowcase {
  readonly entry = ENTRY;
  readonly controls = ENTRY.showcaseControls;
  readonly lastEvent = signal('لم يحدث تفاعل بعد');
  readonly liveValues = signal<Readonly<Record<string, unknown>>>({...ENTRY.showcaseInitialValues});
  readonly cvaValue = signal<unknown>(null);
  readonly controlValues = computed<Readonly<Record<string, unknown>>>(() => ({
    ...this.liveValues(),
    '$value': null,
  }));
  readonly control = new FormControl<unknown>({"value":null,"disabled":false});

  constructor() {
    this.control.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.cvaValue.set(value);
      this.recordEvent('valueChange', value);
    });
  }

  readonly previewInline = computed(() => Number(this.liveValues()['$previewInline'] ?? 80));
  readonly previewBlock = computed(() => Number(this.liveValues()['$previewBlock'] ?? 75));

  value(name: string): unknown {
    return this.liveValues()[name];
  }

  applyControl(change: ErpShowcaseControlChange): void {
    if (change.control.source === 'cva') {
      this.control.setValue(change.value);
      return;
    }
    if (change.control.name === 'disabled') {
      this.liveValues.update((current) => ({...current, disabled: change.value}));
      if (change.value) this.control.disable();
      else this.control.enable();
      return;
    }
    const value = change.control.kind === 'function'
      ? this.functionPreset(change.control.name, change.value)
      : change.value;
    this.liveValues.update((current) => ({...current, [change.control.name]: value}));
  }

  loadSampleFiles(): void {
    this.control.setValue([new File(['approved purchase offer'], 'عرض-السعر.pdf', {type: 'application/pdf', lastModified: 1})]);
  }

  recordModel(name: string, value: unknown): void {
    this.liveValues.update((current) => ({...current, [name]: value}));
    this.recordEvent(`${name}Change`, value);
  }

  recordEvent(name: string, value: unknown): void {
    const rendered = this.fileSummary(value);
    this.lastEvent.set(`${name}: ${rendered}`);
  }

  fileSummary(value: unknown): string {
    if (!Array.isArray(value)) return value === null ? 'لا ملفات' : String(value);
    const names = value
      .filter((entry): entry is {readonly name: string} => Boolean(entry) && typeof entry === 'object' && typeof (entry as {name?: unknown}).name === 'string')
      .map((entry) => entry.name);
    return names.length > 0 ? names.join('، ') : 'لا ملفات';
  }

  private functionPreset(name: string, value: unknown): unknown {
    if (value !== 'sample') return null;
    if (/comparator/i.test(name)) return () => 0;
    if (/formatter/i.test(name)) return (candidate: unknown) => String(candidate ?? '');
    if (/disabled/i.test(name)) return () => false;
    if (/filter|predicate/i.test(name)) return () => true;
    return (candidate: unknown) => candidate;
  }
}
