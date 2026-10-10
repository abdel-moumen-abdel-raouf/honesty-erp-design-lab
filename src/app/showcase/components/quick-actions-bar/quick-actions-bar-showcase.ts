import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpQuickActionsBar} from '../../../controls/quick-actions-bar/quick-actions-bar';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpReviewShowcaseReferenceComparison} from '../../../review-internals/showcase-reference-comparison/showcase-reference-comparison';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'quick-actions-bar')!;
const REVIEW_GALLERY_GROUPS = [
  {
    "id": "default",
    "label": "الحالة الافتراضية",
    "cases": [
      {
        "id": "default",
        "label": "الحالة الافتراضية",
        "inputs": {
          "groups": [
            {
              "id": "daily",
              "label": "العمل اليومي",
              "actions": [
                {
                  "id": "task",
                  "label": "مهمة جديدة",
                  "icon": "add",
                  "priority": "primary"
                },
                {
                  "id": "event",
                  "label": "موعد جديد",
                  "icon": "calendar"
                }
              ]
            },
            {
              "id": "support",
              "label": "المساندة",
              "actions": [
                {
                  "id": "help",
                  "label": "المساعدة",
                  "icon": "help"
                },
                {
                  "id": "settings",
                  "label": "الإعدادات",
                  "icon": "settings",
                  "disabled": true
                }
              ]
            }
          ]
        }
      }
    ]
  }
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-quick-actions-bar-showcase',
  imports: [ErpQuickActionsBar, ErpReviewShowcaseControlPanel, ErpReviewShowcaseReferenceComparison, ErpStack, ErpSurface, ErpText],
  templateUrl: './quick-actions-bar-showcase.html',
  styleUrl: './quick-actions-bar-showcase.scss',
})
export class ErpQuickActionsBarShowcase {
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
