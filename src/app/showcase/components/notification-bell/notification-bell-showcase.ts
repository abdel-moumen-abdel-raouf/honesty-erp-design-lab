import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpNotificationBell} from '../../../controls/notification-bell/notification-bell';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpReviewShowcaseReferenceComparison} from '../../../review-internals/showcase-reference-comparison/showcase-reference-comparison';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';
import {ErpButton} from '../../../controls/button/button';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'notification-bell')!;
const REVIEW_GALLERY_GROUPS = [
  {
    "id": "default",
    "label": "الحالة الافتراضية",
    "cases": [
      {
        "id": "default",
        "label": "الحالة الافتراضية",
        "inputs": {
          "notifications": [
            {
              "id": "stock",
              "title": "حد إعادة الطلب",
              "description": "وصل صنفان في فرع القاهرة إلى الحد الأدنى.",
              "timestamp": "منذ دقيقتين",
              "icon": "inventory",
              "read": false
            },
            {
              "id": "approval",
              "title": "فاتورة تحتاج اعتمادًا",
              "description": "فاتورة المبيعات رقم 1042 بانتظار موافقتك.",
              "timestamp": "منذ 14 دقيقة",
              "icon": "file",
              "read": false
            },
            {
              "id": "ledger",
              "title": "تم ترحيل القيد",
              "description": "رُحّل القيد اليومي إلى الحسابات العامة.",
              "timestamp": "منذ ساعة",
              "icon": "check-mark",
              "read": true
            },
            {
              "id": "disabled",
              "title": "إشعار مؤرشف",
              "description": "هذا الإشعار غير متاح.",
              "timestamp": "أمس",
              "icon": "notification",
              "read": true,
              "disabled": true
            }
          ],
          "open": true,
          "query": ""
        }
      }
    ]
  },
  {
    "id": "searchable",
    "label": "البحث",
    "cases": [
      {
        "id": "searchable-false",
        "label": "غير مفعّل (false)",
        "inputs": {
          "searchable": false
        }
      }
    ]
  },
  {
    "id": "open",
    "label": "السطح المفتوح",
    "cases": [
      {
        "id": "open-preview",
        "label": "فتح السطح عند الطلب",
        "inputs": {
          "$galleryOpenable": true
        }
      }
    ]
  },
  {
    "id": "authored-scenarios",
    "label": "سيناريوهات مراجعة مقصودة",
    "cases": [
      {
        "id": "empty-notifications",
        "label": "لا توجد إشعارات",
        "inputs": {
          "notifications": [],
          "unreadCount": 0
        }
      },
      {
        "id": "long-notification",
        "label": "إشعار تشغيلي طويل",
        "inputs": {
          "notifications": [
            {
              "id": "long",
              "title": "مراجعة حدود إعادة الطلب للفروع",
              "description": "تحتاج ثمانية أصناف في فرعي القاهرة والإسكندرية إلى مراجعة حدود إعادة الطلب قبل تشغيل دورة المشتريات التالية.",
              "timestamp": "منذ 8 دقائق",
              "icon": "inventory",
              "read": false
            }
          ]
        }
      }
    ]
  }
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-notification-bell-showcase',
  imports: [ErpNotificationBell, ErpReviewShowcaseControlPanel, ErpReviewShowcaseReferenceComparison, ErpStack, ErpSurface, ErpText, ErpButton],
  templateUrl: './notification-bell-showcase.html',
  styleUrl: './notification-bell-showcase.scss',
})
export class ErpNotificationBellShowcase {
  readonly entry = ENTRY;
  readonly controls = ENTRY.showcaseControls;
  readonly galleryGroups = REVIEW_GALLERY_GROUPS;
  readonly lastEvent = signal('لم يحدث تفاعل بعد');
  readonly galleryOpenCase = signal<string | null>(null);
  readonly liveValues = signal<Readonly<Record<string, unknown>>>({...ENTRY.showcaseInitialValues, open: false});
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

  galleryValue(showcaseCase: {readonly id: string; readonly inputs: Readonly<Record<string, unknown>>}, name: string): unknown {
    if (name === 'open') return this.galleryOpenCase() === showcaseCase.id;
    return Object.prototype.hasOwnProperty.call(showcaseCase.inputs, name)
      ? showcaseCase.inputs[name]
      : ENTRY.showcaseInitialValues?.[name];
  }

  galleryIsOpen(id: string): boolean {
    return this.galleryOpenCase() === id;
  }

  toggleGalleryOverlay(id: string): void {
    this.galleryOpenCase.update((current) => current === id ? null : id);
  }

  recordGalleryOpen(id: string, open: boolean): void {
    this.galleryOpenCase.set(open ? id : null);
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
