import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpTopbar} from '../../../controls/topbar/topbar';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';
import {ErpBranchSelector} from '../../../controls/branch-selector/branch-selector';
import {ErpGlobalSearch} from '../../../controls/global-search/global-search';
import {ErpNotificationBell} from '../../../controls/notification-bell/notification-bell';
import {ErpUserMenu} from '../../../controls/user-menu/user-menu';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'topbar')!;
const TOPBAR_BRANCHES = [{id: 'cairo', label: 'فرع القاهرة'}, {id: 'alexandria', label: 'فرع الإسكندرية'}] as const;
const TOPBAR_SEARCH_RESULTS = [{id: 'invoice-1042', label: 'فاتورة 1042', category: 'المبيعات', icon: 'file'}] as const;
const TOPBAR_NOTIFICATIONS = [{id: 'stock', title: 'تنبيه مخزون', description: 'وصل صنفان إلى حد إعادة الطلب', icon: 'notification'}] as const;
const TOPBAR_USER = {displayName: 'أميرة حداد', email: 'amira@honesty.local', roleLabel: 'مديرة المالية', branchLabel: 'القاهرة', avatarSrc: '/assets/honesty-erp-avatars/users/female/avatar-21.png', avatarPresence: 'online'} as const;
const TOPBAR_USER_ITEMS = [{id: 'profile', label: 'الملف الشخصي', icon: 'user'}, {id: 'sign-out', label: 'تسجيل الخروج', icon: 'logout'}] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-topbar-showcase',
  imports: [ErpTopbar, ErpReviewShowcaseControlPanel, ErpStack, ErpSurface, ErpText, ErpBranchSelector, ErpGlobalSearch, ErpNotificationBell, ErpUserMenu],
  templateUrl: './topbar-showcase.html',
  styleUrl: './topbar-showcase.scss',
})
export class ErpTopbarShowcase {
  readonly entry = ENTRY;
  readonly controls = ENTRY.showcaseControls;
  readonly lastEvent = signal('لم يحدث تفاعل بعد');
  readonly liveValues = signal<Readonly<Record<string, unknown>>>({...ENTRY.showcaseInitialValues});
  readonly cvaValue = signal<unknown>(null);
  readonly topbarBranches = TOPBAR_BRANCHES;
  readonly topbarSearchResults = TOPBAR_SEARCH_RESULTS;
  readonly topbarNotifications = TOPBAR_NOTIFICATIONS;
  readonly topbarUser = TOPBAR_USER;
  readonly topbarUserItems = TOPBAR_USER_ITEMS;
  readonly controlValues = computed<Readonly<Record<string, unknown>>>(() => ({
    ...this.liveValues(),
    '$value': this.cvaValue(),
  }));

  readonly previewInline = computed(() => Number(this.liveValues()['$previewInline'] ?? 80));
  readonly previewBlock = computed(() => Number(this.liveValues()['$previewBlock'] ?? 75));

  value(name: string): unknown {
    return this.liveValues()[name];
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
