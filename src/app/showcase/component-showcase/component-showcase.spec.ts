import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {provideRouter} from '@angular/router';
import {RouterTestingHarness} from '@angular/router/testing';
import {
  ERP_COMPONENT_CATALOG,
  ERP_PUBLIC_SHOWCASE_LOADERS,
} from '../../catalog/erp-component-catalog.generated';
import {ComponentShowcase} from './component-showcase';
import {ErpReviewShowcaseControlPanel} from '../../review-internals/showcase-control-panel/showcase-control-panel';

describe('ComponentShowcase', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentShowcase],
      providers: [provideRouter([{path: 'components/:componentId', component: ComponentShowcase}])],
    }).compileComponents();
  });

  it('loads a live public ERP component from its unique catalog route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/components/button', ComponentShowcase);
    await vi.waitFor(() => {
      harness.fixture.detectChanges();
      expect(harness.routeNativeElement?.querySelector('erp-button')).not.toBeNull();
    });

    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelector('erp-page')).not.toBeNull();
    expect(root.textContent).toContain('زر');
    expect(root.querySelector('erp-button')).not.toBeNull();
  });

  it('keeps unknown catalog identifiers deterministic', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/components/unknown', ComponentShowcase);
    expect(harness.routeNativeElement?.textContent).toContain('المكوّن غير مسجل');
  });

  it('provides every required input to every generated live case', () => {
    for (const entry of ERP_COMPONENT_CATALOG.filter(
      (candidate) => candidate.classification === 'PUBLIC ERP COMPONENT',
    )) {
      const requiredInputs = entry.publicApi.inputs.filter((input) => input.required);
      for (const showcaseCase of entry.showcaseCases) {
        for (const requiredInput of requiredInputs) {
          expect(
            Object.prototype.hasOwnProperty.call(showcaseCase.inputs, requiredInput.name),
            `${entry.className}/${showcaseCase.id} must provide ${requiredInput.name}`,
          ).toBe(true);
        }
      }
    }
  });

  it('loads one dedicated showcase owner for every public component without fallback', async () => {
    const publicEntries = ERP_COMPONENT_CATALOG.filter(
      (candidate) => candidate.classification === 'PUBLIC ERP COMPONENT',
    );
    expect(publicEntries).toHaveLength(81);
    expect(Object.keys(ERP_PUBLIC_SHOWCASE_LOADERS)).toHaveLength(81);

    const owners = await Promise.all(publicEntries.map(async (entry) => {
      expect(entry.showcaseOwnerPath).toBe(
        `src/app/showcase/components/${entry.id}/${entry.id}-showcase.ts`,
      );
      return ERP_PUBLIC_SHOWCASE_LOADERS[entry.id]();
    }));

    for (const owner of owners) {
      expect(owner).toBeTruthy();
      expect(typeof owner).toBe('function');
    }
  });

  it('assigns one live control to every public input and model', () => {
    for (const entry of ERP_COMPONENT_CATALOG.filter(
      (candidate) => candidate.classification === 'PUBLIC ERP COMPONENT',
    )) {
      const controlNames = new Set(entry.showcaseControls.map((control) => control.name));
      for (const input of entry.publicApi.inputs) {
        expect(controlNames.has(input.name), `${entry.className}.${input.name}`).toBe(true);
      }
      for (const model of entry.publicApi.models) {
        expect(controlNames.has(model.name), `${entry.className}.${model.name}`).toBe(true);
      }
    }
  });

  it('keeps every structural primitive workbench visible and applies its live layout controls', async () => {
    const harness = await RouterTestingHarness.create();
    const visibleChildren = new Map([
      ['container', 1],
      ['grid', 3],
      ['inline', 3],
      ['section', 3],
      ['stack', 3],
      ['surface', 1],
    ]);

    for (const [id, minimumChildren] of visibleChildren) {
      await harness.navigateByUrl(`/components/${id}`, ComponentShowcase);
      await vi.waitFor(() => {
        harness.fixture.detectChanges();
        expect(harness.routeNativeElement?.querySelector('[data-showcase-target]')).not.toBeNull();
      });
      const root = harness.routeNativeElement as HTMLElement;
      const target = root.querySelector('[data-showcase-target]') as HTMLElement;
      expect(root.querySelectorAll('[data-showcase-target]'), id).toHaveLength(1);
      expect(target.querySelectorAll('erp-surface, erp-text').length, id)
        .toBeGreaterThanOrEqual(minimumChildren);
    }

    await harness.navigateByUrl('/components/section', ComponentShowcase);
    await vi.waitFor(() => {
      harness.fixture.detectChanges();
      expect(harness.routeNativeElement?.querySelector('[data-showcase-target]')).not.toBeNull();
    });
    let panel = harness.fixture.debugElement
      .query(By.directive(ErpReviewShowcaseControlPanel))
      .componentInstance as ErpReviewShowcaseControlPanel;
    panel.editor(panel.controls().find((control) => control.name === 'gap')!).setValue('large');
    harness.fixture.detectChanges();
    expect(harness.routeNativeElement?.querySelector('[data-showcase-target]')
      ?.getAttribute('data-gap')).toBe('large');

    await harness.navigateByUrl('/components/divider', ComponentShowcase);
    await vi.waitFor(() => {
      harness.fixture.detectChanges();
      expect(harness.routeNativeElement?.querySelector('[data-showcase-target]')).not.toBeNull();
    });
    panel = harness.fixture.debugElement
      .query(By.directive(ErpReviewShowcaseControlPanel))
      .componentInstance as ErpReviewShowcaseControlPanel;
    panel.editor(panel.controls().find((control) => control.name === 'orientation')!)
      .setValue('vertical');
    harness.fixture.detectChanges();
    const divider = harness.routeNativeElement?.querySelector(
      '[data-showcase-target]',
    ) as HTMLElement;
    expect(divider.getAttribute('data-orientation')).toBe('vertical');
    expect(divider.classList).toContain('showcase-divider-target');
  });

  it('keeps Icon and Text reviewable while applying their public visual controls', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/components/icon', ComponentShowcase);
    await vi.waitFor(() => {
      harness.fixture.detectChanges();
      expect(harness.routeNativeElement?.querySelector('[data-showcase-target]')).not.toBeNull();
    });
    let root = harness.routeNativeElement as HTMLElement;
    let target = root.querySelector('[data-showcase-target]') as HTMLElement;
    let panel = harness.fixture.debugElement
      .query(By.directive(ErpReviewShowcaseControlPanel))
      .componentInstance as ErpReviewShowcaseControlPanel;
    panel.editor(panel.controls().find((control) => control.name === 'size')!).setValue('"5xl"');
    panel.editor(panel.controls().find((control) => control.name === 'decorative')!).setValue(false);
    panel.editor(panel.controls().find((control) => control.name === 'label')!)
      .setValue('إعدادات النظام');
    harness.fixture.detectChanges();
    expect(root.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(target.classList).toContain('showcase-icon-target');
    expect(target.getAttribute('data-icon-size')).toBe('5xl');
    expect(target.getAttribute('role')).toBe('img');
    expect(target.getAttribute('aria-label')).toBe('إعدادات النظام');

    await harness.navigateByUrl('/components/text', ComponentShowcase);
    await vi.waitFor(() => {
      harness.fixture.detectChanges();
      expect(harness.routeNativeElement?.querySelector('[data-showcase-target]')).not.toBeNull();
    });
    root = harness.routeNativeElement as HTMLElement;
    target = root.querySelector('[data-showcase-target]') as HTMLElement;
    panel = harness.fixture.debugElement
      .query(By.directive(ErpReviewShowcaseControlPanel))
      .componentInstance as ErpReviewShowcaseControlPanel;
    panel.editor(panel.controls().find((control) => control.name === 'type')!).setValue('paragraph');
    panel.editor(panel.controls().find((control) => control.name === 'lineClamp')!).setValue(2);
    panel.editor(panel.controls().find((control) => control.name === 'direction')!).setValue('ltr');
    harness.fixture.detectChanges();
    expect(root.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(target.classList).toContain('showcase-text-target');
    expect(target.textContent).toContain('تقرير حركة المخزون');
    expect(target.getAttribute('data-text-type')).toBe('paragraph');
    expect(target.getAttribute('data-text-line-clamp')).toBe('2');
    expect(target.getAttribute('dir')).toBe('ltr');
  });

  it('renders ButtonGroup as one controlled group with multiple actions', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/components/button-group', ComponentShowcase);
    await vi.waitFor(() => {
      harness.fixture.detectChanges();
      expect(harness.routeNativeElement?.querySelector('[data-showcase-target]')).not.toBeNull();
    });

    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(root.querySelectorAll('[data-showcase-target] erp-button')).toHaveLength(3);
    expect(root.querySelector('[data-showcase-control="orientation"]')).not.toBeNull();
    expect(root.querySelector('[data-showcase-control="attached"]')).not.toBeNull();
  });

  it('applies valid structured values and preserves an invalid draft and live value', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/components/button-group', ComponentShowcase);
    await vi.waitFor(() => {
      harness.fixture.detectChanges();
      expect(harness.routeNativeElement?.querySelector('[data-showcase-target]')).not.toBeNull();
    });

    const panel = harness.fixture.debugElement
      .query(By.directive(ErpReviewShowcaseControlPanel))
      .componentInstance as ErpReviewShowcaseControlPanel;
    const items = panel.controls().find((control) => control.name === 'items')!;
    const orientation = panel.controls().find((control) => control.name === 'orientation')!;

    panel.editor(items).setValue('[{"value":"one","label":"واحد"},{"value":"two","label":"اثنان"}]');
    harness.fixture.detectChanges();
    expect(harness.routeNativeElement?.querySelectorAll('[data-showcase-target] erp-button')).toHaveLength(2);

    panel.editor(items).setValue('42');
    panel.editor(orientation).setValue('vertical');
    harness.fixture.detectChanges();

    const target = harness.routeNativeElement?.querySelector('[data-showcase-target]');
    expect(target?.getAttribute('data-button-group-orientation')).toBe('vertical');
    expect(target?.querySelectorAll('erp-button')).toHaveLength(2);
    expect(panel.editor(items).value).toBe('42');
    expect(panel.error('items')).toContain('يجب أن تكون مصفوفة');
  });

  it('synchronizes model and CVA editors with their live targets', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/components/view-switcher', ComponentShowcase);
    await vi.waitFor(() => {
      harness.fixture.detectChanges();
      expect(harness.routeNativeElement?.querySelector('[data-showcase-target]')).not.toBeNull();
    });

    let panel = harness.fixture.debugElement
      .query(By.directive(ErpReviewShowcaseControlPanel))
      .componentInstance as ErpReviewShowcaseControlPanel;
    const view = panel.controls().find((control) => control.name === 'value')!;
    panel.editor(view).setValue('cards');
    harness.fixture.detectChanges();
    expect(harness.routeNativeElement?.querySelector('[data-showcase-target]')
      ?.getAttribute('data-view-mode')).toBe('cards');

    await harness.navigateByUrl('/components/check-box', ComponentShowcase);
    await vi.waitFor(() => {
      harness.fixture.detectChanges();
      expect(harness.routeNativeElement?.querySelector('[data-showcase-target] input')).not.toBeNull();
    });
    panel = harness.fixture.debugElement
      .query(By.directive(ErpReviewShowcaseControlPanel))
      .componentInstance as ErpReviewShowcaseControlPanel;
    const cva = panel.controls().find((control) => control.source === 'cva')!;
    panel.editor(cva).setValue(true);
    harness.fixture.detectChanges();
    expect((harness.routeNativeElement?.querySelector(
      '[data-showcase-target] input',
    ) as HTMLInputElement).checked).toBe(true);
  });

  it('restores exact-reference evidence on demand without adding another primary target', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/components/select', ComponentShowcase);
    await vi.waitFor(() => {
      harness.fixture.detectChanges();
      expect(harness.routeNativeElement?.querySelector('[data-showcase-target]')).not.toBeNull();
    });

    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(root.querySelector('app-review-exact-core-showcase')).toBeNull();

    (root.querySelector('[data-showcase-exact-reference-toggle] button') as HTMLButtonElement).click();
    harness.fixture.detectChanges();

    expect(root.querySelector('app-review-exact-core-showcase')).not.toBeNull();
    expect(root.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
  }, 20000);

  it('starts the Select workbench with meaningful Arabic ERP data on its only live target', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/components/select', ComponentShowcase);
    await vi.waitFor(() => {
      harness.fixture.detectChanges();
      expect(harness.routeNativeElement?.querySelector('[data-showcase-target]')).not.toBeNull();
    });

    const root = harness.routeNativeElement as HTMLElement;
    const target = root.querySelector('[data-showcase-target]') as HTMLElement;
    expect(root.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(target.querySelector('.select__single-label')?.textContent).toContain('أحمد محمود');

    const panel = harness.fixture.debugElement
      .query(By.directive(ErpReviewShowcaseControlPanel))
      .componentInstance as ErpReviewShowcaseControlPanel;
    const optionsControl = panel.controls().find((control) => control.name === 'options')!;
    expect(JSON.parse(String(panel.editor(optionsControl).value))).toHaveLength(3);
  });

  it('starts the Tabs workbench with a switchable Arabic ERP model and event evidence', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/components/tabs', ComponentShowcase);
    await vi.waitFor(() => {
      harness.fixture.detectChanges();
      expect(harness.routeNativeElement?.querySelector('[data-showcase-target]')).not.toBeNull();
    });

    const root = harness.routeNativeElement as HTMLElement;
    const tabs = root.querySelectorAll<HTMLButtonElement>(
      '[data-showcase-target] [role="tab"]',
    );
    expect(root.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(tabs).toHaveLength(5);
    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
    expect(tabs[4].disabled).toBe(true);

    tabs[1].click();
    harness.fixture.detectChanges();

    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
    expect(root.querySelector('[data-showcase-event-log]')?.textContent).toContain(
      'tabClick:',
    );

    const panel = harness.fixture.debugElement
      .query(By.directive(ErpReviewShowcaseControlPanel))
      .componentInstance as ErpReviewShowcaseControlPanel;
    const activeId = panel.controls().find((control) => control.name === 'activeId')!;
    expect(panel.editor(activeId).value).toBe('orders');
  });

  it('restores RadioBox and RadioGroup family evidence on demand with one live target', async () => {
    const harness = await RouterTestingHarness.create();

    for (const route of ['radio-box', 'radio-group']) {
      await harness.navigateByUrl(`/components/${route}`, ComponentShowcase);
      await vi.waitFor(() => {
        harness.fixture.detectChanges();
        expect(
          harness.routeNativeElement?.querySelector('[data-showcase-target]'),
        ).not.toBeNull();
      });

      const root = harness.routeNativeElement as HTMLElement;
      expect(root.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
      expect(root.querySelector('app-review-radio-reference')).toBeNull();

      (
        root.querySelector(
          '[data-radio-reference-toggle] button',
        ) as HTMLButtonElement
      ).click();
      harness.fixture.detectChanges();

      expect(root.querySelector('app-review-radio-reference')).not.toBeNull();
      expect(root.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    }
  }, 20000);

  it('restores the complete EmptyState reference experience on demand with one live target', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/components/empty-state', ComponentShowcase);
    await vi.waitFor(() => {
      harness.fixture.detectChanges();
      expect(
        harness.routeNativeElement?.querySelector('[data-showcase-target]'),
      ).not.toBeNull();
    });

    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(root.querySelector('app-empty-state-controls')).toBeNull();

    (
      root.querySelector(
        '[data-empty-state-reference-toggle] button',
      ) as HTMLButtonElement
    ).click();
    harness.fixture.detectChanges();

    const evidence = root.querySelector('app-empty-state-controls');
    expect(evidence).not.toBeNull();
    expect(evidence?.querySelectorAll('[data-empty-state-interactive-preview] erp-empty-state')).toHaveLength(1);
    expect(evidence?.querySelectorAll('[data-empty-state-scenario-matrix] erp-empty-state')).toHaveLength(5);
    expect(root.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
  }, 20000);

  it('uses the complete canonical AvatarPicker gallery in the live workbench', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/components/avatar-picker', ComponentShowcase);
    await vi.waitFor(() => {
      harness.fixture.detectChanges();
      expect(harness.routeNativeElement?.querySelector('[data-showcase-target]'))
        .not.toBeNull();
    });

    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(root.querySelectorAll('[data-showcase-target] erp-avatar-picker-tile'))
      .toHaveLength(60);
    expect(
      [...root.querySelectorAll('[data-showcase-target] erp-avatar-picker-tile img')]
        .every((image) => image.getAttribute('loading') === 'lazy'),
    ).toBe(true);

    (root.querySelectorAll<HTMLButtonElement>('[data-showcase-target] [role="tab"]')[1]).click();
    harness.fixture.detectChanges();
    expect(root.querySelectorAll('[data-showcase-target] erp-avatar-picker-tile'))
      .toHaveLength(56);
  }, 20000);

  it('restores the complete multi-owner Table reference experience on demand', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/components/table', ComponentShowcase);
    await vi.waitFor(() => {
      harness.fixture.detectChanges();
      expect(harness.routeNativeElement?.querySelector('[data-showcase-target]')).not.toBeNull();
    });

    const root = harness.routeNativeElement as HTMLElement;
    (root.querySelector('[data-showcase-exact-reference-toggle] button') as HTMLButtonElement).click();
    harness.fixture.detectChanges();

    const exact = root.querySelector('[data-table-reference-experience="complete"]');
    expect(exact).not.toBeNull();
    expect(exact?.querySelector('erp-table-toolbar')).not.toBeNull();
    expect(exact?.querySelector('erp-search-box')).not.toBeNull();
    expect(exact?.querySelector('erp-column-chooser')).not.toBeNull();
    expect(exact?.querySelector('erp-table')).not.toBeNull();
    expect(exact?.querySelector('erp-pagination')).not.toBeNull();
    expect(root.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
  }, 20000);

  it('starts the Table workbench with meaningful controlled ERP data and event evidence', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/components/table', ComponentShowcase);
    await vi.waitFor(() => {
      harness.fixture.detectChanges();
      expect(harness.routeNativeElement?.querySelector('[data-showcase-target]')).not.toBeNull();
    });

    const root = harness.routeNativeElement as HTMLElement;
    const target = root.querySelector('[data-showcase-target]') as HTMLElement;
    const headers = [...target.querySelectorAll('thead th')].map((cell) => cell.textContent?.trim());
    expect(root.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(headers).toEqual([
      '',
      'رقم الحساب',
      'اسم الحساب',
      'النوع',
      'الرصيد',
      'الحالة',
      'الفرع',
      'آخر تحديث',
    ]);
    expect(target.querySelectorAll('tbody tr')).toHaveLength(5);
    expect(target.querySelector('tfoot')?.textContent).toContain('إجمالي الأرصدة');

    const panel = harness.fixture.debugElement
      .query(By.directive(ErpReviewShowcaseControlPanel))
      .componentInstance as ErpReviewShowcaseControlPanel;
    const selectedKeys = panel.controls().find((control) => control.name === 'selectedKeys')!;
    const firstRowCheckbox = target.querySelector<HTMLInputElement>(
      'tbody tr:first-child input[type="checkbox"]',
    )!;
    firstRowCheckbox.click();
    harness.fixture.detectChanges();
    expect(JSON.parse(String(panel.editor(selectedKeys).value))).toEqual(['101']);

    target.querySelector<HTMLButtonElement>('erp-sort-header button')!.click();
    harness.fixture.detectChanges();
    expect(root.querySelector('[data-showcase-event-log]')?.textContent).toContain('sortChange:');

    target.querySelector<HTMLTableRowElement>('tbody tr:nth-child(2)')!.click();
    harness.fixture.detectChanges();
    expect(root.querySelector('[data-showcase-event-log]')?.textContent).toContain('rowActivated:');
  }, 20000);

  it('keeps one UserMenu target with reference actions and durable action evidence', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/components/user-menu', ComponentShowcase);
    await vi.waitFor(() => {
      harness.fixture.detectChanges();
      expect(harness.routeNativeElement?.querySelector('[data-showcase-target]')).not.toBeNull();
    });

    const root = harness.routeNativeElement as HTMLElement;
    const surface = root.querySelector<HTMLElement>('.user-menu__surface')!;
    Object.defineProperties(surface, {
      hidePopover: {configurable: true, value: vi.fn()},
      showPopover: {configurable: true, value: vi.fn()},
    });
    const trigger = root.querySelector<HTMLButtonElement>(
      '[data-showcase-target] .user-menu__trigger button',
    )!;

    expect(root.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(root.querySelectorAll('.user-menu__items erp-button')).toHaveLength(6);
    expect(root.querySelectorAll('.user-menu__divider')).toHaveLength(2);

    trigger.click();
    root.querySelector<HTMLButtonElement>(
      '.user-menu__items erp-button button',
    )!.click();
    harness.fixture.detectChanges();

    expect(root.querySelector('[data-showcase-event-log]')?.textContent).toContain(
      'actionActivated:',
    );
    expect(root.querySelector('[data-showcase-event-log]')?.textContent).toContain(
      'openChange: false',
    );
  });

  it('applies UserMenu identity presets and every visibility control to the same live target', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/components/user-menu', ComponentShowcase);
    await vi.waitFor(() => {
      harness.fixture.detectChanges();
      expect(harness.routeNativeElement?.querySelector('[data-showcase-target]')).not.toBeNull();
    });

    const root = harness.routeNativeElement as HTMLElement;
    const panel = harness.fixture.debugElement
      .query(By.directive(ErpReviewShowcaseControlPanel))
      .componentInstance as ErpReviewShowcaseControlPanel;
    const target = root.querySelector('[data-showcase-target]');
    const preset = panel.controls().find((control) => control.name === '$userPreset')!;
    const visibilityNames = [
      'showAvatar',
      'showUserName',
      'showEmail',
      'showPresence',
      'showRoleBadge',
      'showBranchBadge',
      'showTriggerRoleBadge',
      'showTriggerBranchBadge',
    ];

    expect(root.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(preset.options).toHaveLength(6);
    for (const name of visibilityNames) {
      expect(panel.controls().find((control) => control.name === name)).toBeTruthy();
    }

    panel.editor(preset).setValue('أحرف أولى — بعيد');
    harness.fixture.detectChanges();
    expect(target?.textContent).toContain('عمر ناصر');
    expect(target?.querySelectorAll('.avatar__initials')).toHaveLength(2);
    expect(target?.querySelector('erp-avatar')?.getAttribute('data-avatar-presence')).toBe('away');

    for (const name of visibilityNames) {
      const control = panel.controls().find((candidate) => candidate.name === name)!;
      panel.editor(control).setValue(false);
    }
    harness.fixture.detectChanges();

    expect(root.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(target?.querySelectorAll('erp-avatar')).toHaveLength(0);
    expect(target?.querySelectorAll('.user-menu__trigger-name')).toHaveLength(0);
    expect(target?.querySelectorAll('.user-menu__email')).toHaveLength(0);
    expect(target?.querySelectorAll('erp-status-badge')).toHaveLength(0);
    expect(target?.querySelector<HTMLButtonElement>('.user-menu__trigger button')?.textContent)
      .toContain('عمر ناصر');
  });
});
