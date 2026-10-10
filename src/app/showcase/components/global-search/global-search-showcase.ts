import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpGlobalSearch} from '../../../controls/global-search/global-search';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpReviewShowcaseReferenceComparison} from '../../../review-internals/showcase-reference-comparison/showcase-reference-comparison';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'global-search')!;
const REVIEW_GALLERY_GROUPS = [
  {
    "id": "default",
    "label": "الحالة الافتراضية",
    "cases": [
      {
        "id": "default",
        "label": "الحالة الافتراضية",
        "inputs": {
          "results": [
            {
              "id": "invoice-1042",
              "label": "فاتورة 1042",
              "category": "المبيعات",
              "description": "شركة النور للتجارة",
              "icon": "file"
            },
            {
              "id": "customer-amira",
              "label": "أميرة حداد",
              "category": "العملاء",
              "description": "الفرع الرئيسي",
              "icon": "user"
            },
            {
              "id": "stock-laptop",
              "label": "حاسوب محمول للأعمال",
              "category": "المخزون",
              "description": "متاح 18 قطعة",
              "icon": "inventory"
            },
            {
              "id": "supplier-northwind",
              "label": "Northwind Trading International",
              "category": "الموردون",
              "description": "حساب مورد نشط",
              "icon": "building"
            },
            {
              "id": "archived-ledger",
              "label": "قيد مؤرشف",
              "category": "الحسابات العامة",
              "description": "غير متاح حاليًا",
              "icon": "archive",
              "disabled": true
            }
          ],
          "mode": "dropdown",
          "query": ""
        }
      }
    ]
  },
  {
    "id": "mode",
    "label": "الأوضاع",
    "cases": [
      {
        "id": "mode-modal",
        "label": "mode: modal",
        "inputs": {
          "results": [
            {
              "id": "invoice-1042",
              "label": "فاتورة 1042",
              "category": "المبيعات",
              "description": "شركة النور للتجارة",
              "icon": "file"
            },
            {
              "id": "customer-amira",
              "label": "أميرة حداد",
              "category": "العملاء",
              "description": "الفرع الرئيسي",
              "icon": "user"
            },
            {
              "id": "stock-laptop",
              "label": "حاسوب محمول للأعمال",
              "category": "المخزون",
              "description": "متاح 18 قطعة",
              "icon": "inventory"
            },
            {
              "id": "supplier-northwind",
              "label": "Northwind Trading International",
              "category": "الموردون",
              "description": "حساب مورد نشط",
              "icon": "building"
            },
            {
              "id": "archived-ledger",
              "label": "قيد مؤرشف",
              "category": "الحسابات العامة",
              "description": "غير متاح حاليًا",
              "icon": "archive",
              "disabled": true
            }
          ],
          "mode": "modal",
          "query": ""
        }
      },
      {
        "id": "mode-dropdown",
        "label": "mode: dropdown",
        "inputs": {
          "results": [
            {
              "id": "invoice-1042",
              "label": "فاتورة 1042",
              "category": "المبيعات",
              "description": "شركة النور للتجارة",
              "icon": "file"
            },
            {
              "id": "customer-amira",
              "label": "أميرة حداد",
              "category": "العملاء",
              "description": "الفرع الرئيسي",
              "icon": "user"
            },
            {
              "id": "stock-laptop",
              "label": "حاسوب محمول للأعمال",
              "category": "المخزون",
              "description": "متاح 18 قطعة",
              "icon": "inventory"
            },
            {
              "id": "supplier-northwind",
              "label": "Northwind Trading International",
              "category": "الموردون",
              "description": "حساب مورد نشط",
              "icon": "building"
            },
            {
              "id": "archived-ledger",
              "label": "قيد مؤرشف",
              "category": "الحسابات العامة",
              "description": "غير متاح حاليًا",
              "icon": "archive",
              "disabled": true
            }
          ],
          "mode": "dropdown",
          "query": ""
        }
      },
      {
        "id": "mode-inline",
        "label": "mode: inline",
        "inputs": {
          "results": [
            {
              "id": "invoice-1042",
              "label": "فاتورة 1042",
              "category": "المبيعات",
              "description": "شركة النور للتجارة",
              "icon": "file"
            },
            {
              "id": "customer-amira",
              "label": "أميرة حداد",
              "category": "العملاء",
              "description": "الفرع الرئيسي",
              "icon": "user"
            },
            {
              "id": "stock-laptop",
              "label": "حاسوب محمول للأعمال",
              "category": "المخزون",
              "description": "متاح 18 قطعة",
              "icon": "inventory"
            },
            {
              "id": "supplier-northwind",
              "label": "Northwind Trading International",
              "category": "الموردون",
              "description": "حساب مورد نشط",
              "icon": "building"
            },
            {
              "id": "archived-ledger",
              "label": "قيد مؤرشف",
              "category": "الحسابات العامة",
              "description": "غير متاح حاليًا",
              "icon": "archive",
              "disabled": true
            }
          ],
          "mode": "inline",
          "query": ""
        }
      }
    ]
  }
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-global-search-showcase',
  imports: [ErpGlobalSearch, ErpReviewShowcaseControlPanel, ErpReviewShowcaseReferenceComparison, ErpStack, ErpSurface, ErpText],
  templateUrl: './global-search-showcase.html',
  styleUrl: './global-search-showcase.scss',
})
export class ErpGlobalSearchShowcase {
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
