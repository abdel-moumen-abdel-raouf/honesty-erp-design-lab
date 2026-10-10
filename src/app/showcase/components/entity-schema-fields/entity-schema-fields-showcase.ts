import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpEntitySchemaFields} from '../../../controls/entity-form/entity-schema-fields';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpReviewShowcaseReferenceComparison} from '../../../review-internals/showcase-reference-comparison/showcase-reference-comparison';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';
import {ErpButton} from '../../../controls/button/button';
import {ErpEntityCustomFieldOutlet} from '../../../controls/entity-form/entity-form-outlets';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'entity-schema-fields')!;
const REVIEW_GALLERY_GROUPS = [
  {
    "id": "default",
    "label": "الحالة الافتراضية",
    "cases": [
      {
        "id": "default",
        "label": "الحالة الافتراضية",
        "inputs": {
          "fields": [
            {
              "key": "name",
              "kind": "text",
              "label": "اسم المورد",
              "description": "الاسم المسجل في المستندات",
              "required": true
            },
            {
              "key": "notes",
              "kind": "textarea",
              "label": "ملاحظات التوريد",
              "rows": 3
            },
            {
              "key": "password",
              "kind": "password",
              "label": "رمز بوابة المورد"
            },
            {
              "key": "website",
              "kind": "url",
              "label": "الموقع الإلكتروني"
            },
            {
              "key": "phone",
              "kind": "telephone",
              "label": "هاتف التواصل"
            },
            {
              "key": "employees",
              "kind": "number",
              "label": "عدد الموظفين",
              "min": 1,
              "max": 5000
            },
            {
              "key": "limit",
              "kind": "money",
              "label": "الحد الائتماني",
              "currency": "EGP",
              "min": 0
            },
            {
              "key": "taxable",
              "kind": "checkbox",
              "label": "خاضع للضريبة"
            },
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
              "key": "startDate",
              "kind": "date",
              "label": "تاريخ بدء التعامل"
            },
            {
              "key": "reviewTime",
              "kind": "time",
              "label": "وقت المراجعة",
              "minuteStep": 15
            },
            {
              "key": "updatedAt",
              "kind": "date-time",
              "label": "موعد التحديث"
            },
            {
              "key": "classification",
              "kind": "custom",
              "label": "تصنيف المورد",
              "outlet": "classification"
            }
          ],
          "values": {
            "name": "شركة النيل للتوريدات",
            "notes": "مورد معتمد للأصناف المكتبية",
            "password": "Secure-2026",
            "website": "https://honesty.example/suppliers/nile",
            "phone": "+201005550101",
            "employees": 120,
            "limit": 250000,
            "taxable": true,
            "type": "local",
            "branch": "cairo",
            "startDate": "2026-01-15",
            "reviewTime": "10:30",
            "updatedAt": "2026-10-10T12:00",
            "classification": "approved"
          },
          "issues": [
            {
              "key": "supplier-name-review",
              "message": "راجع الاسم القانوني قبل الحفظ.",
              "targetId": "name",
              "fieldLabel": "اسم المورد"
            }
          ]
        }
      }
    ]
  }
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-entity-schema-fields-showcase',
  imports: [ErpEntitySchemaFields, ErpReviewShowcaseControlPanel, ErpReviewShowcaseReferenceComparison, ErpStack, ErpSurface, ErpText, ErpButton, ErpEntityCustomFieldOutlet],
  templateUrl: './entity-schema-fields-showcase.html',
  styleUrl: './entity-schema-fields-showcase.scss',
})
export class ErpEntitySchemaFieldsShowcase {
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

  applyEntityFieldChange(change: {key: string; value: unknown}): void {
    const current = this.value('values');
    const values = current && typeof current === 'object' && !Array.isArray(current) ? current as Readonly<Record<string, unknown>> : {};
    this.liveValues.update((state) => ({...state, values: {...values, [change.key]: change.value}}));
    this.recordEvent('fieldValueChanged', change);
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
