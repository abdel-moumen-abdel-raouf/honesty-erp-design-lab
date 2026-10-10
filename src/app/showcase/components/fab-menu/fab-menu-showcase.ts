import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpFabMenu} from '../../../controls/fab-menu/fab-menu';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpReviewShowcaseReferenceComparison} from '../../../review-internals/showcase-reference-comparison/showcase-reference-comparison';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';
import {ErpReviewShowcaseFloatingPreview} from '../../../review-internals/showcase-floating-preview/showcase-floating-preview';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'fab-menu')!;
const REVIEW_GALLERY_GROUPS = [
  {
    "id": "default",
    "label": "الحالة الافتراضية",
    "cases": [
      {
        "id": "default",
        "label": "الحالة الافتراضية",
        "inputs": {
          "label": "إجراءات سريعة",
          "items": [
            {
              "value": "add",
              "label": "إضافة",
              "icon": "add",
              "presentation": "icon"
            },
            {
              "value": "save",
              "label": "حفظ",
              "presentation": "text"
            },
            {
              "value": "share",
              "label": "مشاركة",
              "icon": "copy",
              "presentation": "icon-text"
            },
            {
              "value": "archive",
              "label": "أرشفة",
              "icon": "layers",
              "presentation": "icon-text"
            },
            {
              "value": "delete",
              "label": "حذف",
              "icon": "delete",
              "presentation": "icon-text",
              "disabled": true
            }
          ]
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
          "label": "إجراءات سريعة",
          "items": [
            {
              "value": "add",
              "label": "إضافة",
              "icon": "add",
              "presentation": "icon"
            },
            {
              "value": "save",
              "label": "حفظ",
              "presentation": "text"
            },
            {
              "value": "share",
              "label": "مشاركة",
              "icon": "copy",
              "presentation": "icon-text"
            },
            {
              "value": "archive",
              "label": "أرشفة",
              "icon": "layers",
              "presentation": "icon-text"
            },
            {
              "value": "delete",
              "label": "حذف",
              "icon": "delete",
              "presentation": "icon-text",
              "disabled": true
            }
          ],
          "disabled": false
        }
      },
      {
        "id": "disabled-true",
        "label": "مفعّل (true)",
        "inputs": {
          "label": "إجراءات سريعة",
          "items": [
            {
              "value": "add",
              "label": "إضافة",
              "icon": "add",
              "presentation": "icon"
            },
            {
              "value": "save",
              "label": "حفظ",
              "presentation": "text"
            },
            {
              "value": "share",
              "label": "مشاركة",
              "icon": "copy",
              "presentation": "icon-text"
            },
            {
              "value": "archive",
              "label": "أرشفة",
              "icon": "layers",
              "presentation": "icon-text"
            },
            {
              "value": "delete",
              "label": "حذف",
              "icon": "delete",
              "presentation": "icon-text",
              "disabled": true
            }
          ],
          "disabled": true
        }
      }
    ]
  },
  {
    "id": "placement",
    "label": "المواضع",
    "cases": [
      {
        "id": "placement-block-start",
        "label": "placement: block-start",
        "inputs": {
          "label": "إجراءات سريعة",
          "items": [
            {
              "value": "add",
              "label": "إضافة",
              "icon": "add",
              "presentation": "icon"
            },
            {
              "value": "save",
              "label": "حفظ",
              "presentation": "text"
            },
            {
              "value": "share",
              "label": "مشاركة",
              "icon": "copy",
              "presentation": "icon-text"
            },
            {
              "value": "archive",
              "label": "أرشفة",
              "icon": "layers",
              "presentation": "icon-text"
            },
            {
              "value": "delete",
              "label": "حذف",
              "icon": "delete",
              "presentation": "icon-text",
              "disabled": true
            }
          ],
          "placement": "block-start"
        }
      },
      {
        "id": "placement-block-end",
        "label": "placement: block-end",
        "inputs": {
          "label": "إجراءات سريعة",
          "items": [
            {
              "value": "add",
              "label": "إضافة",
              "icon": "add",
              "presentation": "icon"
            },
            {
              "value": "save",
              "label": "حفظ",
              "presentation": "text"
            },
            {
              "value": "share",
              "label": "مشاركة",
              "icon": "copy",
              "presentation": "icon-text"
            },
            {
              "value": "archive",
              "label": "أرشفة",
              "icon": "layers",
              "presentation": "icon-text"
            },
            {
              "value": "delete",
              "label": "حذف",
              "icon": "delete",
              "presentation": "icon-text",
              "disabled": true
            }
          ],
          "placement": "block-end"
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
          "label": "إجراءات سريعة",
          "items": [
            {
              "value": "add",
              "label": "إضافة",
              "icon": "add",
              "presentation": "icon"
            },
            {
              "value": "save",
              "label": "حفظ",
              "presentation": "text"
            },
            {
              "value": "share",
              "label": "مشاركة",
              "icon": "copy",
              "presentation": "icon-text"
            },
            {
              "value": "archive",
              "label": "أرشفة",
              "icon": "layers",
              "presentation": "icon-text"
            },
            {
              "value": "delete",
              "label": "حذف",
              "icon": "delete",
              "presentation": "icon-text",
              "disabled": true
            }
          ],
          "disabled": true
        }
      }
    ]
  }
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-fab-menu-showcase',
  imports: [ErpFabMenu, ErpReviewShowcaseControlPanel, ErpReviewShowcaseReferenceComparison, ErpStack, ErpSurface, ErpText, ErpReviewShowcaseFloatingPreview],
  templateUrl: './fab-menu-showcase.html',
  styleUrl: './fab-menu-showcase.scss',
})
export class ErpFabMenuShowcase {
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
  readonly previewDirection = computed(() => this.liveValues()['$previewDirection'] === 'ltr' ? 'ltr' : 'rtl');

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
