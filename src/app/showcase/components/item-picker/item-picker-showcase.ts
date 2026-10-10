import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpItemPicker} from '../../../controls/item-picker/item-picker';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpReviewShowcaseReferenceComparison} from '../../../review-internals/showcase-reference-comparison/showcase-reference-comparison';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'item-picker')!;
const REVIEW_GALLERY_GROUPS = [
  {
    "id": "default",
    "label": "الحالة الافتراضية",
    "cases": [
      {
        "id": "default",
        "label": "الحالة الافتراضية",
        "inputs": {
          "label": "المستودع الافتراضي",
          "helperText": "اختر المستودع الذي يستقبل الحركات تلقائيًا",
          "placeholder": "اختر مستودعًا",
          "searchable": true,
          "clearable": true,
          "items": [
            {
              "value": "inventory-main",
              "label": "المستودع الرئيسي",
              "description": "القاهرة — متاح لكل الوحدات",
              "icon": "inventory"
            },
            {
              "value": "inventory-alex",
              "label": "مستودع الإسكندرية",
              "description": "الإسكندرية — مبيعات التجزئة",
              "icon": "building"
            },
            {
              "value": "inventory-damaged",
              "label": "مستودع التالف",
              "description": "موقوف مؤقتًا",
              "icon": "warning",
              "disabled": true
            }
          ]
        }
      }
    ]
  }
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-item-picker-showcase',
  imports: [ErpItemPicker, ErpReviewShowcaseControlPanel, ErpReviewShowcaseReferenceComparison, ErpStack, ErpSurface, ErpText, ReactiveFormsModule],
  templateUrl: './item-picker-showcase.html',
  styleUrl: './item-picker-showcase.scss',
})
export class ErpItemPickerShowcase {
  readonly entry = ENTRY;
  readonly controls = ENTRY.showcaseControls;
  readonly galleryGroups = REVIEW_GALLERY_GROUPS;
  readonly lastEvent = signal('لم يحدث تفاعل بعد');
  readonly liveValues = signal<Readonly<Record<string, unknown>>>({...ENTRY.showcaseInitialValues});
  readonly cvaValue = signal<unknown>("inventory-main");
  readonly controlValues = computed<Readonly<Record<string, unknown>>>(() => ({
    ...this.liveValues(),
    '$value': this.cvaValue(),
  }));
  private readonly galleryControls = new Map<string, FormControl<unknown>>();
  readonly control = new FormControl<unknown>({"value":"inventory-main","disabled":false});

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

  galleryValue(showcaseCase: {readonly inputs: Readonly<Record<string, unknown>>}, name: string): unknown {
    if (name === 'open') return false;
    return Object.prototype.hasOwnProperty.call(showcaseCase.inputs, name)
      ? showcaseCase.inputs[name]
      : ENTRY.showcaseInitialValues?.[name];
  }

  galleryControl(id: string, disabled: unknown): FormControl<unknown> {
    const existing = this.galleryControls.get(id);
    if (existing) return existing;
    const control = new FormControl<unknown>({value: "inventory-main", disabled: Boolean(disabled)});
    this.galleryControls.set(id, control);
    return control;
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

  recordModel(name: string, value: unknown): void {
    this.liveValues.update((current) => ({...current, [name]: value}));
    this.recordEvent(`${name}Change`, value);
  }

  recordEvent(name: string, value: unknown): void {
    let rendered = '';
    try { rendered = typeof value === 'string' ? value : JSON.stringify(value); }
    catch { rendered = String(value); }
    this.lastEvent.set(`${name}: ${rendered}`);
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
