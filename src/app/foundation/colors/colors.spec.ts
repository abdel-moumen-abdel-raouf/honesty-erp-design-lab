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

  it('should render exactly 11 steps for Neutral and Primary ramps', () => {
    const fixture = TestBed.createComponent(Colors);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const neutralSwatches = compiled.querySelectorAll('.swatch-neutral-50, .swatch-neutral-100, .swatch-neutral-200, .swatch-neutral-300, .swatch-neutral-400, .swatch-neutral-500, .swatch-neutral-600, .swatch-neutral-700, .swatch-neutral-800, .swatch-neutral-900, .swatch-neutral-950');
    expect(neutralSwatches.length).toBe(11);

    const primarySwatches = compiled.querySelectorAll('.swatch-primary-50, .swatch-primary-100, .swatch-primary-200, .swatch-primary-300, .swatch-primary-400, .swatch-primary-500, .swatch-primary-600, .swatch-primary-700, .swatch-primary-800, .swatch-primary-900, .swatch-primary-950');
    expect(primarySwatches.length).toBe(11);
  });
});
