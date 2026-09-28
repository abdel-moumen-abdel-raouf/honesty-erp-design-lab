import {TestBed} from '@angular/core/testing';
import {Colors} from './colors';

describe('Colors', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Colors],
    }).compileComponents();
  });

  it('should create the colors specimen component', () => {
    const fixture = TestBed.createComponent(Colors);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render exactly 11 steps in each of the four Reference ramps', () => {
    const fixture = TestBed.createComponent(Colors);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('#neutral-ramp-strip .swatch-card')).toHaveLength(11);
    expect(compiled.querySelectorAll('#primary-ramp-strip .swatch-card')).toHaveLength(11);
    expect(compiled.querySelectorAll('#secondary-ramp-strip .swatch-card')).toHaveLength(11);
    expect(compiled.querySelectorAll('#accent-ramp-strip .swatch-card')).toHaveLength(11);
    expect(compiled.querySelectorAll('[data-reference-swatch]')).toHaveLength(44);
  });

  it('should render Brand evidence once under the inherited App theme', () => {
    const fixture = TestBed.createComponent(Colors);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const context = compiled.querySelector('[data-brand-context="current"]');

    expect(context).toBeTruthy();
    expect(context?.hasAttribute('data-theme')).toBe(false);
    expect(context?.querySelectorAll('[data-brand-tone]')).toHaveLength(3);
  });
});
