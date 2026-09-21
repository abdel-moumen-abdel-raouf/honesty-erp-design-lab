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

  it('should render equivalent Light and Dark Brand evidence with three tones each', () => {
    const fixture = TestBed.createComponent(Colors);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const lightContext = compiled.querySelector('[data-brand-context="light"]');
    const darkContext = compiled.querySelector('[data-brand-context="dark"]');

    expect(lightContext).toBeTruthy();
    expect(darkContext).toBeTruthy();

    for (const context of [lightContext, darkContext]) {
      const toneGroups = context?.querySelectorAll('[data-brand-tone]');
      expect(toneGroups).toHaveLength(3);

      for (const group of Array.from(toneGroups ?? [])) {
        expect(group.querySelectorAll('[data-brand-sample]')).toHaveLength(3);
        expect(group.querySelector('[data-brand-sample="solid"]')).toBeTruthy();
        expect(group.querySelector('[data-brand-sample="solid-strong"]')).toBeTruthy();
        expect(group.querySelector('[data-brand-sample="subtle-content"]')).toBeTruthy();
      }
    }
  });
});
