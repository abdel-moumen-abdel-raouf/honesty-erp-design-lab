import {TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {RouterTestingHarness} from '@angular/router/testing';
import {ERP_COMPONENT_CATALOG} from '../../catalog/erp-component-catalog.generated';
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
    expect(root.textContent).toContain('ErpButton');
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
});
