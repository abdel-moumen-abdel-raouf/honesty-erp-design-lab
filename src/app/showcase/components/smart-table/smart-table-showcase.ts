import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpSmartTable} from '../../../controls/smart-table/smart-table';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpReviewShowcaseReferenceComparison} from '../../../review-internals/showcase-reference-comparison/showcase-reference-comparison';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';
import {ErpButton} from '../../../controls/button/button';
import {ErpStatusBadge} from '../../../controls/status-badge/status-badge';
import {ErpTableCell} from '../../../controls/table/table';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'smart-table')!;
const REVIEW_GALLERY_GROUPS = [
  {
    "id": "default",
    "label": "الحالة الافتراضية",
    "cases": [
      {
        "id": "default",
        "label": "الحالة الافتراضية",
        "inputs": {
          "caption": "دليل العملاء المحلي",
          "columns": [
            {
              "key": "code",
              "label": "الكود",
              "sortable": true,
              "required": true,
              "hideable": false
            },
            {
              "key": "name",
              "label": "العميل",
              "sortable": true,
              "required": true
            },
            {
              "key": "city",
              "label": "المدينة",
              "sortable": true
            },
            {
              "key": "balance",
              "label": "الرصيد",
              "sortable": true,
              "align": "end"
            },
            {
              "key": "status",
              "label": "الحالة",
              "align": "center"
            }
          ],
          "rows": [
            {
              "id": "1",
              "code": "C-1001",
              "name": "شركة النور",
              "city": "القاهرة",
              "balance": "42,500.00",
              "status": "نشط"
            },
            {
              "id": "2",
              "code": "C-1002",
              "name": "مؤسسة الأفق",
              "city": "الإسكندرية",
              "balance": "18,750.00",
              "status": "قيد المراجعة"
            },
            {
              "id": "3",
              "code": "C-1003",
              "name": "مجموعة البيان",
              "city": "القاهرة",
              "balance": "63,100.00",
              "status": "نشط"
            },
            {
              "id": "4",
              "code": "C-1004",
              "name": "شركة المدى",
              "city": "المنصورة",
              "balance": "27,900.00",
              "status": "موقوف"
            },
            {
              "id": "5",
              "code": "C-1005",
              "name": "مكتب الرؤية",
              "city": "القاهرة",
              "balance": "11,350.00",
              "status": "نشط"
            }
          ],
          "selectable": true,
          "filterDefinitions": [
            {
              "key": "name",
              "label": "اسم العميل",
              "placeholder": "ابحث باسم العميل"
            },
            {
              "key": "city",
              "label": "المدينة",
              "placeholder": "اكتب اسم المدينة"
            },
            {
              "key": "status",
              "label": "الحالة",
              "placeholder": "نشط أو قيد المراجعة"
            }
          ],
          "pageSizeOptions": [
            3,
            5,
            10
          ],
          "page": 1,
          "pageSize": 3,
          "sort": null,
          "filters": [],
          "visibleColumns": [
            "code",
            "name",
            "city",
            "balance",
            "status"
          ],
          "selectedKeys": [
            "2"
          ]
        }
      }
    ]
  },
  {
    "id": "loading",
    "label": "loading",
    "cases": [
      {
        "id": "loading-false",
        "label": "غير مفعّل (false)",
        "inputs": {
          "caption": "دليل العملاء المحلي",
          "columns": [
            {
              "key": "code",
              "label": "الكود",
              "sortable": true,
              "required": true,
              "hideable": false
            },
            {
              "key": "name",
              "label": "العميل",
              "sortable": true,
              "required": true
            },
            {
              "key": "city",
              "label": "المدينة",
              "sortable": true
            },
            {
              "key": "balance",
              "label": "الرصيد",
              "sortable": true,
              "align": "end"
            },
            {
              "key": "status",
              "label": "الحالة",
              "align": "center"
            }
          ],
          "rows": [
            {
              "id": "1",
              "code": "C-1001",
              "name": "شركة النور",
              "city": "القاهرة",
              "balance": "42,500.00",
              "status": "نشط"
            },
            {
              "id": "2",
              "code": "C-1002",
              "name": "مؤسسة الأفق",
              "city": "الإسكندرية",
              "balance": "18,750.00",
              "status": "قيد المراجعة"
            },
            {
              "id": "3",
              "code": "C-1003",
              "name": "مجموعة البيان",
              "city": "القاهرة",
              "balance": "63,100.00",
              "status": "نشط"
            },
            {
              "id": "4",
              "code": "C-1004",
              "name": "شركة المدى",
              "city": "المنصورة",
              "balance": "27,900.00",
              "status": "موقوف"
            },
            {
              "id": "5",
              "code": "C-1005",
              "name": "مكتب الرؤية",
              "city": "القاهرة",
              "balance": "11,350.00",
              "status": "نشط"
            }
          ],
          "selectable": true,
          "filterDefinitions": [
            {
              "key": "name",
              "label": "اسم العميل",
              "placeholder": "ابحث باسم العميل"
            },
            {
              "key": "city",
              "label": "المدينة",
              "placeholder": "اكتب اسم المدينة"
            },
            {
              "key": "status",
              "label": "الحالة",
              "placeholder": "نشط أو قيد المراجعة"
            }
          ],
          "pageSizeOptions": [
            3,
            5,
            10
          ],
          "page": 1,
          "pageSize": 3,
          "sort": null,
          "filters": [],
          "visibleColumns": [
            "code",
            "name",
            "city",
            "balance",
            "status"
          ],
          "selectedKeys": [
            "2"
          ],
          "loading": false
        }
      },
      {
        "id": "loading-true",
        "label": "مفعّل (true)",
        "inputs": {
          "caption": "دليل العملاء المحلي",
          "columns": [
            {
              "key": "code",
              "label": "الكود",
              "sortable": true,
              "required": true,
              "hideable": false
            },
            {
              "key": "name",
              "label": "العميل",
              "sortable": true,
              "required": true
            },
            {
              "key": "city",
              "label": "المدينة",
              "sortable": true
            },
            {
              "key": "balance",
              "label": "الرصيد",
              "sortable": true,
              "align": "end"
            },
            {
              "key": "status",
              "label": "الحالة",
              "align": "center"
            }
          ],
          "rows": [
            {
              "id": "1",
              "code": "C-1001",
              "name": "شركة النور",
              "city": "القاهرة",
              "balance": "42,500.00",
              "status": "نشط"
            },
            {
              "id": "2",
              "code": "C-1002",
              "name": "مؤسسة الأفق",
              "city": "الإسكندرية",
              "balance": "18,750.00",
              "status": "قيد المراجعة"
            },
            {
              "id": "3",
              "code": "C-1003",
              "name": "مجموعة البيان",
              "city": "القاهرة",
              "balance": "63,100.00",
              "status": "نشط"
            },
            {
              "id": "4",
              "code": "C-1004",
              "name": "شركة المدى",
              "city": "المنصورة",
              "balance": "27,900.00",
              "status": "موقوف"
            },
            {
              "id": "5",
              "code": "C-1005",
              "name": "مكتب الرؤية",
              "city": "القاهرة",
              "balance": "11,350.00",
              "status": "نشط"
            }
          ],
          "selectable": true,
          "filterDefinitions": [
            {
              "key": "name",
              "label": "اسم العميل",
              "placeholder": "ابحث باسم العميل"
            },
            {
              "key": "city",
              "label": "المدينة",
              "placeholder": "اكتب اسم المدينة"
            },
            {
              "key": "status",
              "label": "الحالة",
              "placeholder": "نشط أو قيد المراجعة"
            }
          ],
          "pageSizeOptions": [
            3,
            5,
            10
          ],
          "page": 1,
          "pageSize": 3,
          "sort": null,
          "filters": [],
          "visibleColumns": [
            "code",
            "name",
            "city",
            "balance",
            "status"
          ],
          "selectedKeys": [
            "2"
          ],
          "loading": true
        }
      }
    ]
  },
  {
    "id": "mode",
    "label": "الأوضاع",
    "cases": [
      {
        "id": "mode-local",
        "label": "mode: local",
        "inputs": {
          "caption": "دليل العملاء المحلي",
          "columns": [
            {
              "key": "code",
              "label": "الكود",
              "sortable": true,
              "required": true,
              "hideable": false
            },
            {
              "key": "name",
              "label": "العميل",
              "sortable": true,
              "required": true
            },
            {
              "key": "city",
              "label": "المدينة",
              "sortable": true
            },
            {
              "key": "balance",
              "label": "الرصيد",
              "sortable": true,
              "align": "end"
            },
            {
              "key": "status",
              "label": "الحالة",
              "align": "center"
            }
          ],
          "rows": [
            {
              "id": "1",
              "code": "C-1001",
              "name": "شركة النور",
              "city": "القاهرة",
              "balance": "42,500.00",
              "status": "نشط"
            },
            {
              "id": "2",
              "code": "C-1002",
              "name": "مؤسسة الأفق",
              "city": "الإسكندرية",
              "balance": "18,750.00",
              "status": "قيد المراجعة"
            },
            {
              "id": "3",
              "code": "C-1003",
              "name": "مجموعة البيان",
              "city": "القاهرة",
              "balance": "63,100.00",
              "status": "نشط"
            },
            {
              "id": "4",
              "code": "C-1004",
              "name": "شركة المدى",
              "city": "المنصورة",
              "balance": "27,900.00",
              "status": "موقوف"
            },
            {
              "id": "5",
              "code": "C-1005",
              "name": "مكتب الرؤية",
              "city": "القاهرة",
              "balance": "11,350.00",
              "status": "نشط"
            }
          ],
          "selectable": true,
          "filterDefinitions": [
            {
              "key": "name",
              "label": "اسم العميل",
              "placeholder": "ابحث باسم العميل"
            },
            {
              "key": "city",
              "label": "المدينة",
              "placeholder": "اكتب اسم المدينة"
            },
            {
              "key": "status",
              "label": "الحالة",
              "placeholder": "نشط أو قيد المراجعة"
            }
          ],
          "pageSizeOptions": [
            3,
            5,
            10
          ],
          "page": 1,
          "pageSize": 3,
          "sort": null,
          "filters": [],
          "visibleColumns": [
            "code",
            "name",
            "city",
            "balance",
            "status"
          ],
          "selectedKeys": [
            "2"
          ],
          "mode": "local"
        }
      },
      {
        "id": "mode-remote",
        "label": "mode: remote",
        "inputs": {
          "caption": "دليل العملاء المحلي",
          "columns": [
            {
              "key": "code",
              "label": "الكود",
              "sortable": true,
              "required": true,
              "hideable": false
            },
            {
              "key": "name",
              "label": "العميل",
              "sortable": true,
              "required": true
            },
            {
              "key": "city",
              "label": "المدينة",
              "sortable": true
            },
            {
              "key": "balance",
              "label": "الرصيد",
              "sortable": true,
              "align": "end"
            },
            {
              "key": "status",
              "label": "الحالة",
              "align": "center"
            }
          ],
          "rows": [
            {
              "id": "1",
              "code": "C-1001",
              "name": "شركة النور",
              "city": "القاهرة",
              "balance": "42,500.00",
              "status": "نشط"
            },
            {
              "id": "2",
              "code": "C-1002",
              "name": "مؤسسة الأفق",
              "city": "الإسكندرية",
              "balance": "18,750.00",
              "status": "قيد المراجعة"
            },
            {
              "id": "3",
              "code": "C-1003",
              "name": "مجموعة البيان",
              "city": "القاهرة",
              "balance": "63,100.00",
              "status": "نشط"
            },
            {
              "id": "4",
              "code": "C-1004",
              "name": "شركة المدى",
              "city": "المنصورة",
              "balance": "27,900.00",
              "status": "موقوف"
            },
            {
              "id": "5",
              "code": "C-1005",
              "name": "مكتب الرؤية",
              "city": "القاهرة",
              "balance": "11,350.00",
              "status": "نشط"
            }
          ],
          "selectable": true,
          "filterDefinitions": [
            {
              "key": "name",
              "label": "اسم العميل",
              "placeholder": "ابحث باسم العميل"
            },
            {
              "key": "city",
              "label": "المدينة",
              "placeholder": "اكتب اسم المدينة"
            },
            {
              "key": "status",
              "label": "الحالة",
              "placeholder": "نشط أو قيد المراجعة"
            }
          ],
          "pageSizeOptions": [
            3,
            5,
            10
          ],
          "page": 1,
          "pageSize": 3,
          "sort": null,
          "filters": [],
          "visibleColumns": [
            "code",
            "name",
            "city",
            "balance",
            "status"
          ],
          "selectedKeys": [
            "2"
          ],
          "mode": "remote"
        }
      }
    ]
  },
  {
    "id": "states",
    "label": "الحالات",
    "cases": [
      {
        "id": "loading",
        "label": "حالة تحميل",
        "inputs": {
          "caption": "دليل العملاء المحلي",
          "columns": [
            {
              "key": "code",
              "label": "الكود",
              "sortable": true,
              "required": true,
              "hideable": false
            },
            {
              "key": "name",
              "label": "العميل",
              "sortable": true,
              "required": true
            },
            {
              "key": "city",
              "label": "المدينة",
              "sortable": true
            },
            {
              "key": "balance",
              "label": "الرصيد",
              "sortable": true,
              "align": "end"
            },
            {
              "key": "status",
              "label": "الحالة",
              "align": "center"
            }
          ],
          "rows": [
            {
              "id": "1",
              "code": "C-1001",
              "name": "شركة النور",
              "city": "القاهرة",
              "balance": "42,500.00",
              "status": "نشط"
            },
            {
              "id": "2",
              "code": "C-1002",
              "name": "مؤسسة الأفق",
              "city": "الإسكندرية",
              "balance": "18,750.00",
              "status": "قيد المراجعة"
            },
            {
              "id": "3",
              "code": "C-1003",
              "name": "مجموعة البيان",
              "city": "القاهرة",
              "balance": "63,100.00",
              "status": "نشط"
            },
            {
              "id": "4",
              "code": "C-1004",
              "name": "شركة المدى",
              "city": "المنصورة",
              "balance": "27,900.00",
              "status": "موقوف"
            },
            {
              "id": "5",
              "code": "C-1005",
              "name": "مكتب الرؤية",
              "city": "القاهرة",
              "balance": "11,350.00",
              "status": "نشط"
            }
          ],
          "selectable": true,
          "filterDefinitions": [
            {
              "key": "name",
              "label": "اسم العميل",
              "placeholder": "ابحث باسم العميل"
            },
            {
              "key": "city",
              "label": "المدينة",
              "placeholder": "اكتب اسم المدينة"
            },
            {
              "key": "status",
              "label": "الحالة",
              "placeholder": "نشط أو قيد المراجعة"
            }
          ],
          "pageSizeOptions": [
            3,
            5,
            10
          ],
          "page": 1,
          "pageSize": 3,
          "sort": null,
          "filters": [],
          "visibleColumns": [
            "code",
            "name",
            "city",
            "balance",
            "status"
          ],
          "selectedKeys": [
            "2"
          ],
          "loading": true
        }
      }
    ]
  }
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-smart-table-showcase',
  imports: [ErpSmartTable, ErpReviewShowcaseControlPanel, ErpReviewShowcaseReferenceComparison, ErpStack, ErpSurface, ErpText, ErpButton, ErpStatusBadge, ErpTableCell],
  templateUrl: './smart-table-showcase.html',
  styleUrl: './smart-table-showcase.scss',
})
export class ErpSmartTableShowcase {
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
