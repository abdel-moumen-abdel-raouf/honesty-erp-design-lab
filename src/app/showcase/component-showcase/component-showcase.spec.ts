import {TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {RouterTestingHarness} from '@angular/router/testing';
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
});
