import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpTabs} from '../../../controls/tabs/tabs';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpReviewShowcaseReferenceComparison} from '../../../review-internals/showcase-reference-comparison/showcase-reference-comparison';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';
import {ErpReviewShowcaseExactReference} from '../../../review-internals/showcase-exact-reference/showcase-exact-reference';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'tabs')!;
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
              "id": "overview",
              "label": "نظرة عامة",
              "content": "ملخص مؤشرات الأداء وحركة العمليات اليومية.",
              "icon": "dashboard",
              "count": 12
            },
            {
              "id": "orders",
              "label": "الطلبات",
              "content": "متابعة طلبات المبيعات وحالات التنفيذ والتسليم.",
              "icon": "shopping-cart",
              "count": 8
            },
            {
              "id": "invoices",
              "label": "الفواتير",
              "content": "مراجعة الفواتير المفتوحة والمسددة والمتأخرة.",
              "icon": "file",
              "count": 5
            },
            {
              "id": "customers",
              "label": "العملاء",
              "content": "بيانات العملاء والأرصدة وآخر المعاملات.",
              "icon": "people"
            },
            {
              "id": "reports",
              "label": "التقارير",
              "content": "التقارير الدورية قيد الإعداد.",
              "icon": "chart",
              "disabled": true
            }
          ],
          "activeId": "overview"
        }
      }
    ]
  },
  {
    "id": "variant",
    "label": "الأنماط",
    "cases": [
      {
        "id": "variant-underline",
        "label": "variant: underline",
        "inputs": {
          "items": [
            {
              "id": "overview",
              "label": "نظرة عامة",
              "content": "ملخص مؤشرات الأداء وحركة العمليات اليومية.",
              "icon": "dashboard",
              "count": 12
            },
            {
              "id": "orders",
              "label": "الطلبات",
              "content": "متابعة طلبات المبيعات وحالات التنفيذ والتسليم.",
              "icon": "shopping-cart",
              "count": 8
            },
            {
              "id": "invoices",
              "label": "الفواتير",
              "content": "مراجعة الفواتير المفتوحة والمسددة والمتأخرة.",
              "icon": "file",
              "count": 5
            },
            {
              "id": "customers",
              "label": "العملاء",
              "content": "بيانات العملاء والأرصدة وآخر المعاملات.",
              "icon": "people"
            },
            {
              "id": "reports",
              "label": "التقارير",
              "content": "التقارير الدورية قيد الإعداد.",
              "icon": "chart",
              "disabled": true
            }
          ],
          "activeId": "overview",
          "variant": "underline"
        }
      },
      {
        "id": "variant-pill",
        "label": "variant: pill",
        "inputs": {
          "items": [
            {
              "id": "overview",
              "label": "نظرة عامة",
              "content": "ملخص مؤشرات الأداء وحركة العمليات اليومية.",
              "icon": "dashboard",
              "count": 12
            },
            {
              "id": "orders",
              "label": "الطلبات",
              "content": "متابعة طلبات المبيعات وحالات التنفيذ والتسليم.",
              "icon": "shopping-cart",
              "count": 8
            },
            {
              "id": "invoices",
              "label": "الفواتير",
              "content": "مراجعة الفواتير المفتوحة والمسددة والمتأخرة.",
              "icon": "file",
              "count": 5
            },
            {
              "id": "customers",
              "label": "العملاء",
              "content": "بيانات العملاء والأرصدة وآخر المعاملات.",
              "icon": "people"
            },
            {
              "id": "reports",
              "label": "التقارير",
              "content": "التقارير الدورية قيد الإعداد.",
              "icon": "chart",
              "disabled": true
            }
          ],
          "activeId": "overview",
          "variant": "pill"
        }
      },
      {
        "id": "variant-solid",
        "label": "صلب (solid)",
        "inputs": {
          "items": [
            {
              "id": "overview",
              "label": "نظرة عامة",
              "content": "ملخص مؤشرات الأداء وحركة العمليات اليومية.",
              "icon": "dashboard",
              "count": 12
            },
            {
              "id": "orders",
              "label": "الطلبات",
              "content": "متابعة طلبات المبيعات وحالات التنفيذ والتسليم.",
              "icon": "shopping-cart",
              "count": 8
            },
            {
              "id": "invoices",
              "label": "الفواتير",
              "content": "مراجعة الفواتير المفتوحة والمسددة والمتأخرة.",
              "icon": "file",
              "count": 5
            },
            {
              "id": "customers",
              "label": "العملاء",
              "content": "بيانات العملاء والأرصدة وآخر المعاملات.",
              "icon": "people"
            },
            {
              "id": "reports",
              "label": "التقارير",
              "content": "التقارير الدورية قيد الإعداد.",
              "icon": "chart",
              "disabled": true
            }
          ],
          "activeId": "overview",
          "variant": "solid"
        }
      },
      {
        "id": "variant-ghost",
        "label": "شفاف (ghost)",
        "inputs": {
          "items": [
            {
              "id": "overview",
              "label": "نظرة عامة",
              "content": "ملخص مؤشرات الأداء وحركة العمليات اليومية.",
              "icon": "dashboard",
              "count": 12
            },
            {
              "id": "orders",
              "label": "الطلبات",
              "content": "متابعة طلبات المبيعات وحالات التنفيذ والتسليم.",
              "icon": "shopping-cart",
              "count": 8
            },
            {
              "id": "invoices",
              "label": "الفواتير",
              "content": "مراجعة الفواتير المفتوحة والمسددة والمتأخرة.",
              "icon": "file",
              "count": 5
            },
            {
              "id": "customers",
              "label": "العملاء",
              "content": "بيانات العملاء والأرصدة وآخر المعاملات.",
              "icon": "people"
            },
            {
              "id": "reports",
              "label": "التقارير",
              "content": "التقارير الدورية قيد الإعداد.",
              "icon": "chart",
              "disabled": true
            }
          ],
          "activeId": "overview",
          "variant": "ghost"
        }
      },
      {
        "id": "variant-pills",
        "label": "variant: pills",
        "inputs": {
          "items": [
            {
              "id": "overview",
              "label": "نظرة عامة",
              "content": "ملخص مؤشرات الأداء وحركة العمليات اليومية.",
              "icon": "dashboard",
              "count": 12
            },
            {
              "id": "orders",
              "label": "الطلبات",
              "content": "متابعة طلبات المبيعات وحالات التنفيذ والتسليم.",
              "icon": "shopping-cart",
              "count": 8
            },
            {
              "id": "invoices",
              "label": "الفواتير",
              "content": "مراجعة الفواتير المفتوحة والمسددة والمتأخرة.",
              "icon": "file",
              "count": 5
            },
            {
              "id": "customers",
              "label": "العملاء",
              "content": "بيانات العملاء والأرصدة وآخر المعاملات.",
              "icon": "people"
            },
            {
              "id": "reports",
              "label": "التقارير",
              "content": "التقارير الدورية قيد الإعداد.",
              "icon": "chart",
              "disabled": true
            }
          ],
          "activeId": "overview",
          "variant": "pills"
        }
      }
    ]
  },
  {
    "id": "orientation",
    "label": "الاتجاهات",
    "cases": [
      {
        "id": "orientation-horizontal",
        "label": "أفقي (horizontal)",
        "inputs": {
          "items": [
            {
              "id": "overview",
              "label": "نظرة عامة",
              "content": "ملخص مؤشرات الأداء وحركة العمليات اليومية.",
              "icon": "dashboard",
              "count": 12
            },
            {
              "id": "orders",
              "label": "الطلبات",
              "content": "متابعة طلبات المبيعات وحالات التنفيذ والتسليم.",
              "icon": "shopping-cart",
              "count": 8
            },
            {
              "id": "invoices",
              "label": "الفواتير",
              "content": "مراجعة الفواتير المفتوحة والمسددة والمتأخرة.",
              "icon": "file",
              "count": 5
            },
            {
              "id": "customers",
              "label": "العملاء",
              "content": "بيانات العملاء والأرصدة وآخر المعاملات.",
              "icon": "people"
            },
            {
              "id": "reports",
              "label": "التقارير",
              "content": "التقارير الدورية قيد الإعداد.",
              "icon": "chart",
              "disabled": true
            }
          ],
          "activeId": "overview",
          "orientation": "horizontal"
        }
      },
      {
        "id": "orientation-vertical",
        "label": "رأسي (vertical)",
        "inputs": {
          "items": [
            {
              "id": "overview",
              "label": "نظرة عامة",
              "content": "ملخص مؤشرات الأداء وحركة العمليات اليومية.",
              "icon": "dashboard",
              "count": 12
            },
            {
              "id": "orders",
              "label": "الطلبات",
              "content": "متابعة طلبات المبيعات وحالات التنفيذ والتسليم.",
              "icon": "shopping-cart",
              "count": 8
            },
            {
              "id": "invoices",
              "label": "الفواتير",
              "content": "مراجعة الفواتير المفتوحة والمسددة والمتأخرة.",
              "icon": "file",
              "count": 5
            },
            {
              "id": "customers",
              "label": "العملاء",
              "content": "بيانات العملاء والأرصدة وآخر المعاملات.",
              "icon": "people"
            },
            {
              "id": "reports",
              "label": "التقارير",
              "content": "التقارير الدورية قيد الإعداد.",
              "icon": "chart",
              "disabled": true
            }
          ],
          "activeId": "overview",
          "orientation": "vertical"
        }
      }
    ]
  },
  {
    "id": "distribution",
    "label": "التوزيع",
    "cases": [
      {
        "id": "distribution-content",
        "label": "distribution: content",
        "inputs": {
          "items": [
            {
              "id": "overview",
              "label": "نظرة عامة",
              "content": "ملخص مؤشرات الأداء وحركة العمليات اليومية.",
              "icon": "dashboard",
              "count": 12
            },
            {
              "id": "orders",
              "label": "الطلبات",
              "content": "متابعة طلبات المبيعات وحالات التنفيذ والتسليم.",
              "icon": "shopping-cart",
              "count": 8
            },
            {
              "id": "invoices",
              "label": "الفواتير",
              "content": "مراجعة الفواتير المفتوحة والمسددة والمتأخرة.",
              "icon": "file",
              "count": 5
            },
            {
              "id": "customers",
              "label": "العملاء",
              "content": "بيانات العملاء والأرصدة وآخر المعاملات.",
              "icon": "people"
            },
            {
              "id": "reports",
              "label": "التقارير",
              "content": "التقارير الدورية قيد الإعداد.",
              "icon": "chart",
              "disabled": true
            }
          ],
          "activeId": "overview",
          "distribution": "content"
        }
      },
      {
        "id": "distribution-fill",
        "label": "distribution: fill",
        "inputs": {
          "items": [
            {
              "id": "overview",
              "label": "نظرة عامة",
              "content": "ملخص مؤشرات الأداء وحركة العمليات اليومية.",
              "icon": "dashboard",
              "count": 12
            },
            {
              "id": "orders",
              "label": "الطلبات",
              "content": "متابعة طلبات المبيعات وحالات التنفيذ والتسليم.",
              "icon": "shopping-cart",
              "count": 8
            },
            {
              "id": "invoices",
              "label": "الفواتير",
              "content": "مراجعة الفواتير المفتوحة والمسددة والمتأخرة.",
              "icon": "file",
              "count": 5
            },
            {
              "id": "customers",
              "label": "العملاء",
              "content": "بيانات العملاء والأرصدة وآخر المعاملات.",
              "icon": "people"
            },
            {
              "id": "reports",
              "label": "التقارير",
              "content": "التقارير الدورية قيد الإعداد.",
              "icon": "chart",
              "disabled": true
            }
          ],
          "activeId": "overview",
          "distribution": "fill"
        }
      }
    ]
  },
  {
    "id": "headerShape",
    "label": "شكل الرأس",
    "cases": [
      {
        "id": "headerShape-reference",
        "label": "headerShape: reference",
        "inputs": {
          "items": [
            {
              "id": "overview",
              "label": "نظرة عامة",
              "content": "ملخص مؤشرات الأداء وحركة العمليات اليومية.",
              "icon": "dashboard",
              "count": 12
            },
            {
              "id": "orders",
              "label": "الطلبات",
              "content": "متابعة طلبات المبيعات وحالات التنفيذ والتسليم.",
              "icon": "shopping-cart",
              "count": 8
            },
            {
              "id": "invoices",
              "label": "الفواتير",
              "content": "مراجعة الفواتير المفتوحة والمسددة والمتأخرة.",
              "icon": "file",
              "count": 5
            },
            {
              "id": "customers",
              "label": "العملاء",
              "content": "بيانات العملاء والأرصدة وآخر المعاملات.",
              "icon": "people"
            },
            {
              "id": "reports",
              "label": "التقارير",
              "content": "التقارير الدورية قيد الإعداد.",
              "icon": "chart",
              "disabled": true
            }
          ],
          "activeId": "overview",
          "headerShape": "reference"
        }
      },
      {
        "id": "headerShape-rectangle",
        "label": "headerShape: rectangle",
        "inputs": {
          "items": [
            {
              "id": "overview",
              "label": "نظرة عامة",
              "content": "ملخص مؤشرات الأداء وحركة العمليات اليومية.",
              "icon": "dashboard",
              "count": 12
            },
            {
              "id": "orders",
              "label": "الطلبات",
              "content": "متابعة طلبات المبيعات وحالات التنفيذ والتسليم.",
              "icon": "shopping-cart",
              "count": 8
            },
            {
              "id": "invoices",
              "label": "الفواتير",
              "content": "مراجعة الفواتير المفتوحة والمسددة والمتأخرة.",
              "icon": "file",
              "count": 5
            },
            {
              "id": "customers",
              "label": "العملاء",
              "content": "بيانات العملاء والأرصدة وآخر المعاملات.",
              "icon": "people"
            },
            {
              "id": "reports",
              "label": "التقارير",
              "content": "التقارير الدورية قيد الإعداد.",
              "icon": "chart",
              "disabled": true
            }
          ],
          "activeId": "overview",
          "headerShape": "rectangle"
        }
      },
      {
        "id": "headerShape-rounded",
        "label": "مستدير (rounded)",
        "inputs": {
          "items": [
            {
              "id": "overview",
              "label": "نظرة عامة",
              "content": "ملخص مؤشرات الأداء وحركة العمليات اليومية.",
              "icon": "dashboard",
              "count": 12
            },
            {
              "id": "orders",
              "label": "الطلبات",
              "content": "متابعة طلبات المبيعات وحالات التنفيذ والتسليم.",
              "icon": "shopping-cart",
              "count": 8
            },
            {
              "id": "invoices",
              "label": "الفواتير",
              "content": "مراجعة الفواتير المفتوحة والمسددة والمتأخرة.",
              "icon": "file",
              "count": 5
            },
            {
              "id": "customers",
              "label": "العملاء",
              "content": "بيانات العملاء والأرصدة وآخر المعاملات.",
              "icon": "people"
            },
            {
              "id": "reports",
              "label": "التقارير",
              "content": "التقارير الدورية قيد الإعداد.",
              "icon": "chart",
              "disabled": true
            }
          ],
          "activeId": "overview",
          "headerShape": "rounded"
        }
      },
      {
        "id": "headerShape-circle",
        "label": "دائري (circle)",
        "inputs": {
          "items": [
            {
              "id": "overview",
              "label": "نظرة عامة",
              "content": "ملخص مؤشرات الأداء وحركة العمليات اليومية.",
              "icon": "dashboard",
              "count": 12
            },
            {
              "id": "orders",
              "label": "الطلبات",
              "content": "متابعة طلبات المبيعات وحالات التنفيذ والتسليم.",
              "icon": "shopping-cart",
              "count": 8
            },
            {
              "id": "invoices",
              "label": "الفواتير",
              "content": "مراجعة الفواتير المفتوحة والمسددة والمتأخرة.",
              "icon": "file",
              "count": 5
            },
            {
              "id": "customers",
              "label": "العملاء",
              "content": "بيانات العملاء والأرصدة وآخر المعاملات.",
              "icon": "people"
            },
            {
              "id": "reports",
              "label": "التقارير",
              "content": "التقارير الدورية قيد الإعداد.",
              "icon": "chart",
              "disabled": true
            }
          ],
          "activeId": "overview",
          "headerShape": "circle"
        }
      }
    ]
  },
  {
    "id": "verticalPlacement",
    "label": "الموضع الرأسي",
    "cases": [
      {
        "id": "verticalPlacement-start",
        "label": "البداية (start)",
        "inputs": {
          "items": [
            {
              "id": "overview",
              "label": "نظرة عامة",
              "content": "ملخص مؤشرات الأداء وحركة العمليات اليومية.",
              "icon": "dashboard",
              "count": 12
            },
            {
              "id": "orders",
              "label": "الطلبات",
              "content": "متابعة طلبات المبيعات وحالات التنفيذ والتسليم.",
              "icon": "shopping-cart",
              "count": 8
            },
            {
              "id": "invoices",
              "label": "الفواتير",
              "content": "مراجعة الفواتير المفتوحة والمسددة والمتأخرة.",
              "icon": "file",
              "count": 5
            },
            {
              "id": "customers",
              "label": "العملاء",
              "content": "بيانات العملاء والأرصدة وآخر المعاملات.",
              "icon": "people"
            },
            {
              "id": "reports",
              "label": "التقارير",
              "content": "التقارير الدورية قيد الإعداد.",
              "icon": "chart",
              "disabled": true
            }
          ],
          "activeId": "overview",
          "verticalPlacement": "start"
        }
      },
      {
        "id": "verticalPlacement-end",
        "label": "النهاية (end)",
        "inputs": {
          "items": [
            {
              "id": "overview",
              "label": "نظرة عامة",
              "content": "ملخص مؤشرات الأداء وحركة العمليات اليومية.",
              "icon": "dashboard",
              "count": 12
            },
            {
              "id": "orders",
              "label": "الطلبات",
              "content": "متابعة طلبات المبيعات وحالات التنفيذ والتسليم.",
              "icon": "shopping-cart",
              "count": 8
            },
            {
              "id": "invoices",
              "label": "الفواتير",
              "content": "مراجعة الفواتير المفتوحة والمسددة والمتأخرة.",
              "icon": "file",
              "count": 5
            },
            {
              "id": "customers",
              "label": "العملاء",
              "content": "بيانات العملاء والأرصدة وآخر المعاملات.",
              "icon": "people"
            },
            {
              "id": "reports",
              "label": "التقارير",
              "content": "التقارير الدورية قيد الإعداد.",
              "icon": "chart",
              "disabled": true
            }
          ],
          "activeId": "overview",
          "verticalPlacement": "end"
        }
      }
    ]
  },
  {
    "id": "transition",
    "label": "الانتقال",
    "cases": [
      {
        "id": "transition-slide",
        "label": "transition: slide",
        "inputs": {
          "items": [
            {
              "id": "overview",
              "label": "نظرة عامة",
              "content": "ملخص مؤشرات الأداء وحركة العمليات اليومية.",
              "icon": "dashboard",
              "count": 12
            },
            {
              "id": "orders",
              "label": "الطلبات",
              "content": "متابعة طلبات المبيعات وحالات التنفيذ والتسليم.",
              "icon": "shopping-cart",
              "count": 8
            },
            {
              "id": "invoices",
              "label": "الفواتير",
              "content": "مراجعة الفواتير المفتوحة والمسددة والمتأخرة.",
              "icon": "file",
              "count": 5
            },
            {
              "id": "customers",
              "label": "العملاء",
              "content": "بيانات العملاء والأرصدة وآخر المعاملات.",
              "icon": "people"
            },
            {
              "id": "reports",
              "label": "التقارير",
              "content": "التقارير الدورية قيد الإعداد.",
              "icon": "chart",
              "disabled": true
            }
          ],
          "activeId": "overview",
          "transition": "slide"
        }
      },
      {
        "id": "transition-fade",
        "label": "transition: fade",
        "inputs": {
          "items": [
            {
              "id": "overview",
              "label": "نظرة عامة",
              "content": "ملخص مؤشرات الأداء وحركة العمليات اليومية.",
              "icon": "dashboard",
              "count": 12
            },
            {
              "id": "orders",
              "label": "الطلبات",
              "content": "متابعة طلبات المبيعات وحالات التنفيذ والتسليم.",
              "icon": "shopping-cart",
              "count": 8
            },
            {
              "id": "invoices",
              "label": "الفواتير",
              "content": "مراجعة الفواتير المفتوحة والمسددة والمتأخرة.",
              "icon": "file",
              "count": 5
            },
            {
              "id": "customers",
              "label": "العملاء",
              "content": "بيانات العملاء والأرصدة وآخر المعاملات.",
              "icon": "people"
            },
            {
              "id": "reports",
              "label": "التقارير",
              "content": "التقارير الدورية قيد الإعداد.",
              "icon": "chart",
              "disabled": true
            }
          ],
          "activeId": "overview",
          "transition": "fade"
        }
      },
      {
        "id": "transition-scale",
        "label": "transition: scale",
        "inputs": {
          "items": [
            {
              "id": "overview",
              "label": "نظرة عامة",
              "content": "ملخص مؤشرات الأداء وحركة العمليات اليومية.",
              "icon": "dashboard",
              "count": 12
            },
            {
              "id": "orders",
              "label": "الطلبات",
              "content": "متابعة طلبات المبيعات وحالات التنفيذ والتسليم.",
              "icon": "shopping-cart",
              "count": 8
            },
            {
              "id": "invoices",
              "label": "الفواتير",
              "content": "مراجعة الفواتير المفتوحة والمسددة والمتأخرة.",
              "icon": "file",
              "count": 5
            },
            {
              "id": "customers",
              "label": "العملاء",
              "content": "بيانات العملاء والأرصدة وآخر المعاملات.",
              "icon": "people"
            },
            {
              "id": "reports",
              "label": "التقارير",
              "content": "التقارير الدورية قيد الإعداد.",
              "icon": "chart",
              "disabled": true
            }
          ],
          "activeId": "overview",
          "transition": "scale"
        }
      },
      {
        "id": "transition-none",
        "label": "بدون (none)",
        "inputs": {
          "items": [
            {
              "id": "overview",
              "label": "نظرة عامة",
              "content": "ملخص مؤشرات الأداء وحركة العمليات اليومية.",
              "icon": "dashboard",
              "count": 12
            },
            {
              "id": "orders",
              "label": "الطلبات",
              "content": "متابعة طلبات المبيعات وحالات التنفيذ والتسليم.",
              "icon": "shopping-cart",
              "count": 8
            },
            {
              "id": "invoices",
              "label": "الفواتير",
              "content": "مراجعة الفواتير المفتوحة والمسددة والمتأخرة.",
              "icon": "file",
              "count": 5
            },
            {
              "id": "customers",
              "label": "العملاء",
              "content": "بيانات العملاء والأرصدة وآخر المعاملات.",
              "icon": "people"
            },
            {
              "id": "reports",
              "label": "التقارير",
              "content": "التقارير الدورية قيد الإعداد.",
              "icon": "chart",
              "disabled": true
            }
          ],
          "activeId": "overview",
          "transition": "none"
        }
      },
      {
        "id": "transition-fade-up",
        "label": "transition: fade-up",
        "inputs": {
          "items": [
            {
              "id": "overview",
              "label": "نظرة عامة",
              "content": "ملخص مؤشرات الأداء وحركة العمليات اليومية.",
              "icon": "dashboard",
              "count": 12
            },
            {
              "id": "orders",
              "label": "الطلبات",
              "content": "متابعة طلبات المبيعات وحالات التنفيذ والتسليم.",
              "icon": "shopping-cart",
              "count": 8
            },
            {
              "id": "invoices",
              "label": "الفواتير",
              "content": "مراجعة الفواتير المفتوحة والمسددة والمتأخرة.",
              "icon": "file",
              "count": 5
            },
            {
              "id": "customers",
              "label": "العملاء",
              "content": "بيانات العملاء والأرصدة وآخر المعاملات.",
              "icon": "people"
            },
            {
              "id": "reports",
              "label": "التقارير",
              "content": "التقارير الدورية قيد الإعداد.",
              "icon": "chart",
              "disabled": true
            }
          ],
          "activeId": "overview",
          "transition": "fade-up"
        }
      },
      {
        "id": "transition-fade-down",
        "label": "transition: fade-down",
        "inputs": {
          "items": [
            {
              "id": "overview",
              "label": "نظرة عامة",
              "content": "ملخص مؤشرات الأداء وحركة العمليات اليومية.",
              "icon": "dashboard",
              "count": 12
            },
            {
              "id": "orders",
              "label": "الطلبات",
              "content": "متابعة طلبات المبيعات وحالات التنفيذ والتسليم.",
              "icon": "shopping-cart",
              "count": 8
            },
            {
              "id": "invoices",
              "label": "الفواتير",
              "content": "مراجعة الفواتير المفتوحة والمسددة والمتأخرة.",
              "icon": "file",
              "count": 5
            },
            {
              "id": "customers",
              "label": "العملاء",
              "content": "بيانات العملاء والأرصدة وآخر المعاملات.",
              "icon": "people"
            },
            {
              "id": "reports",
              "label": "التقارير",
              "content": "التقارير الدورية قيد الإعداد.",
              "icon": "chart",
              "disabled": true
            }
          ],
          "activeId": "overview",
          "transition": "fade-down"
        }
      },
      {
        "id": "transition-fade-start",
        "label": "transition: fade-start",
        "inputs": {
          "items": [
            {
              "id": "overview",
              "label": "نظرة عامة",
              "content": "ملخص مؤشرات الأداء وحركة العمليات اليومية.",
              "icon": "dashboard",
              "count": 12
            },
            {
              "id": "orders",
              "label": "الطلبات",
              "content": "متابعة طلبات المبيعات وحالات التنفيذ والتسليم.",
              "icon": "shopping-cart",
              "count": 8
            },
            {
              "id": "invoices",
              "label": "الفواتير",
              "content": "مراجعة الفواتير المفتوحة والمسددة والمتأخرة.",
              "icon": "file",
              "count": 5
            },
            {
              "id": "customers",
              "label": "العملاء",
              "content": "بيانات العملاء والأرصدة وآخر المعاملات.",
              "icon": "people"
            },
            {
              "id": "reports",
              "label": "التقارير",
              "content": "التقارير الدورية قيد الإعداد.",
              "icon": "chart",
              "disabled": true
            }
          ],
          "activeId": "overview",
          "transition": "fade-start"
        }
      },
      {
        "id": "transition-fade-end",
        "label": "transition: fade-end",
        "inputs": {
          "items": [
            {
              "id": "overview",
              "label": "نظرة عامة",
              "content": "ملخص مؤشرات الأداء وحركة العمليات اليومية.",
              "icon": "dashboard",
              "count": 12
            },
            {
              "id": "orders",
              "label": "الطلبات",
              "content": "متابعة طلبات المبيعات وحالات التنفيذ والتسليم.",
              "icon": "shopping-cart",
              "count": 8
            },
            {
              "id": "invoices",
              "label": "الفواتير",
              "content": "مراجعة الفواتير المفتوحة والمسددة والمتأخرة.",
              "icon": "file",
              "count": 5
            },
            {
              "id": "customers",
              "label": "العملاء",
              "content": "بيانات العملاء والأرصدة وآخر المعاملات.",
              "icon": "people"
            },
            {
              "id": "reports",
              "label": "التقارير",
              "content": "التقارير الدورية قيد الإعداد.",
              "icon": "chart",
              "disabled": true
            }
          ],
          "activeId": "overview",
          "transition": "fade-end"
        }
      }
    ]
  }
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tabs-showcase',
  imports: [ErpTabs, ErpReviewShowcaseControlPanel, ErpReviewShowcaseReferenceComparison, ErpStack, ErpSurface, ErpText, ErpReviewShowcaseExactReference],
  templateUrl: './tabs-showcase.html',
  styleUrl: './tabs-showcase.scss',
})
export class ErpTabsShowcase {
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
