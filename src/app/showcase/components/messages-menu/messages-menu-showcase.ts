import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpMessagesMenu} from '../../../controls/messages-menu/messages-menu';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpReviewShowcaseReferenceComparison} from '../../../review-internals/showcase-reference-comparison/showcase-reference-comparison';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';
import {ErpButton} from '../../../controls/button/button';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'messages-menu')!;
const REVIEW_GALLERY_GROUPS = [
  {
    "id": "default",
    "label": "الحالة الافتراضية",
    "cases": [
      {
        "id": "default",
        "label": "الحالة الافتراضية",
        "inputs": {
          "messages": [
            {
              "id": "invoice",
              "senderName": "أميرة حداد",
              "preview": "تم اعتماد فاتورة المبيعات رقم 1042.",
              "timestamp": "منذ دقيقة",
              "avatarSrc": "/assets/honesty-erp-avatars/users/female/avatar-21.png",
              "read": false
            },
            {
              "id": "stock",
              "senderName": "عمر ناصر",
              "preview": "تم تحديث كميات المخزون في الفرع الرئيسي.",
              "timestamp": "منذ 18 دقيقة",
              "avatarSrc": "/assets/honesty-erp-avatars/users/male/avatar-01.png",
              "read": false
            },
            {
              "id": "purchase",
              "senderName": "ليلى محمود",
              "preview": "أضيف طلب شراء جديد بانتظار المراجعة.",
              "timestamp": "منذ ساعة",
              "avatarSrc": "/assets/honesty-erp-avatars/users/female/avatar-22.png",
              "read": true
            },
            {
              "id": "disabled",
              "senderName": "النظام",
              "preview": "رسالة مؤرشفة وغير متاحة.",
              "timestamp": "أمس",
              "fallbackIcon": "mail",
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
        "id": "empty-messages",
        "label": "لا توجد رسائل",
        "inputs": {
          "messages": [],
          "unreadCount": 0
        }
      },
      {
        "id": "long-message",
        "label": "رسالة عربية طويلة",
        "inputs": {
          "messages": [
            {
              "id": "long",
              "senderName": "إدارة المشتريات والعقود طويلة الأجل",
              "preview": "تحتاج اتفاقية التوريد السنوية إلى مراجعة البنود المالية واعتماد جدول التسليم المحدث قبل نهاية فترة العمل الحالية.",
              "timestamp": "منذ 5 دقائق",
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
  selector: 'app-messages-menu-showcase',
  imports: [ErpMessagesMenu, ErpReviewShowcaseControlPanel, ErpReviewShowcaseReferenceComparison, ErpStack, ErpSurface, ErpText, ErpButton],
  templateUrl: './messages-menu-showcase.html',
  styleUrl: './messages-menu-showcase.scss',
})
export class ErpMessagesMenuShowcase {
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
