import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpReviewShowcaseReferenceComparison} from '../../../review-internals/showcase-reference-comparison/showcase-reference-comparison';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'stack')!;
const REVIEW_GALLERY_GROUPS = [
  {
    "id": "default",
    "label": "الحالة الافتراضية",
    "cases": [
      {
        "id": "default",
        "label": "الحالة الافتراضية",
        "inputs": {}
      }
    ]
  },
  {
    "id": "align",
    "label": "المحاذاة",
    "cases": [
      {
        "id": "align-stretch",
        "label": "ممتد (stretch)",
        "inputs": {
          "align": "stretch"
        }
      },
      {
        "id": "align-start",
        "label": "البداية (start)",
        "inputs": {
          "align": "start"
        }
      },
      {
        "id": "align-center",
        "label": "الوسط (center)",
        "inputs": {
          "align": "center"
        }
      },
      {
        "id": "align-end",
        "label": "النهاية (end)",
        "inputs": {
          "align": "end"
        }
      }
    ]
  },
  {
    "id": "justify",
    "label": "التوزيع الداخلي",
    "cases": [
      {
        "id": "justify-start",
        "label": "البداية (start)",
        "inputs": {
          "justify": "start"
        }
      },
      {
        "id": "justify-center",
        "label": "الوسط (center)",
        "inputs": {
          "justify": "center"
        }
      },
      {
        "id": "justify-end",
        "label": "النهاية (end)",
        "inputs": {
          "justify": "end"
        }
      },
      {
        "id": "justify-between",
        "label": "justify: between",
        "inputs": {
          "justify": "between"
        }
      }
    ]
  },
  {
    "id": "gap",
    "label": "الفجوات",
    "cases": [
      {
        "id": "gap-none",
        "label": "بدون (none)",
        "inputs": {
          "gap": "none"
        }
      },
      {
        "id": "gap-tight",
        "label": "gap: tight",
        "inputs": {
          "gap": "tight"
        }
      },
      {
        "id": "gap-default",
        "label": "افتراضي (default)",
        "inputs": {
          "gap": "default"
        }
      },
      {
        "id": "gap-loose",
        "label": "gap: loose",
        "inputs": {
          "gap": "loose"
        }
      }
    ]
  }
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-stack-showcase',
  imports: [ErpStack, ErpReviewShowcaseControlPanel, ErpReviewShowcaseReferenceComparison, ErpSurface, ErpText],
  templateUrl: './stack-showcase.html',
  styleUrl: './stack-showcase.scss',
})
export class ErpStackShowcase {
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
