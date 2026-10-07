import {TestBed} from '@angular/core/testing';
import {ErpAvatarPicker} from '../../controls/avatar-picker/avatar-picker';
import {CoreBatch} from './core-batch';

describe('CoreBatch', () => {
  beforeEach(() => {
    // AvatarPicker owns and tests its 40-item Avatar composition independently.
    // Keep this route test focused on review-surface authoring without rendering
    // five duplicate catalogs for every route-level assertion.
    TestBed.overrideComponent(ErpAvatarPicker, {
      set: {template: '', styleUrls: []},
    });
  });

  it('renders the nine corrected owners on the grouped review surface', () => {
    const fixture = TestBed.createComponent(CoreBatch);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('erp-section')).toHaveLength(9);
    expect(fixture.nativeElement.querySelector('erp-select')).not.toBeNull();
    expect(
      fixture.nativeElement.querySelector(
        'erp-select[searchable][groupBy="group"]',
      ),
    ).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-select[multiple][selectAll]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-select[selectAppearance="filled"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-select[selectAppearance="ghost"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-select[sortMode="label"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-select[label="نتيجة فارغة"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-select[label="حالة غير صالحة"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelectorAll('.select-parity-matrix erp-select'))
      .toHaveLength(6);
    expect(fixture.nativeElement.querySelectorAll('[data-select-direction-evidence] erp-select'))
      .toHaveLength(2);
    expect(fixture.nativeElement.querySelectorAll('erp-avatar-picker')).toHaveLength(5);
    expect(
      fixture.nativeElement.querySelector(
        '.avatar-picker-reference-matrix erp-avatar-picker[data-avatar-picker-size="compact"]',
      ),
    ).not.toBeNull();
    expect(
      fixture.nativeElement.querySelector(
        '[data-avatar-picker-direction-evidence="ltr"] erp-avatar-picker',
      ),
    ).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-review-core-table erp-table')).not.toBeNull();
    const tableEvidence = fixture.nativeElement.querySelector(
      'erp-review-core-table [data-table-reference-evidence="exact"]',
    ) as HTMLElement;
    expect(tableEvidence.getAttribute('dir')).toBe('rtl');
    expect(tableEvidence.querySelectorAll('[data-table-specimen]')).toHaveLength(6);
    expect(tableEvidence.querySelector('[data-table-specimen="fixed-height"] erp-table[data-table-fixed="true"]')).not.toBeNull();
    expect(tableEvidence.querySelector('[data-table-specimen="compact"] erp-table[data-table-density="compact"]')).not.toBeNull();
    expect(tableEvidence.querySelector('[data-table-specimen="vertical"] erp-table[data-table-layout="vertical"]')).not.toBeNull();
    expect(tableEvidence.textContent).toContain('دليل الحسابات');
    expect(tableEvidence.textContent).not.toMatch(/Full-featured|Fixed-height|Compact density|Clickable rows|Vertical layout|Header content/);
    const tableLtrCompatibility = fixture.nativeElement.querySelector(
      'erp-review-core-table [data-table-direction-evidence="ltr"]',
    ) as HTMLElement;
    expect(tableLtrCompatibility.getAttribute('dir')).toBe('ltr');
    expect(
      tableEvidence.querySelectorAll(
        '[data-table-specimen="full-featured"] erp-table erp-avatar',
      ),
    ).toHaveLength(5);
    expect(
      tableEvidence.querySelectorAll(
        '[data-table-specimen="full-featured"] erp-table erp-check-box',
      ).length,
    ).toBeGreaterThan(0);
    expect(
      tableEvidence.querySelectorAll(
        '[data-table-specimen="full-featured"] erp-table erp-sort-header',
      ).length,
    ).toBeGreaterThan(0);
    expect(fixture.nativeElement.querySelector('erp-pagination')).not.toBeNull();
    expect(
      fixture.nativeElement.querySelectorAll(
        '.status-badge-parity-matrix erp-status-badge',
      ),
    ).toHaveLength(32);
    expect(
      fixture.nativeElement.querySelectorAll(
        '.status-badge-size-matrix erp-status-badge',
      ),
    ).toHaveLength(4);
    expect(
      fixture.nativeElement.querySelectorAll(
        '.status-badge-anatomy-matrix erp-status-badge',
      ),
    ).toHaveLength(12);
    expect(
      fixture.nativeElement.querySelectorAll(
        '[data-status-badge-direction-evidence] erp-status-badge',
      ),
    ).toHaveLength(2);
    expect(
      fixture.nativeElement.querySelectorAll(
        '[data-avatar-direction-evidence] erp-avatar',
      ),
    ).toHaveLength(16);
    expect(
      fixture.nativeElement.querySelectorAll(
        '.avatar-reference-size-matrix erp-avatar',
      ),
    ).toHaveLength(18);
    expect(
      fixture.nativeElement.querySelectorAll(
        '.avatar-large-size-matrix erp-avatar',
      ),
    ).toHaveLength(1);
    expect(
      fixture.nativeElement.querySelector(
        'erp-avatar-picker[data-avatar-picker-large-size-evidence]',
      ),
    ).not.toBeNull();
    expect(
      fixture.nativeElement.querySelectorAll(
        '.avatar-reference-content-types erp-avatar',
      ),
    ).toHaveLength(14);
    expect(
      fixture.nativeElement.querySelectorAll(
        '.avatar-reference-motion-matrix erp-avatar',
      ),
    ).toHaveLength(5);
    expect(
      fixture.nativeElement.querySelectorAll(
        '.avatar-reference-presence-matrix erp-avatar',
      ),
    ).toHaveLength(8);
    expect(
      fixture.nativeElement.querySelector(
        '[data-row-activation-evidence]',
      ).textContent,
    ).toContain('لم يتم تفعيل صف');
    const tabsEvidence = fixture.nativeElement.querySelector(
      '.tabs-reference-parity-matrix[data-tabs-reference="ERP-TABS.html"]',
    ) as HTMLElement;
    expect(tabsEvidence.querySelector('erp-tabs[data-tabs-variant="underline"]')).not.toBeNull();
    expect(tabsEvidence.querySelector('erp-tabs[data-tabs-variant="pill"]')).not.toBeNull();
    expect(tabsEvidence.querySelector('erp-tabs[data-tabs-variant="solid"]')).not.toBeNull();
    expect(tabsEvidence.querySelectorAll(
      'erp-review-core-tabs [data-tabs-specimen]',
    )).toHaveLength(10);
    expect(tabsEvidence.querySelectorAll(
      'erp-tabs[data-tabs-orientation="vertical"]:not([data-tabs-variant="pills"])',
    ))
      .toHaveLength(2);
    expect(tabsEvidence.querySelector('erp-tabs[data-tabs-distribution="fill"]')).not.toBeNull();
    expect(tabsEvidence.querySelector(
      'erp-review-core-tabs [data-tabs-specimen="demo-h5"] erp-avatar',
    ))
      .not.toBeNull();
    expect(tabsEvidence.querySelector('erp-tabs[data-tabs-variant="pills"]')).not.toBeNull();
    expect(tabsEvidence.querySelector('[data-tabs-direction-evidence="rtl"]')).not.toBeNull();
    expect(tabsEvidence.querySelector('[data-tabs-direction-evidence="ltr"]')).not.toBeNull();
    const primaryTabsEvidence = tabsEvidence.querySelector(
      '[data-tabs-primary-evidence="arabic-rtl"]',
    ) as HTMLElement;
    expect(primaryTabsEvidence.getAttribute('dir')).toBe('rtl');
    expect(primaryTabsEvidence.textContent).toContain('نظرة عامة');
    expect(primaryTabsEvidence.textContent).toContain('المستخدمون النشطون');
    expect(primaryTabsEvidence.textContent).toContain('أميرة حداد');
    expect(primaryTabsEvidence.textContent).toContain('انزلاق افتراضي');
    expect(primaryTabsEvidence.textContent).not.toMatch(
      /Overview|Orders|Invoices|Customers|Reports|Slide|Fade|Scale|None/,
    );
    const ltrCompatibility = tabsEvidence.querySelector(
      '[data-tabs-compatibility-evidence="ltr"]',
    ) as HTMLElement;
    expect(ltrCompatibility.getAttribute('dir')).toBe('ltr');

    fixture.componentInstance.tabsVariant.set('ghost');
    fixture.detectChanges();
    expect(tabsEvidence.querySelector('erp-tabs[data-tabs-variant="ghost"]')).not.toBeNull();
  });

  it('exposes controlled StatusBadge selection and independent remove evidence', () => {
    const fixture = TestBed.createComponent(CoreBatch);
    fixture.detectChanges();
    const preview = fixture.nativeElement.querySelector(
      '.status-badge-reference-preview erp-status-badge',
    ) as HTMLElement;
    const evidence = fixture.nativeElement.querySelector(
      '[data-status-badge-interaction-evidence]',
    ) as HTMLElement;

    (preview.querySelector('[data-status-badge-action="main"] button') as HTMLButtonElement)
      .click();
    fixture.detectChanges();
    expect(evidence.textContent).toContain('تم إلغاء تحديد الحالة');

    (preview.querySelector('[data-status-badge-action="remove"] button') as HTMLButtonElement)
      .click();
    fixture.detectChanges();
    expect(evidence.textContent).toContain('تم طلب إزالة الحالة');
  });

  it('exposes the exact-reference interactive Avatar activation evidence', () => {
    const fixture = TestBed.createComponent(CoreBatch);
    fixture.detectChanges();
    const preview = fixture.nativeElement.querySelector(
      '.avatar-reference-preview erp-avatar',
    ) as HTMLElement;
    const evidence = fixture.nativeElement.querySelector(
      '[data-avatar-interaction-evidence]',
    ) as HTMLElement;

    (preview.querySelector('erp-avatar-action button') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(evidence.textContent).toContain('تم تفعيل الصورة الشخصية');
  });

  it('keeps the routed review template ERP-only authored', () => {
    const fixture = TestBed.createComponent(CoreBatch);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect([...host.children].map((element) => element.tagName)).toEqual(['ERP-CONTAINER']);
    expect(host.querySelector('erp-avatar-picker')).not.toBeNull();
  });
});
