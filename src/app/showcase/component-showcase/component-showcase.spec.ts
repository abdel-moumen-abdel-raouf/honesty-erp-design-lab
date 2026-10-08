import {TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {RouterTestingHarness} from '@angular/router/testing';
import {
  ERP_COMPONENT_CATALOG,
  ERP_PUBLIC_SHOWCASE_LOADERS,
} from '../../catalog/erp-component-catalog.generated';
import {ComponentShowcase} from './component-showcase';

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
    expect(publicEntries).toHaveLength(77);
    expect(Object.keys(ERP_PUBLIC_SHOWCASE_LOADERS)).toHaveLength(77);

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
});
