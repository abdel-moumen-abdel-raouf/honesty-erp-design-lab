import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpEntityReview} from '../../../controls/entity-review/entity-review';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpReviewShowcaseReferenceComparison} from '../../../review-internals/showcase-reference-comparison/showcase-reference-comparison';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'entity-review')!;
const REVIEW_GALLERY_GROUPS = [
  {
    "id": "default",
    "label": "الحالة الافتراضية",
    "cases": [
      {
        "id": "default",
        "label": "الحالة الافتراضية",
        "inputs": {
          "context": {
            "$implicit": {
              "name": "شركة النيل للتوريدات",
              "active": true,
              "branch": "cairo",
              "limit": 250000
            },
            "values": {
              "name": "شركة النيل للتوريدات",
              "active": true,
              "branch": "cairo",
              "limit": 250000
            },
            "schema": {
              "id": "supplier-review",
              "label": "مراجعة المورد",
              "sections": [
                {
                  "kind": "fields",
                  "id": "identity",
                  "title": "بيانات المورد",
                  "description": "قيم ثابتة قبل الاعتماد",
                  "fields": [
                    {
                      "kind": "text",
                      "key": "name",
                      "label": "اسم المورد"
                    },
                    {
                      "kind": "checkbox",
                      "key": "active",
                      "label": "نشط"
                    },
                    {
                      "kind": "select",
                      "key": "branch",
                      "label": "الفرع",
                      "options": [
                        {
                          "value": "cairo",
                          "label": "القاهرة"
                        }
                      ]
                    },
                    {
                      "kind": "money",
                      "key": "limit",
                      "label": "الحد الائتماني",
                      "currency": "EGP"
                    }
                  ]
                }
              ],
              "steps": [
                {
                  "id": "review",
                  "label": "المراجعة",
                  "sectionIds": [
                    "identity"
                  ],
                  "review": true
                }
              ],
              "actions": {
                "submitLabel": "اعتماد"
              }
            },
            "step": {
              "id": "review",
              "label": "المراجعة",
              "sectionIds": [
                "identity"
              ],
              "review": true
            }
          }
        }
      }
    ]
  },
  {
    "id": "compact",
    "label": "الكثافة",
    "cases": [
      {
        "id": "compact-true",
        "label": "مفعّل (true)",
        "inputs": {
          "compact": true
        }
      }
    ]
  }
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-entity-review-showcase',
  imports: [ErpEntityReview, ErpReviewShowcaseControlPanel, ErpReviewShowcaseReferenceComparison, ErpStack, ErpSurface, ErpText],
  templateUrl: './entity-review-showcase.html',
  styleUrl: './entity-review-showcase.scss',
})
export class ErpEntityReviewShowcase {
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
