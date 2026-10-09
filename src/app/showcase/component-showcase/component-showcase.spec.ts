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

    for (const entry of publicEntries) {
      expect(entry.showcaseOwnerPath).toBe(
        `src/app/showcase/components/${entry.id}/${entry.id}-showcase.ts`,
      );
      const owner = await ERP_PUBLIC_SHOWCASE_LOADERS[entry.id]();
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
