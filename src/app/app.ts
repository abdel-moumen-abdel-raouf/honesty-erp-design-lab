import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {
  Router,
  RouterOutlet,
} from '@angular/router';
import {ErpOverlayHost} from './shared/overlay/overlay-host';
import {ERP_COMPONENT_NAVIGATION} from './catalog/erp-component-navigation.generated';
import {ErpAppShell} from './controls/app-shell/app-shell';
import {ErpApplicationsMenu} from './controls/applications-menu/applications-menu';
import {ErpBranchSelector} from './controls/branch-selector/branch-selector';
import {ErpButton} from './controls/button/button';
import {ErpGlobalSearch} from './controls/global-search/global-search';
import {ErpIconButton} from './controls/icon-button/icon-button';
import {ErpMessagesMenu} from './controls/messages-menu/messages-menu';
import {ErpNotificationBell} from './controls/notification-bell/notification-bell';
import {
  ErpApplicationMenuGroup,
  ErpMessageSummary,
  ErpNavigationItem,
  ErpNotificationSummary,
  ErpShellUserSummary,
  ErpUserMenuItem,
} from './controls/shell-family/shell-contracts';
import {ErpQuickActionGroup} from './controls/quick-actions-bar/quick-actions-bar';
import {ErpTooltip} from './controls/tooltip/tooltip';
import {ErpUserMenu} from './controls/user-menu/user-menu';
import {ErpText} from './primitives/text/text';
import {ErpIconName} from './primitives/icon/icon-contracts';
import {ErpInline} from './primitives/inline/inline';

export type LabTheme = 'light' | 'dark';

const LAB_THEME_STORAGE_KEY = 'honesty-lab-theme';

const CATEGORY_PRESENTATION: Readonly<Record<string, Readonly<{label: string; icon: ErpIconName}>>> = {
  Actions: {label: 'الإجراءات', icon: 'operations'},
  'Application Shell': {label: 'إطار التطبيق', icon: 'dashboard'},
  'Data / Tables': {label: 'البيانات والجداول', icon: 'layers'},
  'Feedback / Status': {label: 'الملاحظات والحالات', icon: 'notification'},
  Forms: {label: 'النماذج', icon: 'file'},
  'Inputs / Fields': {label: 'الحقول والمدخلات', icon: 'edit'},
  'Media / Identity': {label: 'الهوية والوسائط', icon: 'user'},
  Navigation: {label: 'التنقل', icon: 'menu'},
  'Page Composition': {label: 'تكوين الصفحات', icon: 'folder'},
  Primitives: {label: 'البدائيات', icon: 'layers'},
  Selection: {label: 'الاختيار', icon: 'check-mark'},
};

function buildLabNavigation(): readonly ErpNavigationItem[] {
  const categories = new Map<string, ErpNavigationItem[]>();
  for (const entry of ERP_COMPONENT_NAVIGATION) {
    const items = categories.get(entry.category) ?? [];
    items.push({id: entry.id, label: entry.displayNameAr, href: entry.showcaseRoute});
    categories.set(entry.category, items);
  }
  return [...categories].map(([category, children]) => ({
    id: `category-${category.toLocaleLowerCase().replace(/[^a-z]+/g, '-')}`,
    label: CATEGORY_PRESENTATION[category]?.label ?? category,
    icon: CATEGORY_PRESENTATION[category]?.icon ?? 'folder',
    children,
  }));
}

