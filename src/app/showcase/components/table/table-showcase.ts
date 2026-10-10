import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpTable} from '../../../controls/table/table';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpReviewShowcaseReferenceComparison} from '../../../review-internals/showcase-reference-comparison/showcase-reference-comparison';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';
import {ErpReviewShowcaseExactReference} from '../../../review-internals/showcase-exact-reference/showcase-exact-reference';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'table')!;
const REVIEW_GALLERY_GROUPS = [
  {
    "id": "default",
    "label": "الحالة الافتراضية",
    "cases": [
      {
        "id": "default",
        "label": "الحالة الافتراضية",
        "inputs": {
          "caption": "سجل الحسابات",
          "columns": [
            {
              "key": "code",
              "header": "رقم الحساب",
              "sortable": true,
              "resizable": true,
              "initialWidth": 132,
              "digitSet": "latin"
            },
            {
              "key": "name",
              "header": "اسم الحساب",
              "descriptionKey": "description",
              "sortable": true,
              "resizable": true,
              "initialWidth": 224
            },
            {
              "key": "type",
              "header": "النوع",
              "sortable": true,
              "initialWidth": 116
            },
            {
              "key": "balance",
              "header": "الرصيد",
              "sortable": true,
              "resizable": true,
              "initialWidth": 144,
              "cellAlign": "end",
              "headerAlign": "end",
              "digitSet": "latin"
            },
            {
              "key": "status",
              "header": "الحالة",
              "initialWidth": 112,
              "align": "center"
            },
            {
              "key": "branch",
              "header": "الفرع",
              "sortable": true,
              "initialWidth": 132
            },
            {
              "key": "updated",
              "header": "آخر تحديث",
              "initialWidth": 132,
              "digitSet": "latin"
            }
          ],
          "rows": [
            {
              "id": "101",
              "code": "410100",
              "name": "المبيعات المحلية",
              "description": "إيرادات النشاط الرئيسي",
              "type": "إيرادات",
              "balance": "1,245,800.00",
              "status": "نشط",
              "branch": "القاهرة",
              "updated": "2026-10-10"
            },
            {
              "id": "102",
              "code": "120210",
              "name": "ذمم العملاء",
              "description": "أرصدة العملاء المدينة",
              "type": "أصول",
              "balance": "487,320.50",
              "status": "نشط",
              "branch": "الإسكندرية",
              "updated": "2026-10-09"
            },
            {
              "id": "103",
              "code": "210110",
              "name": "الموردون المحليون",
              "description": "التزامات التوريد المفتوحة",
              "type": "التزامات",
              "balance": "302,750.00",
              "status": "قيد المراجعة",
              "branch": "القاهرة",
              "updated": "2026-10-08"
            },
            {
              "id": "104",
              "code": "510300",
              "name": "تكلفة المخزون",
              "description": "تكلفة البضاعة المباعة",
              "type": "مصروفات",
              "balance": "775,940.25",
              "status": "نشط",
              "branch": "المنصورة",
              "updated": "2026-10-07"
            },
            {
              "id": "105",
              "code": "130120",
              "name": "عهد الموظفين",
              "description": "عهد تشغيلية قصيرة الأجل",
              "type": "أصول",
              "balance": "56,400.00",
              "status": "موقوف",
              "branch": "القاهرة",
              "updated": "2026-10-06"
            }
          ],
          "visibleColumnKeys": [
            "code",
            "name",
            "type",
            "balance",
            "status",
            "branch",
            "updated"
          ],
          "selectable": true,
          "showHeaderSelection": true,
          "rowActivatable": true,
          "striped": true,
          "hover": true,
          "footerValues": {
            "name": "إجمالي الأرصدة",
            "balance": "2,868,210.75"
          },
          "selectedKeys": [],
          "columnWidths": {}
        }
      }
    ]
  },
  {
    "id": "density",
    "label": "الكثافة",
    "cases": [
      {
        "id": "density-compact",
        "label": "مضغوط (compact)",
        "inputs": {
          "caption": "سجل الحسابات",
          "columns": [
            {
              "key": "code",
              "header": "رقم الحساب",
              "sortable": true,
              "resizable": true,
              "initialWidth": 132,
              "digitSet": "latin"
            },
            {
              "key": "name",
              "header": "اسم الحساب",
              "descriptionKey": "description",
              "sortable": true,
              "resizable": true,
              "initialWidth": 224
            },
            {
              "key": "type",
              "header": "النوع",
              "sortable": true,
              "initialWidth": 116
            },
            {
              "key": "balance",
              "header": "الرصيد",
              "sortable": true,
              "resizable": true,
              "initialWidth": 144,
              "cellAlign": "end",
              "headerAlign": "end",
              "digitSet": "latin"
            },
            {
              "key": "status",
              "header": "الحالة",
              "initialWidth": 112,
              "align": "center"
            },
            {
              "key": "branch",
              "header": "الفرع",
              "sortable": true,
              "initialWidth": 132
            },
            {
              "key": "updated",
              "header": "آخر تحديث",
              "initialWidth": 132,
              "digitSet": "latin"
            }
          ],
          "rows": [
            {
              "id": "101",
              "code": "410100",
              "name": "المبيعات المحلية",
              "description": "إيرادات النشاط الرئيسي",
              "type": "إيرادات",
              "balance": "1,245,800.00",
              "status": "نشط",
              "branch": "القاهرة",
              "updated": "2026-10-10"
            },
            {
              "id": "102",
              "code": "120210",
              "name": "ذمم العملاء",
              "description": "أرصدة العملاء المدينة",
              "type": "أصول",
              "balance": "487,320.50",
              "status": "نشط",
              "branch": "الإسكندرية",
              "updated": "2026-10-09"
            },
            {
              "id": "103",
              "code": "210110",
              "name": "الموردون المحليون",
              "description": "التزامات التوريد المفتوحة",
              "type": "التزامات",
              "balance": "302,750.00",
              "status": "قيد المراجعة",
              "branch": "القاهرة",
              "updated": "2026-10-08"
            },
            {
              "id": "104",
              "code": "510300",
              "name": "تكلفة المخزون",
              "description": "تكلفة البضاعة المباعة",
              "type": "مصروفات",
              "balance": "775,940.25",
              "status": "نشط",
              "branch": "المنصورة",
              "updated": "2026-10-07"
            },
            {
              "id": "105",
              "code": "130120",
              "name": "عهد الموظفين",
              "description": "عهد تشغيلية قصيرة الأجل",
              "type": "أصول",
              "balance": "56,400.00",
              "status": "موقوف",
              "branch": "القاهرة",
              "updated": "2026-10-06"
            }
          ],
          "visibleColumnKeys": [
            "code",
            "name",
            "type",
            "balance",
            "status",
            "branch",
            "updated"
          ],
          "selectable": true,
          "showHeaderSelection": true,
          "rowActivatable": true,
          "striped": true,
          "hover": true,
          "footerValues": {
            "name": "إجمالي الأرصدة",
            "balance": "2,868,210.75"
          },
          "selectedKeys": [],
          "columnWidths": {},
          "density": "compact"
        }
      },
      {
        "id": "density-normal",
        "label": "density: normal",
        "inputs": {
          "caption": "سجل الحسابات",
          "columns": [
            {
              "key": "code",
              "header": "رقم الحساب",
              "sortable": true,
              "resizable": true,
              "initialWidth": 132,
              "digitSet": "latin"
            },
            {
              "key": "name",
              "header": "اسم الحساب",
              "descriptionKey": "description",
              "sortable": true,
              "resizable": true,
              "initialWidth": 224
            },
            {
              "key": "type",
              "header": "النوع",
              "sortable": true,
              "initialWidth": 116
            },
            {
              "key": "balance",
              "header": "الرصيد",
              "sortable": true,
              "resizable": true,
              "initialWidth": 144,
              "cellAlign": "end",
              "headerAlign": "end",
              "digitSet": "latin"
            },
            {
              "key": "status",
              "header": "الحالة",
              "initialWidth": 112,
              "align": "center"
            },
            {
              "key": "branch",
              "header": "الفرع",
              "sortable": true,
              "initialWidth": 132
            },
            {
              "key": "updated",
              "header": "آخر تحديث",
              "initialWidth": 132,
              "digitSet": "latin"
            }
          ],
          "rows": [
            {
              "id": "101",
              "code": "410100",
              "name": "المبيعات المحلية",
              "description": "إيرادات النشاط الرئيسي",
              "type": "إيرادات",
              "balance": "1,245,800.00",
              "status": "نشط",
              "branch": "القاهرة",
              "updated": "2026-10-10"
            },
            {
              "id": "102",
              "code": "120210",
              "name": "ذمم العملاء",
              "description": "أرصدة العملاء المدينة",
              "type": "أصول",
              "balance": "487,320.50",
              "status": "نشط",
              "branch": "الإسكندرية",
              "updated": "2026-10-09"
            },
            {
              "id": "103",
              "code": "210110",
              "name": "الموردون المحليون",
              "description": "التزامات التوريد المفتوحة",
              "type": "التزامات",
              "balance": "302,750.00",
              "status": "قيد المراجعة",
              "branch": "القاهرة",
              "updated": "2026-10-08"
            },
            {
              "id": "104",
              "code": "510300",
              "name": "تكلفة المخزون",
              "description": "تكلفة البضاعة المباعة",
              "type": "مصروفات",
              "balance": "775,940.25",
              "status": "نشط",
              "branch": "المنصورة",
              "updated": "2026-10-07"
            },
            {
              "id": "105",
              "code": "130120",
              "name": "عهد الموظفين",
              "description": "عهد تشغيلية قصيرة الأجل",
              "type": "أصول",
              "balance": "56,400.00",
              "status": "موقوف",
              "branch": "القاهرة",
              "updated": "2026-10-06"
            }
          ],
          "visibleColumnKeys": [
            "code",
            "name",
            "type",
            "balance",
            "status",
            "branch",
            "updated"
          ],
          "selectable": true,
          "showHeaderSelection": true,
          "rowActivatable": true,
          "striped": true,
          "hover": true,
          "footerValues": {
            "name": "إجمالي الأرصدة",
            "balance": "2,868,210.75"
          },
          "selectedKeys": [],
          "columnWidths": {},
          "density": "normal"
        }
      },
      {
        "id": "density-comfortable",
        "label": "مريح (comfortable)",
        "inputs": {
          "caption": "سجل الحسابات",
          "columns": [
            {
              "key": "code",
              "header": "رقم الحساب",
              "sortable": true,
              "resizable": true,
              "initialWidth": 132,
              "digitSet": "latin"
            },
            {
              "key": "name",
              "header": "اسم الحساب",
              "descriptionKey": "description",
              "sortable": true,
              "resizable": true,
              "initialWidth": 224
            },
            {
              "key": "type",
              "header": "النوع",
              "sortable": true,
              "initialWidth": 116
            },
            {
              "key": "balance",
              "header": "الرصيد",
              "sortable": true,
              "resizable": true,
              "initialWidth": 144,
              "cellAlign": "end",
              "headerAlign": "end",
              "digitSet": "latin"
            },
            {
              "key": "status",
              "header": "الحالة",
              "initialWidth": 112,
              "align": "center"
            },
            {
              "key": "branch",
              "header": "الفرع",
              "sortable": true,
              "initialWidth": 132
            },
            {
              "key": "updated",
              "header": "آخر تحديث",
              "initialWidth": 132,
              "digitSet": "latin"
            }
          ],
          "rows": [
            {
              "id": "101",
              "code": "410100",
              "name": "المبيعات المحلية",
              "description": "إيرادات النشاط الرئيسي",
              "type": "إيرادات",
              "balance": "1,245,800.00",
              "status": "نشط",
              "branch": "القاهرة",
              "updated": "2026-10-10"
            },
            {
              "id": "102",
              "code": "120210",
              "name": "ذمم العملاء",
              "description": "أرصدة العملاء المدينة",
              "type": "أصول",
              "balance": "487,320.50",
              "status": "نشط",
              "branch": "الإسكندرية",
              "updated": "2026-10-09"
            },
            {
              "id": "103",
              "code": "210110",
              "name": "الموردون المحليون",
              "description": "التزامات التوريد المفتوحة",
              "type": "التزامات",
              "balance": "302,750.00",
              "status": "قيد المراجعة",
              "branch": "القاهرة",
              "updated": "2026-10-08"
            },
            {
              "id": "104",
              "code": "510300",
              "name": "تكلفة المخزون",
              "description": "تكلفة البضاعة المباعة",
              "type": "مصروفات",
              "balance": "775,940.25",
              "status": "نشط",
              "branch": "المنصورة",
              "updated": "2026-10-07"
            },
            {
              "id": "105",
              "code": "130120",
              "name": "عهد الموظفين",
              "description": "عهد تشغيلية قصيرة الأجل",
              "type": "أصول",
              "balance": "56,400.00",
              "status": "موقوف",
              "branch": "القاهرة",
              "updated": "2026-10-06"
            }
          ],
          "visibleColumnKeys": [
            "code",
            "name",
            "type",
            "balance",
            "status",
            "branch",
            "updated"
          ],
          "selectable": true,
          "showHeaderSelection": true,
          "rowActivatable": true,
          "striped": true,
          "hover": true,
          "footerValues": {
            "name": "إجمالي الأرصدة",
            "balance": "2,868,210.75"
          },
          "selectedKeys": [],
          "columnWidths": {},
          "density": "comfortable"
        }
      }
    ]
  },
  {
    "id": "hoverMotion",
    "label": "حركة المرور",
    "cases": [
      {
        "id": "hoverMotion-false",
        "label": "غير مفعّل (false)",
        "inputs": {
          "caption": "سجل الحسابات",
          "columns": [
            {
              "key": "code",
              "header": "رقم الحساب",
              "sortable": true,
              "resizable": true,
              "initialWidth": 132,
              "digitSet": "latin"
            },
            {
              "key": "name",
              "header": "اسم الحساب",
              "descriptionKey": "description",
              "sortable": true,
              "resizable": true,
              "initialWidth": 224
            },
            {
              "key": "type",
              "header": "النوع",
              "sortable": true,
              "initialWidth": 116
            },
            {
              "key": "balance",
              "header": "الرصيد",
              "sortable": true,
              "resizable": true,
              "initialWidth": 144,
              "cellAlign": "end",
              "headerAlign": "end",
              "digitSet": "latin"
            },
            {
              "key": "status",
              "header": "الحالة",
              "initialWidth": 112,
              "align": "center"
            },
            {
              "key": "branch",
              "header": "الفرع",
              "sortable": true,
              "initialWidth": 132
            },
            {
              "key": "updated",
              "header": "آخر تحديث",
              "initialWidth": 132,
              "digitSet": "latin"
            }
          ],
          "rows": [
            {
              "id": "101",
              "code": "410100",
              "name": "المبيعات المحلية",
              "description": "إيرادات النشاط الرئيسي",
              "type": "إيرادات",
              "balance": "1,245,800.00",
              "status": "نشط",
              "branch": "القاهرة",
              "updated": "2026-10-10"
            },
            {
              "id": "102",
              "code": "120210",
              "name": "ذمم العملاء",
              "description": "أرصدة العملاء المدينة",
              "type": "أصول",
              "balance": "487,320.50",
              "status": "نشط",
              "branch": "الإسكندرية",
              "updated": "2026-10-09"
            },
            {
              "id": "103",
              "code": "210110",
              "name": "الموردون المحليون",
              "description": "التزامات التوريد المفتوحة",
              "type": "التزامات",
              "balance": "302,750.00",
              "status": "قيد المراجعة",
              "branch": "القاهرة",
              "updated": "2026-10-08"
            },
            {
              "id": "104",
              "code": "510300",
              "name": "تكلفة المخزون",
              "description": "تكلفة البضاعة المباعة",
              "type": "مصروفات",
              "balance": "775,940.25",
              "status": "نشط",
              "branch": "المنصورة",
              "updated": "2026-10-07"
            },
            {
              "id": "105",
              "code": "130120",
              "name": "عهد الموظفين",
              "description": "عهد تشغيلية قصيرة الأجل",
              "type": "أصول",
              "balance": "56,400.00",
              "status": "موقوف",
              "branch": "القاهرة",
              "updated": "2026-10-06"
            }
          ],
          "visibleColumnKeys": [
            "code",
            "name",
            "type",
            "balance",
            "status",
            "branch",
            "updated"
          ],
          "selectable": true,
          "showHeaderSelection": true,
          "rowActivatable": true,
          "striped": true,
          "hover": true,
          "footerValues": {
            "name": "إجمالي الأرصدة",
            "balance": "2,868,210.75"
          },
          "selectedKeys": [],
          "columnWidths": {},
          "hoverMotion": false
        }
      },
      {
        "id": "hoverMotion-true",
        "label": "مفعّل (true)",
        "inputs": {
          "caption": "سجل الحسابات",
          "columns": [
            {
              "key": "code",
              "header": "رقم الحساب",
              "sortable": true,
              "resizable": true,
              "initialWidth": 132,
              "digitSet": "latin"
            },
            {
              "key": "name",
              "header": "اسم الحساب",
              "descriptionKey": "description",
              "sortable": true,
              "resizable": true,
              "initialWidth": 224
            },
            {
              "key": "type",
              "header": "النوع",
              "sortable": true,
              "initialWidth": 116
            },
            {
              "key": "balance",
              "header": "الرصيد",
              "sortable": true,
              "resizable": true,
              "initialWidth": 144,
              "cellAlign": "end",
              "headerAlign": "end",
              "digitSet": "latin"
            },
            {
              "key": "status",
              "header": "الحالة",
              "initialWidth": 112,
              "align": "center"
            },
            {
              "key": "branch",
              "header": "الفرع",
              "sortable": true,
              "initialWidth": 132
            },
            {
              "key": "updated",
              "header": "آخر تحديث",
              "initialWidth": 132,
              "digitSet": "latin"
            }
          ],
          "rows": [
            {
              "id": "101",
              "code": "410100",
              "name": "المبيعات المحلية",
              "description": "إيرادات النشاط الرئيسي",
              "type": "إيرادات",
              "balance": "1,245,800.00",
              "status": "نشط",
              "branch": "القاهرة",
              "updated": "2026-10-10"
            },
            {
              "id": "102",
              "code": "120210",
              "name": "ذمم العملاء",
              "description": "أرصدة العملاء المدينة",
              "type": "أصول",
              "balance": "487,320.50",
              "status": "نشط",
              "branch": "الإسكندرية",
              "updated": "2026-10-09"
            },
            {
              "id": "103",
              "code": "210110",
              "name": "الموردون المحليون",
              "description": "التزامات التوريد المفتوحة",
              "type": "التزامات",
              "balance": "302,750.00",
              "status": "قيد المراجعة",
              "branch": "القاهرة",
              "updated": "2026-10-08"
            },
            {
              "id": "104",
              "code": "510300",
              "name": "تكلفة المخزون",
              "description": "تكلفة البضاعة المباعة",
              "type": "مصروفات",
              "balance": "775,940.25",
              "status": "نشط",
              "branch": "المنصورة",
              "updated": "2026-10-07"
            },
            {
              "id": "105",
              "code": "130120",
              "name": "عهد الموظفين",
              "description": "عهد تشغيلية قصيرة الأجل",
              "type": "أصول",
              "balance": "56,400.00",
              "status": "موقوف",
              "branch": "القاهرة",
              "updated": "2026-10-06"
            }
          ],
          "visibleColumnKeys": [
            "code",
            "name",
            "type",
            "balance",
            "status",
            "branch",
            "updated"
          ],
          "selectable": true,
          "showHeaderSelection": true,
          "rowActivatable": true,
          "striped": true,
          "hover": true,
          "footerValues": {
            "name": "إجمالي الأرصدة",
            "balance": "2,868,210.75"
          },
          "selectedKeys": [],
          "columnWidths": {},
          "hoverMotion": true
        }
      }
    ]
  }
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-table-showcase',
  imports: [ErpTable, ErpReviewShowcaseControlPanel, ErpReviewShowcaseReferenceComparison, ErpStack, ErpSurface, ErpText, ErpReviewShowcaseExactReference],
  templateUrl: './table-showcase.html',
  styleUrl: './table-showcase.scss',
})
export class ErpTableShowcase {
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
