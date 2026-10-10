import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpIcon} from '../../../primitives/icon/icon';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpReviewShowcaseReferenceComparison} from '../../../review-internals/showcase-reference-comparison/showcase-reference-comparison';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'icon')!;
const REVIEW_GALLERY_GROUPS = [
  {
    "id": "default",
    "label": "الحالة الافتراضية",
    "cases": [
      {
        "id": "default",
        "label": "الحالة الافتراضية",
        "inputs": {
          "name": "settings"
        }
      }
    ]
  },
  {
    "id": "tone",
    "label": "النبرات",
    "cases": [
      {
        "id": "tone-inherit",
        "label": "tone: inherit",
        "inputs": {
          "name": "settings",
          "tone": "inherit"
        }
      },
      {
        "id": "tone-primary",
        "label": "رئيسي (primary)",
        "inputs": {
          "name": "settings",
          "tone": "primary"
        }
      },
      {
        "id": "tone-secondary",
        "label": "tone: secondary",
        "inputs": {
          "name": "settings",
          "tone": "secondary"
        }
      },
      {
        "id": "tone-muted",
        "label": "tone: muted",
        "inputs": {
          "name": "settings",
          "tone": "muted"
        }
      },
      {
        "id": "tone-disabled",
        "label": "tone: disabled",
        "inputs": {
          "name": "settings",
          "tone": "disabled"
        }
      },
      {
        "id": "tone-inverse",
        "label": "tone: inverse",
        "inputs": {
          "name": "settings",
          "tone": "inverse"
        }
      },
      {
        "id": "tone-brand-primary",
        "label": "tone: brand-primary",
        "inputs": {
          "name": "settings",
          "tone": "brand-primary"
        }
      },
      {
        "id": "tone-brand-secondary",
        "label": "tone: brand-secondary",
        "inputs": {
          "name": "settings",
          "tone": "brand-secondary"
        }
      },
      {
        "id": "tone-brand-accent",
        "label": "tone: brand-accent",
        "inputs": {
          "name": "settings",
          "tone": "brand-accent"
        }
      },
      {
        "id": "tone-success",
        "label": "نجاح (success)",
        "inputs": {
          "name": "settings",
          "tone": "success"
        }
      },
      {
        "id": "tone-warning",
        "label": "تحذير (warning)",
        "inputs": {
          "name": "settings",
          "tone": "warning"
        }
      },
      {
        "id": "tone-danger",
        "label": "خطر (danger)",
        "inputs": {
          "name": "settings",
          "tone": "danger"
        }
      },
      {
        "id": "tone-info",
        "label": "معلومات (info)",
        "inputs": {
          "name": "settings",
          "tone": "info"
        }
      }
    ]
  }
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-icon-showcase',
  imports: [ErpIcon, ErpReviewShowcaseControlPanel, ErpReviewShowcaseReferenceComparison, ErpStack, ErpSurface, ErpText],
  templateUrl: './icon-showcase.html',
  styleUrl: './icon-showcase.scss',
})
export class ErpIconShowcase {
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