export function resolveLabTheme(
  storage: Pick<Storage, 'getItem'> | null,
): LabTheme {
  try {
    const storedTheme = storage?.getItem(LAB_THEME_STORAGE_KEY);
    return storedTheme === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function persistLabTheme(
  theme: LabTheme,
  storage: Pick<Storage, 'setItem'> | null,
): void {
  try {
    storage?.setItem(LAB_THEME_STORAGE_KEY, theme);
  } catch {
    // Design Lab theme persistence is optional when storage is unavailable.
  }
}

export function buildScreenshotFilename(routerUrl: string, theme: LabTheme): string {
  const currentUrl = routerUrl.split('?')[0].split('#')[0];
  const cleanPath =
    currentUrl
      .replace(/^\/+/, '')
      .replace(/\/+$/, '')
      .replace(/\//g, '-') || 'foundation-review';

  return `${cleanPath}-${theme}-view.png`;
}

export function resolveLabScreenshotTarget(
  rootDocument: Document,
): HTMLElement | null {
  return rootDocument.getElementById('lab-capture-root');
}

/**
 * Checks if a CSS color value represents a fully transparent color.
 * Partially transparent colors (alpha > 0) are NOT considered fully transparent.
 */
export function isFullyTransparent(color: string | null | undefined): boolean {
  if (!color) {
    return true;
  }
  const normalized = color.trim().toLowerCase();
  if (normalized === 'transparent' || normalized === '' || normalized === 'none') {
    return true;
  }

  // Handle rgba(r, g, b, a) or rgb(r g b / a) with alpha === 0
  const rgbaMatch = normalized.match(
    /^rgba?\(\s*[\d.]+%?\s*[, ]\s*[\d.]+%?\s*[, ]\s*[\d.]+%?(?:\s*[,/]\s*([\d.]+%?)\s*)?\)$/
  );
  if (rgbaMatch && rgbaMatch[1] !== undefined) {
    const alphaStr = rgbaMatch[1];
    const alpha = alphaStr.endsWith('%')
      ? parseFloat(alphaStr) / 100
      : parseFloat(alphaStr);
    return alpha === 0;
  }

  return false;
}

/**
 * Resolves the actual visible page background color at capture time:
 * 1. Inspect target's computed background color.
 * 2. If transparent, walk through its ancestors until a non-transparent computed background is found.
 * 3. If still transparent, inspect the target document's body and documentElement.
 * 4. Fallback to '#ffffff' ONLY if all relevant computed backgrounds are transparent.
 */
export function resolveVisibleBackgroundColor(target: HTMLElement): string {
  const targetDocument = target.ownerDocument;
  const targetWindow = targetDocument.defaultView;

  if (targetWindow && typeof targetWindow.getComputedStyle === 'function') {
    let current: HTMLElement | null = target;

    while (current) {
      const background = targetWindow.getComputedStyle(current).backgroundColor;
      if (!isFullyTransparent(background)) {
        return background;
      }
      current = current.parentElement;
    }

    if (targetDocument.body) {
      const bodyBackground = targetWindow.getComputedStyle(targetDocument.body).backgroundColor;
      if (!isFullyTransparent(bodyBackground)) {
        return bodyBackground;
      }
    }

    if (targetDocument.documentElement) {
      const documentBackground = targetWindow.getComputedStyle(
        targetDocument.documentElement,
      ).backgroundColor;
      if (!isFullyTransparent(documentBackground)) {
        return documentBackground;
      }
    }
  }

  return '#ffffff';
}

const SCREENSHOT_SRGB_COLOR_PATTERN =
  /color\(\s*srgb\s+(-?(?:\d+\.?\d*|\.\d+))\s+(-?(?:\d+\.?\d*|\.\d+))\s+(-?(?:\d+\.?\d*|\.\d+))(?:\s*\/\s*(-?(?:\d+\.?\d*|\.\d+)))?\s*\)/gi;

export function normalizeScreenshotColorFunctions(value: string): string {
  return value.replace(
    SCREENSHOT_SRGB_COLOR_PATTERN,
    (_match, red: string, green: string, blue: string, alpha?: string) => {
      const channel = (component: string) =>
        Math.round(Math.min(1, Math.max(0, Number.parseFloat(component))) * 255);
      const resolvedAlpha = Math.min(
        1,
        Math.max(0, alpha === undefined ? 1 : Number.parseFloat(alpha)),
      );

      return `rgba(${channel(red)}, ${channel(green)}, ${channel(blue)}, ${resolvedAlpha})`;
    },
  );
}

export function normalizeScreenshotCloneColors(root: HTMLElement): void {
  const targetWindow = root.ownerDocument.defaultView;

  if (!targetWindow) {
    return;
  }

  for (const element of [root, ...root.querySelectorAll<HTMLElement>('*')]) {
    const style = targetWindow.getComputedStyle(element);

    for (let index = 0; index < style.length; index += 1) {
      const property = style.item(index);
      const value = style.getPropertyValue(property);
      const normalized = normalizeScreenshotColorFunctions(value);

      if (normalized !== value) {
        element.style.setProperty(property, normalized, 'important');
      }
    }
  }
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ErpAppShell,
    ErpApplicationsMenu,
    ErpBranchSelector,
    ErpButton,
    ErpGlobalSearch,
    ErpIconButton,
    ErpInline,
    ErpMessagesMenu,
    ErpNotificationBell,
    ErpOverlayHost,
    ErpText,
    ErpTooltip,
    ErpUserMenu,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly router = inject(Router);
  private readonly storage = this.resolveStorage();
  private readonly routeEvent = toSignal(this.router.events, {initialValue: null});

  readonly theme = signal<LabTheme>(resolveLabTheme(this.storage));
  readonly isCapturing = signal(false);
  readonly statusMessage = signal<string | null>(null);
  readonly hasError = signal(false);
  readonly sidebarOpen = signal(false);
  readonly catalogOpen = this.sidebarOpen;
  readonly sidebarCollapsed = signal(false);
  readonly navigationItems = buildLabNavigation();
  readonly activeNavigationId = computed(() => {
    this.routeEvent();
    const path = this.router.url.split(/[?#]/, 1)[0];
    return ERP_COMPONENT_NAVIGATION.find((entry) => entry.showcaseRoute === path)?.id ?? null;
  });

  readonly branches = [
    {id: 'cairo', label: 'فرع القاهرة', description: 'المركز الرئيسي'},
    {id: 'alexandria', label: 'فرع الإسكندرية'},
    {id: 'warehouse', label: 'مخازن العبور'},
  ] as const;
  readonly branchId = signal<string | null>('cairo');
  readonly searchResults = [
    {id: 'invoice-1042', label: 'فاتورة 1042', category: 'المبيعات', description: 'شركة النور للتجارة', icon: 'file' as const},
    {id: 'component-table', label: 'الجدول', category: 'مكوّنات النظام', description: 'مرجع الجدول التفاعلي', icon: 'layers' as const},
    {id: 'component-tabs', label: 'علامات التبويب', category: 'مكوّنات النظام', icon: 'folder' as const},
  ] as const;
  readonly applicationGroups: readonly ErpApplicationMenuGroup[] = [{
    id: 'erp-apps',
    label: 'تطبيقات Honesty ERP',
    items: [
      {id: 'sales', label: 'المبيعات', icon: 'shopping-cart'},
      {id: 'purchases', label: 'المشتريات', icon: 'handshake'},
      {id: 'inventory', label: 'المخزون', icon: 'inventory', badge: {label: '3'}},
      {id: 'finance', label: 'الحسابات', icon: 'wallet'},
      {id: 'customers', label: 'العملاء', icon: 'customer'},
      {id: 'reports', label: 'التقارير', icon: 'chart'},
      {id: 'people', label: 'الموارد البشرية', icon: 'people'},
      {id: 'operations', label: 'العمليات', icon: 'operations'},
      {id: 'settings', label: 'الإعدادات', icon: 'settings'},
    ],
  }];
  readonly messages: readonly ErpMessageSummary[] = [
    {id: 'invoice', senderName: 'أميرة حداد', preview: 'تم اعتماد فاتورة المبيعات رقم 1042.', timestamp: 'منذ دقيقة', avatarSrc: '/assets/honesty-erp-avatars/users/female/avatar-21.png', read: false},
    {id: 'stock', senderName: 'عمر ناصر', preview: 'تم تحديث كميات المخزون في الفرع الرئيسي.', timestamp: 'منذ 18 دقيقة', avatarSrc: '/assets/honesty-erp-avatars/users/male/avatar-01.png', read: false},
    {id: 'purchase', senderName: 'ليلى محمود', preview: 'أضيف طلب شراء جديد بانتظار المراجعة.', timestamp: 'منذ ساعة', avatarSrc: '/assets/honesty-erp-avatars/users/female/avatar-22.png', read: true},
  ];
  readonly notifications: readonly ErpNotificationSummary[] = [
    {id: 'minimum-stock', title: 'حد إعادة الطلب', description: 'وصل صنفان إلى الحد الأدنى في فرع القاهرة.', timestamp: 'منذ دقيقتين', icon: 'inventory', read: false},
    {id: 'pending-invoice', title: 'فاتورة تحتاج اعتمادًا', description: 'فاتورة المبيعات 1042 بانتظار موافقتك.', timestamp: 'منذ 14 دقيقة', icon: 'file', read: false},
    {id: 'posted-ledger', title: 'تم ترحيل القيد', description: 'رُحّل القيد إلى الحسابات العامة.', timestamp: 'منذ ساعة', icon: 'check-mark', read: true},
  ];
  readonly user: ErpShellUserSummary = {
    displayName: 'أميرة حداد',
    email: 'amira.haddad@honesty-erp.com',
    roleLabel: 'مديرة المالية',
    branchLabel: 'القاهرة',
    secondaryText: 'الحساب المؤسسي',
    avatarSrc: '/assets/honesty-erp-avatars/users/female/avatar-21.png',
    avatarPresence: 'online',
  };
  readonly userItems: readonly ErpUserMenuItem[] = [
    {id: 'profile', label: 'الملف الشخصي', icon: 'user'},
    {id: 'settings', label: 'الإعدادات', icon: 'settings'},
    {id: 'sign-out', label: 'تسجيل الخروج', icon: 'logout', tone: 'danger', dividerBefore: true},
  ];
  readonly quickActions: readonly ErpQuickActionGroup[] = [
    {id: 'daily', label: 'سريع', actions: [
      {id: 'new-task', label: 'مهمة جديدة', icon: 'add', priority: 'primary'},
      {id: 'calendar', label: 'الأحداث', icon: 'calendar'},
      {id: 'help', label: 'المساعدة', icon: 'help'},
      {id: 'settings', label: 'الإعدادات', icon: 'settings'},
    ]},
  ];
  readonly footer = {
    applicationLabel: 'Honesty ERP Design Lab',
    versionLabel: 'Shell Candidate 2026.10',
    statusLabel: 'بيئة المراجعة متصلة',
    statusTone: 'success' as const,
    actions: [{id: 'documentation', label: 'التوثيق', icon: 'external-link' as const}],
  };

  toggleTheme(): void {
    const theme = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(theme);
    persistLabTheme(theme, this.storage);
  }

  toggleCatalog(): void {
    this.sidebarOpen.update((open) => !open);
  }

  closeCatalog(): void {
    this.sidebarOpen.set(false);
  }

  navigate(item: ErpNavigationItem): void {
    if (item.href && !item.disabled) {
      void this.router.navigateByUrl(item.href);
      this.closeCatalog();
    }
  }

  activateSearchResult(resultId: string): void {
    if (resultId === 'component-table') void this.router.navigateByUrl('/components/table');
    if (resultId === 'component-tabs') void this.router.navigateByUrl('/components/tabs');
  }

  async captureScreenshot(): Promise<void> {
    if (this.isCapturing()) {
      return;
    }

    const target = resolveLabScreenshotTarget(document);

    if (!target) {
      this.hasError.set(true);
      this.statusMessage.set('تعذر العثور على محتوى الصفحة');
      return;
    }

    this.isCapturing.set(true);
    this.hasError.set(false);
    this.statusMessage.set('جاري الالتقاط...');

    try {
      const {default: html2canvas} = await import('html2canvas/dist/html2canvas.esm.js');
      const width = target.scrollWidth;
      const height = target.scrollHeight;
      const targetWindow = target.ownerDocument.defaultView;

      const canvas = await html2canvas(target, {
        scale: 1,
        width,
        height,
        windowWidth: targetWindow?.innerWidth ?? width,
        windowHeight: targetWindow?.innerHeight ?? height,
        scrollX: 0,
        scrollY: 0,
        useCORS: true,
        backgroundColor: resolveVisibleBackgroundColor(target),
        onclone: (_clonedDocument, clonedElement) => {
          normalizeScreenshotCloneColors(clonedElement);
        },
      });

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = buildScreenshotFilename(this.router.url, this.theme());
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      this.statusMessage.set(null);
    } catch (error) {
      console.error('Screenshot capture failed:', error);
      this.hasError.set(true);
      this.statusMessage.set('فشل التقاط الصفحة');
    } finally {
      this.isCapturing.set(false);
    }
  }

  private resolveStorage(): Storage | null {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      return window.localStorage;
    } catch {
      return null;
    }
  }
}
