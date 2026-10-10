import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpDataPage} from '../../../controls/data-page/data-page';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpReviewShowcaseReferenceComparison} from '../../../review-internals/showcase-reference-comparison/showcase-reference-comparison';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'data-page')!;
const REVIEW_GALLERY_GROUPS = [
  {
    "id": "default",
    "label": "الحالة الافتراضية",
    "cases": [
      {
        "id": "default",
        "label": "الحالة الافتراضية",
        "inputs": {
          "title": "دليل العملاء",
          "subtitle": "عرض واستعلام ببيانات يملكها المستهلك",
          "caption": "حسابات العملاء",
          "columns": [
            {
              "key": "name",
              "label": "العميل",
              "sortable": true,
              "required": true,
              "initialWidth": 220,
              "overflow": "ellipsis"
            },
            {
              "key": "city",
              "label": "المدينة",
              "hideable": true,
              "initialWidth": 130,
              "overflow": "ellipsis"
            },
            {
              "key": "status",
              "label": "الحالة",
              "hideable": true,
              "initialWidth": 140,
              "overflow": "ellipsis"
            }
          ],
          "rows": [
            {
              "id": "customer-1",
              "name": "شركة النيل للتوريدات",
              "city": "القاهرة",
              "status": "نشط"
            },
            {
              "id": "customer-2",
              "name": "مؤسسة الصفا التجارية",
              "city": "الإسكندرية",
              "status": "قيد المراجعة"
            },
            {
              "id": "customer-3",
              "name": "مجموعة المستقبل",
              "city": "المنصورة",
              "status": "نشط"
            }
          ],
          "filterDefinitions": [
            {
              "key": "name",
              "label": "العميل",
              "placeholder": "ابحث باسم العميل"
            },
            {
              "key": "city",
              "label": "المدينة",
              "placeholder": "ابحث بالمدينة"
            }
          ],
          "selectable": true,
          "pageSize": 10,
          "page": 1,
          "sort": null,
          "filters": [],
          "visibleColumns": [],
          "selectedKeys": []
        }
      }
    ]
  },
  {
    "id": "widthMode",
    "label": "العرض",
    "cases": [
      {
        "id": "widthMode-boxed",
        "label": "widthMode: boxed",
        "inputs": {
          "title": "دليل العملاء",
          "subtitle": "عرض واستعلام ببيانات يملكها المستهلك",
          "caption": "حسابات العملاء",
          "columns": [
            {
              "key": "name",
              "label": "العميل",
              "sortable": true,
              "required": true,
              "initialWidth": 220,
              "overflow": "ellipsis"
            },
            {
              "key": "city",
              "label": "المدينة",
              "hideable": true,
              "initialWidth": 130,
              "overflow": "ellipsis"
            },
            {
              "key": "status",
              "label": "الحالة",
              "hideable": true,
              "initialWidth": 140,
              "overflow": "ellipsis"
            }
          ],
          "rows": [
            {
              "id": "customer-1",
              "name": "شركة النيل للتوريدات",
              "city": "القاهرة",
              "status": "نشط"
            },
            {
              "id": "customer-2",
              "name": "مؤسسة الصفا التجارية",
              "city": "الإسكندرية",
              "status": "قيد المراجعة"
            },
            {
              "id": "customer-3",
              "name": "مجموعة المستقبل",
              "city": "المنصورة",
              "status": "نشط"
            }
          ],
          "filterDefinitions": [
            {
              "key": "name",
              "label": "العميل",
              "placeholder": "ابحث باسم العميل"
            },
            {
              "key": "city",
              "label": "المدينة",
              "placeholder": "ابحث بالمدينة"
            }
          ],
          "selectable": true,
          "pageSize": 10,
          "page": 1,
          "sort": null,
          "filters": [],
          "visibleColumns": [],
          "selectedKeys": [],
          "widthMode": "boxed"
        }
      },
      {
        "id": "widthMode-fluid",
        "label": "widthMode: fluid",
        "inputs": {
          "title": "دليل العملاء",
          "subtitle": "عرض واستعلام ببيانات يملكها المستهلك",
          "caption": "حسابات العملاء",
          "columns": [
            {
              "key": "name",
              "label": "العميل",
              "sortable": true,
              "required": true,
              "initialWidth": 220,
              "overflow": "ellipsis"
            },
            {
              "key": "city",
              "label": "المدينة",
              "hideable": true,
              "initialWidth": 130,
              "overflow": "ellipsis"
            },
            {
              "key": "status",
              "label": "الحالة",
              "hideable": true,
              "initialWidth": 140,
              "overflow": "ellipsis"
            }
          ],
          "rows": [
            {
              "id": "customer-1",
              "name": "شركة النيل للتوريدات",
              "city": "القاهرة",
              "status": "نشط"
            },
            {
              "id": "customer-2",
              "name": "مؤسسة الصفا التجارية",
              "city": "الإسكندرية",
              "status": "قيد المراجعة"
            },
            {
              "id": "customer-3",
              "name": "مجموعة المستقبل",
              "city": "المنصورة",
              "status": "نشط"
            }
          ],
          "filterDefinitions": [
            {
              "key": "name",
              "label": "العميل",
              "placeholder": "ابحث باسم العميل"
            },
            {
              "key": "city",
              "label": "المدينة",
              "placeholder": "ابحث بالمدينة"
            }
          ],
          "selectable": true,
          "pageSize": 10,
          "page": 1,
          "sort": null,
          "filters": [],
          "visibleColumns": [],
          "selectedKeys": [],
          "widthMode": "fluid"
        }
      },
      {
        "id": "widthMode-full",
        "label": "كامل (full)",
        "inputs": {
          "title": "دليل العملاء",
          "subtitle": "عرض واستعلام ببيانات يملكها المستهلك",
          "caption": "حسابات العملاء",
          "columns": [
            {
              "key": "name",
              "label": "العميل",
              "sortable": true,
              "required": true,
              "initialWidth": 220,
              "overflow": "ellipsis"
            },
            {
              "key": "city",
              "label": "المدينة",
              "hideable": true,
              "initialWidth": 130,
              "overflow": "ellipsis"
            },
            {
              "key": "status",
              "label": "الحالة",
              "hideable": true,
              "initialWidth": 140,
              "overflow": "ellipsis"
            }
          ],
          "rows": [
            {
              "id": "customer-1",
              "name": "شركة النيل للتوريدات",
              "city": "القاهرة",
              "status": "نشط"
            },
            {
              "id": "customer-2",
              "name": "مؤسسة الصفا التجارية",
              "city": "الإسكندرية",
              "status": "قيد المراجعة"
            },
            {
              "id": "customer-3",
              "name": "مجموعة المستقبل",
              "city": "المنصورة",
              "status": "نشط"
            }
          ],
          "filterDefinitions": [
            {
              "key": "name",
              "label": "العميل",
              "placeholder": "ابحث باسم العميل"
            },
            {
              "key": "city",
              "label": "المدينة",
              "placeholder": "ابحث بالمدينة"
            }
          ],
          "selectable": true,
          "pageSize": 10,
          "page": 1,
          "sort": null,
          "filters": [],
          "visibleColumns": [],
          "selectedKeys": [],
          "widthMode": "full"
        }
      }
    ]
  },
  {
    "id": "scrollMode",
    "label": "التمرير",
    "cases": [
      {
        "id": "scrollMode-document",
        "label": "scrollMode: document",
        "inputs": {
          "title": "دليل العملاء",
          "subtitle": "عرض واستعلام ببيانات يملكها المستهلك",
          "caption": "حسابات العملاء",
          "columns": [
            {
              "key": "name",
              "label": "العميل",
              "sortable": true,
              "required": true,
              "initialWidth": 220,
              "overflow": "ellipsis"
            },
            {
              "key": "city",
              "label": "المدينة",
              "hideable": true,
              "initialWidth": 130,
              "overflow": "ellipsis"
            },
            {
              "key": "status",
              "label": "الحالة",
              "hideable": true,
              "initialWidth": 140,
              "overflow": "ellipsis"
            }
          ],
          "rows": [
            {
              "id": "customer-1",
              "name": "شركة النيل للتوريدات",
              "city": "القاهرة",
              "status": "نشط"
            },
            {
              "id": "customer-2",
              "name": "مؤسسة الصفا التجارية",
              "city": "الإسكندرية",
              "status": "قيد المراجعة"
            },
            {
              "id": "customer-3",
              "name": "مجموعة المستقبل",
              "city": "المنصورة",
              "status": "نشط"
            }
          ],
          "filterDefinitions": [
            {
              "key": "name",
              "label": "العميل",
              "placeholder": "ابحث باسم العميل"
            },
            {
              "key": "city",
              "label": "المدينة",
              "placeholder": "ابحث بالمدينة"
            }
          ],
          "selectable": true,
          "pageSize": 10,
          "page": 1,
          "sort": null,
          "filters": [],
          "visibleColumns": [],
          "selectedKeys": [],
          "scrollMode": "document"
        }
      },
      {
        "id": "scrollMode-page",
        "label": "scrollMode: page",
        "inputs": {
          "title": "دليل العملاء",
          "subtitle": "عرض واستعلام ببيانات يملكها المستهلك",
          "caption": "حسابات العملاء",
          "columns": [
            {
              "key": "name",
              "label": "العميل",
              "sortable": true,
              "required": true,
              "initialWidth": 220,
              "overflow": "ellipsis"
            },
            {
              "key": "city",
              "label": "المدينة",
              "hideable": true,
              "initialWidth": 130,
              "overflow": "ellipsis"
            },
            {
              "key": "status",
              "label": "الحالة",
              "hideable": true,
              "initialWidth": 140,
              "overflow": "ellipsis"
            }
          ],
          "rows": [
            {
              "id": "customer-1",
              "name": "شركة النيل للتوريدات",
              "city": "القاهرة",
              "status": "نشط"
            },
            {
              "id": "customer-2",
              "name": "مؤسسة الصفا التجارية",
              "city": "الإسكندرية",
              "status": "قيد المراجعة"
            },
            {
              "id": "customer-3",
              "name": "مجموعة المستقبل",
              "city": "المنصورة",
              "status": "نشط"
            }
          ],
          "filterDefinitions": [
            {
              "key": "name",
              "label": "العميل",
              "placeholder": "ابحث باسم العميل"
            },
            {
              "key": "city",
              "label": "المدينة",
              "placeholder": "ابحث بالمدينة"
            }
          ],
          "selectable": true,
          "pageSize": 10,
          "page": 1,
          "sort": null,
          "filters": [],
          "visibleColumns": [],
          "selectedKeys": [],
          "scrollMode": "page"
        }
      },
      {
        "id": "scrollMode-free",
        "label": "scrollMode: free",
        "inputs": {
          "title": "دليل العملاء",
          "subtitle": "عرض واستعلام ببيانات يملكها المستهلك",
          "caption": "حسابات العملاء",
          "columns": [
            {
              "key": "name",
              "label": "العميل",
              "sortable": true,
              "required": true,
              "initialWidth": 220,
              "overflow": "ellipsis"
            },
            {
              "key": "city",
              "label": "المدينة",
              "hideable": true,
              "initialWidth": 130,
              "overflow": "ellipsis"
            },
            {
              "key": "status",
              "label": "الحالة",
              "hideable": true,
              "initialWidth": 140,
              "overflow": "ellipsis"
            }
          ],
          "rows": [
            {
              "id": "customer-1",
              "name": "شركة النيل للتوريدات",
              "city": "القاهرة",
              "status": "نشط"
            },
            {
              "id": "customer-2",
              "name": "مؤسسة الصفا التجارية",
              "city": "الإسكندرية",
              "status": "قيد المراجعة"
            },
            {
              "id": "customer-3",
              "name": "مجموعة المستقبل",
              "city": "المنصورة",
              "status": "نشط"
            }
          ],
          "filterDefinitions": [
            {
              "key": "name",
              "label": "العميل",
              "placeholder": "ابحث باسم العميل"
            },
            {
              "key": "city",
              "label": "المدينة",
              "placeholder": "ابحث بالمدينة"
            }
          ],
          "selectable": true,
          "pageSize": 10,
          "page": 1,
          "sort": null,
          "filters": [],
          "visibleColumns": [],
          "selectedKeys": [],
          "scrollMode": "free"
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
          "title": "دليل العملاء",
          "subtitle": "عرض واستعلام ببيانات يملكها المستهلك",
          "caption": "حسابات العملاء",
          "columns": [
            {
              "key": "name",
              "label": "العميل",
              "sortable": true,
              "required": true,
              "initialWidth": 220,
              "overflow": "ellipsis"
            },
            {
              "key": "city",
              "label": "المدينة",
              "hideable": true,
              "initialWidth": 130,
              "overflow": "ellipsis"
            },
            {
              "key": "status",
              "label": "الحالة",
              "hideable": true,
              "initialWidth": 140,
              "overflow": "ellipsis"
            }
          ],
          "rows": [
            {
              "id": "customer-1",
              "name": "شركة النيل للتوريدات",
              "city": "القاهرة",
              "status": "نشط"
            },
            {
              "id": "customer-2",
              "name": "مؤسسة الصفا التجارية",
              "city": "الإسكندرية",
              "status": "قيد المراجعة"
            },
            {
              "id": "customer-3",
              "name": "مجموعة المستقبل",
              "city": "المنصورة",
              "status": "نشط"
            }
          ],
          "filterDefinitions": [
            {
              "key": "name",
              "label": "العميل",
              "placeholder": "ابحث باسم العميل"
            },
            {
              "key": "city",
              "label": "المدينة",
              "placeholder": "ابحث بالمدينة"
            }
          ],
          "selectable": true,
          "pageSize": 10,
          "page": 1,
          "sort": null,
          "filters": [],
          "visibleColumns": [],
          "selectedKeys": [],
          "loading": false
        }
      },
      {
        "id": "loading-true",
        "label": "مفعّل (true)",
        "inputs": {
          "title": "دليل العملاء",
          "subtitle": "عرض واستعلام ببيانات يملكها المستهلك",
          "caption": "حسابات العملاء",
          "columns": [
            {
              "key": "name",
              "label": "العميل",
              "sortable": true,
              "required": true,
              "initialWidth": 220,
              "overflow": "ellipsis"
            },
            {
              "key": "city",
              "label": "المدينة",
              "hideable": true,
              "initialWidth": 130,
              "overflow": "ellipsis"
            },
            {
              "key": "status",
              "label": "الحالة",
              "hideable": true,
              "initialWidth": 140,
              "overflow": "ellipsis"
            }
          ],
          "rows": [
            {
              "id": "customer-1",
              "name": "شركة النيل للتوريدات",
              "city": "القاهرة",
              "status": "نشط"
            },
            {
              "id": "customer-2",
              "name": "مؤسسة الصفا التجارية",
              "city": "الإسكندرية",
              "status": "قيد المراجعة"
            },
            {
              "id": "customer-3",
              "name": "مجموعة المستقبل",
              "city": "المنصورة",
              "status": "نشط"
            }
          ],
          "filterDefinitions": [
            {
              "key": "name",
              "label": "العميل",
              "placeholder": "ابحث باسم العميل"
            },
            {
              "key": "city",
              "label": "المدينة",
              "placeholder": "ابحث بالمدينة"
            }
          ],
          "selectable": true,
          "pageSize": 10,
          "page": 1,
          "sort": null,
          "filters": [],
          "visibleColumns": [],
          "selectedKeys": [],
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
          "title": "دليل العملاء",
          "subtitle": "عرض واستعلام ببيانات يملكها المستهلك",
          "caption": "حسابات العملاء",
          "columns": [
            {
              "key": "name",
              "label": "العميل",
              "sortable": true,
              "required": true,
              "initialWidth": 220,
              "overflow": "ellipsis"
            },
            {
              "key": "city",
              "label": "المدينة",
              "hideable": true,
              "initialWidth": 130,
              "overflow": "ellipsis"
            },
            {
              "key": "status",
              "label": "الحالة",
              "hideable": true,
              "initialWidth": 140,
              "overflow": "ellipsis"
            }
          ],
          "rows": [
            {
              "id": "customer-1",
              "name": "شركة النيل للتوريدات",
              "city": "القاهرة",
              "status": "نشط"
            },
            {
              "id": "customer-2",
              "name": "مؤسسة الصفا التجارية",
              "city": "الإسكندرية",
              "status": "قيد المراجعة"
            },
            {
              "id": "customer-3",
              "name": "مجموعة المستقبل",
              "city": "المنصورة",
              "status": "نشط"
            }
          ],
          "filterDefinitions": [
            {
              "key": "name",
              "label": "العميل",
              "placeholder": "ابحث باسم العميل"
            },
            {
              "key": "city",
              "label": "المدينة",
              "placeholder": "ابحث بالمدينة"
            }
          ],
          "selectable": true,
          "pageSize": 10,
          "page": 1,
          "sort": null,
          "filters": [],
          "visibleColumns": [],
          "selectedKeys": [],
          "mode": "local"
        }
      },
      {
        "id": "mode-remote",
        "label": "mode: remote",
        "inputs": {
          "title": "دليل العملاء",
          "subtitle": "عرض واستعلام ببيانات يملكها المستهلك",
          "caption": "حسابات العملاء",
          "columns": [
            {
              "key": "name",
              "label": "العميل",
              "sortable": true,
              "required": true,
              "initialWidth": 220,
              "overflow": "ellipsis"
            },
            {
              "key": "city",
              "label": "المدينة",
              "hideable": true,
              "initialWidth": 130,
              "overflow": "ellipsis"
            },
            {
              "key": "status",
              "label": "الحالة",
              "hideable": true,
              "initialWidth": 140,
              "overflow": "ellipsis"
            }
          ],
          "rows": [
            {
              "id": "customer-1",
              "name": "شركة النيل للتوريدات",
              "city": "القاهرة",
              "status": "نشط"
            },
            {
              "id": "customer-2",
              "name": "مؤسسة الصفا التجارية",
              "city": "الإسكندرية",
              "status": "قيد المراجعة"
            },
            {
              "id": "customer-3",
              "name": "مجموعة المستقبل",
              "city": "المنصورة",
              "status": "نشط"
            }
          ],
          "filterDefinitions": [
            {
              "key": "name",
              "label": "العميل",
              "placeholder": "ابحث باسم العميل"
            },
            {
              "key": "city",
              "label": "المدينة",
              "placeholder": "ابحث بالمدينة"
            }
          ],
          "selectable": true,
          "pageSize": 10,
          "page": 1,
          "sort": null,
          "filters": [],
          "visibleColumns": [],
          "selectedKeys": [],
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
          "title": "دليل العملاء",
          "subtitle": "عرض واستعلام ببيانات يملكها المستهلك",
          "caption": "حسابات العملاء",
          "columns": [
            {
              "key": "name",
              "label": "العميل",
              "sortable": true,
              "required": true,
              "initialWidth": 220,
              "overflow": "ellipsis"
            },
            {
              "key": "city",
              "label": "المدينة",
              "hideable": true,
              "initialWidth": 130,
              "overflow": "ellipsis"
            },
            {
              "key": "status",
              "label": "الحالة",
              "hideable": true,
              "initialWidth": 140,
              "overflow": "ellipsis"
            }
          ],
          "rows": [
            {
              "id": "customer-1",
              "name": "شركة النيل للتوريدات",
              "city": "القاهرة",
              "status": "نشط"
            },
            {
              "id": "customer-2",
              "name": "مؤسسة الصفا التجارية",
              "city": "الإسكندرية",
              "status": "قيد المراجعة"
            },
            {
              "id": "customer-3",
              "name": "مجموعة المستقبل",
              "city": "المنصورة",
              "status": "نشط"
            }
          ],
          "filterDefinitions": [
            {
              "key": "name",
              "label": "العميل",
              "placeholder": "ابحث باسم العميل"
            },
            {
              "key": "city",
              "label": "المدينة",
              "placeholder": "ابحث بالمدينة"
            }
          ],
          "selectable": true,
          "pageSize": 10,
          "page": 1,
          "sort": null,
          "filters": [],
          "visibleColumns": [],
          "selectedKeys": [],
          "loading": true
        }
      }
    ]
  }
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-data-page-showcase',
  imports: [ErpDataPage, ErpReviewShowcaseControlPanel, ErpReviewShowcaseReferenceComparison, ErpStack, ErpSurface, ErpText],
  templateUrl: './data-page-showcase.html',
  styleUrl: './data-page-showcase.scss',
})
export class ErpDataPageShowcase {
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
