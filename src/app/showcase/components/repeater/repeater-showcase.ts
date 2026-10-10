import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpRepeater, ErpRepeaterItemTemplate} from '../../../controls/repeater/repeater';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpReviewShowcaseReferenceComparison} from '../../../review-internals/showcase-reference-comparison/showcase-reference-comparison';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';
import {ErpInline} from '../../../primitives/inline/inline';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'repeater')!;
const REVIEW_GALLERY_GROUPS = [
  {
    "id": "default",
    "label": "الحالة الافتراضية",
    "cases": [
      {
        "id": "default",
        "label": "الحالة الافتراضية",
        "inputs": {
          "items": [
            {
              "key": "contact-1",
              "value": {
                "name": "أميرة حداد",
                "role": "مديرة المالية"
              }
            },
            {
              "key": "contact-2",
              "value": {
                "name": "عمر ناصر",
                "role": "مسؤول المخزون"
              }
            }
          ],
          "label": "جهات اتصال المورد",
          "addLabel": "إضافة جهة اتصال",
          "removeLabel": "حذف جهة الاتصال",
          "minItems": 1,
          "maxItems": 4
        }
      }
    ]
  },
  {
    "id": "disabled",
    "label": "disabled",
    "cases": [
      {
        "id": "disabled-false",
        "label": "غير مفعّل (false)",
        "inputs": {
          "items": [
            {
              "key": "contact-1",
              "value": {
                "name": "أميرة حداد",
                "role": "مديرة المالية"
              }
            },
            {
              "key": "contact-2",
              "value": {
                "name": "عمر ناصر",
                "role": "مسؤول المخزون"
              }
            }
          ],
          "label": "جهات اتصال المورد",
          "addLabel": "إضافة جهة اتصال",
          "removeLabel": "حذف جهة الاتصال",
          "minItems": 1,
          "maxItems": 4,
          "disabled": false
        }
      },
      {
        "id": "disabled-true",
        "label": "مفعّل (true)",
        "inputs": {
          "items": [
            {
              "key": "contact-1",
              "value": {
                "name": "أميرة حداد",
                "role": "مديرة المالية"
              }
            },
            {
              "key": "contact-2",
              "value": {
                "name": "عمر ناصر",
                "role": "مسؤول المخزون"
              }
            }
          ],
          "label": "جهات اتصال المورد",
          "addLabel": "إضافة جهة اتصال",
          "removeLabel": "حذف جهة الاتصال",
          "minItems": 1,
          "maxItems": 4,
          "disabled": true
        }
      }
    ]
  },
  {
    "id": "states",
    "label": "الحالات",
    "cases": [
      {
        "id": "disabled",
        "label": "حالة معطلة",
        "inputs": {
          "items": [
            {
              "key": "contact-1",
              "value": {
                "name": "أميرة حداد",
                "role": "مديرة المالية"
              }
            },
            {
              "key": "contact-2",
              "value": {
                "name": "عمر ناصر",
                "role": "مسؤول المخزون"
              }
            }
          ],
          "label": "جهات اتصال المورد",
          "addLabel": "إضافة جهة اتصال",
          "removeLabel": "حذف جهة الاتصال",
          "minItems": 1,
          "maxItems": 4,
          "disabled": true
        }
      }
    ]
  }
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-repeater-showcase',
  imports: [ErpRepeater, ErpReviewShowcaseControlPanel, ErpReviewShowcaseReferenceComparison, ErpStack, ErpSurface, ErpText, ErpInline, ErpRepeaterItemTemplate],
  templateUrl: './repeater-showcase.html',
  styleUrl: './repeater-showcase.scss',
})
export class ErpRepeaterShowcase {
  readonly entry = ENTRY;
  readonly controls = ENTRY.showcaseControls;
  readonly galleryGroups = REVIEW_GALLERY_GROUPS;
  readonly lastEvent = signal('لم يحدث تفاعل بعد');
  readonly liveValues = signal<Readonly<Record<string, unknown>>>({...ENTRY.showcaseInitialValues});
  readonly cvaValue = signal<unknown>(null);
  readonly controlValues = computed<Readonly<Record<string, unknown>>>(() => ({
    ...this.liveValues(),
    '$value': this.cvaValue(),
  }));

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

  applyControl(change: ErpShowcaseControlChange): void {
    if (change.control.source === 'cva') {
      this.cvaValue.set(change.value);
      return;
    }
    const value = change.control.kind === 'function'
      ? this.functionPreset(change.control.name, change.value)
      : change.value;
    this.liveValues.update((current) => ({...current, [change.control.name]: value}));
  }

  addRepeaterItem(): void {
    const items = this.repeaterItems();
    const sequence = items.length + 1;
    const next = [...items, {key: `contact-${sequence}`, value: {name: 'جهة اتصال جديدة', role: 'مستخدم النظام'}}];
    this.liveValues.update((current) => ({...current, items: next}));
    this.recordEvent('addRequested', undefined);
  }

  removeRepeaterItem(key: string): void {
    const next = this.repeaterItems().filter((item) => item.key !== key);
    this.liveValues.update((current) => ({...current, items: next}));
    this.recordEvent('removeRequested', key);
  }

  private repeaterItems(): {key: string; value: unknown}[] {
    const items = this.value('items');
    return Array.isArray(items)
      ? items.filter((item): item is {key: string; value: unknown} => Boolean(item) && typeof item === 'object' && typeof (item as {key?: unknown}).key === 'string')
      : [];
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
