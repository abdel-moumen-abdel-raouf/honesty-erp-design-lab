import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpStandardEntityForm} from '../../../controls/entity-form/standard-entity-form';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpReviewShowcaseReferenceComparison} from '../../../review-internals/showcase-reference-comparison/showcase-reference-comparison';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';
import {ErpButton} from '../../../controls/button/button';
import {ErpEntityCustomFieldOutlet, ErpEntityCustomSectionOutlet, ErpEntityFormReviewTemplate} from '../../../controls/entity-form/entity-form-outlets';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'standard-entity-form')!;
const REVIEW_GALLERY_GROUPS = [
  {
    "id": "default",
    "label": "الحالة الافتراضية",
    "cases": [
      {
        "id": "default",
        "label": "الحالة الافتراضية",
        "inputs": {
          "schema": {
            "id": "supplier",
            "label": "بطاقة المورد",
            "description": "بيانات التسجيل والتعامل المالي للمورد.",
            "sections": [
              {
                "kind": "fields",
                "id": "identity",
                "title": "البيانات الأساسية",
                "description": "هوية المورد ووسائل التواصل.",
                "fields": [
                  {
                    "key": "name",
                    "kind": "text",
                    "label": "اسم المورد",
                    "required": true
                  },
                  {
                    "key": "phone",
                    "kind": "telephone",
                    "label": "هاتف التواصل"
                  },
                  {
                    "key": "website",
                    "kind": "url",
                    "label": "الموقع الإلكتروني"
                  },
                  {
                    "key": "active",
                    "kind": "checkbox",
                    "label": "مورد نشط"
                  }
                ]
              },
              {
                "kind": "fields",
                "id": "commercial",
                "title": "بيانات التعامل",
                "description": "التصنيف والحد الائتماني والفرع.",
                "fields": [
                  {
                    "key": "type",
                    "kind": "radio",
                    "label": "نوع المورد",
                    "options": [
                      {
                        "value": "local",
                        "label": "محلي"
                      },
                      {
                        "value": "international",
                        "label": "دولي"
                      }
                    ]
                  },
                  {
                    "key": "branch",
                    "kind": "select",
                    "label": "الفرع المسؤول",
                    "options": [
                      {
                        "value": "cairo",
                        "label": "القاهرة"
                      },
                      {
                        "value": "alex",
                        "label": "الإسكندرية"
                      }
                    ]
                  },
                  {
                    "key": "limit",
                    "kind": "money",
                    "label": "الحد الائتماني",
                    "currency": "EGP",
                    "min": 0
                  },
                  {
                    "key": "classification",
                    "kind": "custom",
                    "label": "التصنيف",
                    "outlet": "classification"
                  }
                ]
              },
              {
                "kind": "custom",
                "id": "attachments",
                "title": "المرفقات",
                "description": "دليل منفذ القسم المخصص.",
                "outlet": "attachments"
              }
            ],
            "steps": [
              {
                "id": "identity-step",
                "label": "الهوية",
                "description": "بيانات المورد الأساسية",
                "sectionIds": [
                  "identity"
                ]
              },
              {
                "id": "commercial-step",
                "label": "التعامل",
                "description": "التصنيف والحدود",
                "sectionIds": [
                  "commercial"
                ]
              },
              {
                "id": "attachments-step",
                "label": "المرفقات",
                "description": "مستندات المورد",
                "sectionIds": [
                  "attachments"
                ],
                "optional": true
              },
              {
                "id": "review-step",
                "label": "المراجعة",
                "description": "مراجعة القيم قبل الحفظ",
                "sectionIds": [],
                "review": true
              }
            ],
            "actions": {
              "submitLabel": "حفظ المورد",
              "resetLabel": "إعادة الضبط",
              "cancelLabel": "إلغاء"
            }
          },
          "values": {
            "name": "شركة النيل للتوريدات",
            "phone": "+201005550101",
            "website": "https://honesty.example",
            "active": true,
            "type": "local",
            "branch": "cairo",
            "limit": 250000,
            "classification": "approved"
          },
          "issues": [],
          "activeStepId": "identity-step"
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
          "schema": {
            "id": "supplier",
            "label": "بطاقة المورد",
            "description": "بيانات التسجيل والتعامل المالي للمورد.",
            "sections": [
              {
                "kind": "fields",
                "id": "identity",
                "title": "البيانات الأساسية",
                "description": "هوية المورد ووسائل التواصل.",
                "fields": [
                  {
                    "key": "name",
                    "kind": "text",
                    "label": "اسم المورد",
                    "required": true
                  },
                  {
                    "key": "phone",
                    "kind": "telephone",
                    "label": "هاتف التواصل"
                  },
                  {
                    "key": "website",
                    "kind": "url",
                    "label": "الموقع الإلكتروني"
                  },
                  {
                    "key": "active",
                    "kind": "checkbox",
                    "label": "مورد نشط"
                  }
                ]
              },
              {
                "kind": "fields",
                "id": "commercial",
                "title": "بيانات التعامل",
                "description": "التصنيف والحد الائتماني والفرع.",
                "fields": [
                  {
                    "key": "type",
                    "kind": "radio",
                    "label": "نوع المورد",
                    "options": [
                      {
                        "value": "local",
                        "label": "محلي"
                      },
                      {
                        "value": "international",
                        "label": "دولي"
                      }
                    ]
                  },
                  {
                    "key": "branch",
                    "kind": "select",
                    "label": "الفرع المسؤول",
                    "options": [
                      {
                        "value": "cairo",
                        "label": "القاهرة"
                      },
                      {
                        "value": "alex",
                        "label": "الإسكندرية"
                      }
                    ]
                  },
                  {
                    "key": "limit",
                    "kind": "money",
                    "label": "الحد الائتماني",
                    "currency": "EGP",
                    "min": 0
                  },
                  {
                    "key": "classification",
                    "kind": "custom",
                    "label": "التصنيف",
                    "outlet": "classification"
                  }
                ]
              },
              {
                "kind": "custom",
                "id": "attachments",
                "title": "المرفقات",
                "description": "دليل منفذ القسم المخصص.",
                "outlet": "attachments"
              }
            ],
            "steps": [
              {
                "id": "identity-step",
                "label": "الهوية",
                "description": "بيانات المورد الأساسية",
                "sectionIds": [
                  "identity"
                ]
              },
              {
                "id": "commercial-step",
                "label": "التعامل",
                "description": "التصنيف والحدود",
                "sectionIds": [
                  "commercial"
                ]
              },
              {
                "id": "attachments-step",
                "label": "المرفقات",
                "description": "مستندات المورد",
                "sectionIds": [
                  "attachments"
                ],
                "optional": true
              },
              {
                "id": "review-step",
                "label": "المراجعة",
                "description": "مراجعة القيم قبل الحفظ",
                "sectionIds": [],
                "review": true
              }
            ],
            "actions": {
              "submitLabel": "حفظ المورد",
              "resetLabel": "إعادة الضبط",
              "cancelLabel": "إلغاء"
            }
          },
          "values": {
            "name": "شركة النيل للتوريدات",
            "phone": "+201005550101",
            "website": "https://honesty.example",
            "active": true,
            "type": "local",
            "branch": "cairo",
            "limit": 250000,
            "classification": "approved"
          },
          "issues": [],
          "activeStepId": "identity-step",
          "disabled": false
        }
      },
      {
        "id": "disabled-true",
        "label": "مفعّل (true)",
        "inputs": {
          "schema": {
            "id": "supplier",
            "label": "بطاقة المورد",
            "description": "بيانات التسجيل والتعامل المالي للمورد.",
            "sections": [
              {
                "kind": "fields",
                "id": "identity",
                "title": "البيانات الأساسية",
                "description": "هوية المورد ووسائل التواصل.",
                "fields": [
                  {
                    "key": "name",
                    "kind": "text",
                    "label": "اسم المورد",
                    "required": true
                  },
                  {
                    "key": "phone",
                    "kind": "telephone",
                    "label": "هاتف التواصل"
                  },
                  {
                    "key": "website",
                    "kind": "url",
                    "label": "الموقع الإلكتروني"
                  },
                  {
                    "key": "active",
                    "kind": "checkbox",
                    "label": "مورد نشط"
                  }
                ]
              },
              {
                "kind": "fields",
                "id": "commercial",
                "title": "بيانات التعامل",
                "description": "التصنيف والحد الائتماني والفرع.",
                "fields": [
                  {
                    "key": "type",
                    "kind": "radio",
                    "label": "نوع المورد",
                    "options": [
                      {
                        "value": "local",
                        "label": "محلي"
                      },
                      {
                        "value": "international",
                        "label": "دولي"
                      }
                    ]
                  },
                  {
                    "key": "branch",
                    "kind": "select",
                    "label": "الفرع المسؤول",
                    "options": [
                      {
                        "value": "cairo",
                        "label": "القاهرة"
                      },
                      {
                        "value": "alex",
                        "label": "الإسكندرية"
                      }
                    ]
                  },
                  {
                    "key": "limit",
                    "kind": "money",
                    "label": "الحد الائتماني",
                    "currency": "EGP",
                    "min": 0
                  },
                  {
                    "key": "classification",
                    "kind": "custom",
                    "label": "التصنيف",
                    "outlet": "classification"
                  }
                ]
              },
              {
                "kind": "custom",
                "id": "attachments",
                "title": "المرفقات",
                "description": "دليل منفذ القسم المخصص.",
                "outlet": "attachments"
              }
            ],
            "steps": [
              {
                "id": "identity-step",
                "label": "الهوية",
                "description": "بيانات المورد الأساسية",
                "sectionIds": [
                  "identity"
                ]
              },
              {
                "id": "commercial-step",
                "label": "التعامل",
                "description": "التصنيف والحدود",
                "sectionIds": [
                  "commercial"
                ]
              },
              {
                "id": "attachments-step",
                "label": "المرفقات",
                "description": "مستندات المورد",
                "sectionIds": [
                  "attachments"
                ],
                "optional": true
              },
              {
                "id": "review-step",
                "label": "المراجعة",
                "description": "مراجعة القيم قبل الحفظ",
                "sectionIds": [],
                "review": true
              }
            ],
            "actions": {
              "submitLabel": "حفظ المورد",
              "resetLabel": "إعادة الضبط",
              "cancelLabel": "إلغاء"
            }
          },
          "values": {
            "name": "شركة النيل للتوريدات",
            "phone": "+201005550101",
            "website": "https://honesty.example",
            "active": true,
            "type": "local",
            "branch": "cairo",
            "limit": 250000,
            "classification": "approved"
          },
          "issues": [],
          "activeStepId": "identity-step",
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
          "schema": {
            "id": "supplier",
            "label": "بطاقة المورد",
            "description": "بيانات التسجيل والتعامل المالي للمورد.",
            "sections": [
              {
                "kind": "fields",
                "id": "identity",
                "title": "البيانات الأساسية",
                "description": "هوية المورد ووسائل التواصل.",
                "fields": [
                  {
                    "key": "name",
                    "kind": "text",
                    "label": "اسم المورد",
                    "required": true
                  },
                  {
                    "key": "phone",
                    "kind": "telephone",
                    "label": "هاتف التواصل"
                  },
                  {
                    "key": "website",
                    "kind": "url",
                    "label": "الموقع الإلكتروني"
                  },
                  {
                    "key": "active",
                    "kind": "checkbox",
                    "label": "مورد نشط"
                  }
                ]
              },
              {
                "kind": "fields",
                "id": "commercial",
                "title": "بيانات التعامل",
                "description": "التصنيف والحد الائتماني والفرع.",
                "fields": [
                  {
                    "key": "type",
                    "kind": "radio",
                    "label": "نوع المورد",
                    "options": [
                      {
                        "value": "local",
                        "label": "محلي"
                      },
                      {
                        "value": "international",
                        "label": "دولي"
                      }
                    ]
                  },
                  {
                    "key": "branch",
                    "kind": "select",
                    "label": "الفرع المسؤول",
                    "options": [
                      {
                        "value": "cairo",
                        "label": "القاهرة"
                      },
                      {
                        "value": "alex",
                        "label": "الإسكندرية"
                      }
                    ]
                  },
                  {
                    "key": "limit",
                    "kind": "money",
                    "label": "الحد الائتماني",
                    "currency": "EGP",
                    "min": 0
                  },
                  {
                    "key": "classification",
                    "kind": "custom",
                    "label": "التصنيف",
                    "outlet": "classification"
                  }
                ]
              },
              {
                "kind": "custom",
                "id": "attachments",
                "title": "المرفقات",
                "description": "دليل منفذ القسم المخصص.",
                "outlet": "attachments"
              }
            ],
            "steps": [
              {
                "id": "identity-step",
                "label": "الهوية",
                "description": "بيانات المورد الأساسية",
                "sectionIds": [
                  "identity"
                ]
              },
              {
                "id": "commercial-step",
                "label": "التعامل",
                "description": "التصنيف والحدود",
                "sectionIds": [
                  "commercial"
                ]
              },
              {
                "id": "attachments-step",
                "label": "المرفقات",
                "description": "مستندات المورد",
                "sectionIds": [
                  "attachments"
                ],
                "optional": true
              },
              {
                "id": "review-step",
                "label": "المراجعة",
                "description": "مراجعة القيم قبل الحفظ",
                "sectionIds": [],
                "review": true
              }
            ],
            "actions": {
              "submitLabel": "حفظ المورد",
              "resetLabel": "إعادة الضبط",
              "cancelLabel": "إلغاء"
            }
          },
          "values": {
            "name": "شركة النيل للتوريدات",
            "phone": "+201005550101",
            "website": "https://honesty.example",
            "active": true,
            "type": "local",
            "branch": "cairo",
            "limit": 250000,
            "classification": "approved"
          },
          "issues": [],
          "activeStepId": "identity-step",
          "disabled": true
        }
      }
    ]
  }
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-standard-entity-form-showcase',
  imports: [ErpStandardEntityForm, ErpReviewShowcaseControlPanel, ErpReviewShowcaseReferenceComparison, ErpStack, ErpSurface, ErpText, ErpButton, ErpEntityCustomFieldOutlet, ErpEntityCustomSectionOutlet, ErpEntityFormReviewTemplate],
  templateUrl: './standard-entity-form-showcase.html',
  styleUrl: './standard-entity-form-showcase.scss',
})
export class ErpStandardEntityFormShowcase {
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

  applyEntityFormValue(change: {nextValues: unknown}): void {
    this.liveValues.update((state) => ({...state, values: change.nextValues}));
    this.recordEvent('valueChanged', change);
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
