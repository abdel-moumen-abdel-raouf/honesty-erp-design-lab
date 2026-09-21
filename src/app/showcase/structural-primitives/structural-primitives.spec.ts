import {TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {routes} from '../../app.routes';
import {StructuralPrimitives} from './structural-primitives';

describe('StructuralPrimitives showcase', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StructuralPrimitives],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('has the /primitives/structural route', () => {
    expect(routes.find((route) => route.path === 'primitives/structural')).toBeDefined();
  });

  it('creates', () => {
    expect(TestBed.createComponent(StructuralPrimitives).componentInstance).toBeTruthy();
  });

  it('renders exactly one specimen group for each structural primitive', () => {
    const fixture = TestBed.createComponent(StructuralPrimitives);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const selectors = [
      'erp-container',
      'erp-stack',
      'erp-inline',
      'erp-grid',
      'erp-surface',
      'erp-section',
      'erp-divider',
    ];

    for (const selector of selectors) {
      expect(compiled.querySelectorAll(`[data-specimen-group="${selector}"]`).length).toBe(1);
    }
  });

  it('renders all seven production primitive selectors', () => {
    const fixture = TestBed.createComponent(StructuralPrimitives);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('erp-container')).toBeTruthy();
    expect(compiled.querySelector('erp-stack')).toBeTruthy();
    expect(compiled.querySelector('erp-inline')).toBeTruthy();
    expect(compiled.querySelector('erp-grid')).toBeTruthy();
    expect(compiled.querySelector('erp-surface')).toBeTruthy();
    expect(compiled.querySelector('erp-section')).toBeTruthy();
    expect(compiled.querySelector('erp-divider')).toBeTruthy();
  });
});
