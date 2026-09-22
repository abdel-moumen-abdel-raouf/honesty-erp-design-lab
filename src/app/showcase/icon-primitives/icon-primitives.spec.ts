import {TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {routes} from '../../app.routes';
import {
  ERP_ICON_NAMES,
  ERP_ICON_SIZES,
  ERP_ICON_STROKE_WIDTHS,
  ERP_ICON_VARIANTS,
} from '../../primitives/icon/icon-contracts';
import {IconPrimitives} from './icon-primitives';

describe('IconPrimitives showcase', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconPrimitives],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  function render() {
    const fixture = TestBed.createComponent(IconPrimitives);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('has the /primitives/icons route', () => {
    expect(routes.find((route) => route.path === 'primitives/icons')).toBeDefined();
  });

  it('creates', () => {
    expect(TestBed.createComponent(IconPrimitives).componentInstance).toBeTruthy();
  });

  it('applies the Light theme scope to the showcase root', () => {
    const root = render().querySelector('erp-container.icon-showcase');

    expect(root?.getAttribute('data-theme')).toBe('light');
  });

  it('renders exactly five review groups', () => {
    expect(render().querySelectorAll('[data-review-group]').length).toBe(5);
  });

  it('evidences all 72 unique semantic icon names in the core catalog', () => {
    const icons = [...render().querySelectorAll<HTMLElement>('[data-catalog-icon]')];
    const names = icons.map((icon) => icon.getAttribute('data-icon-name'));

    expect(icons.length).toBe(72);
    expect(new Set(names).size).toBe(72);
    expect(names).toEqual([...ERP_ICON_NAMES]);
  });

  it('keeps rendered vendor and SVG nodes owned by ErpIcon', () => {
    const compiled = render();

    for (const renderer of compiled.querySelectorAll('ng-icon')) {
      expect(renderer.closest('erp-icon')).toBeTruthy();
    }

    for (const svg of compiled.querySelectorAll('svg')) {
      expect(svg.closest('ng-icon')?.closest('erp-icon')).toBeTruthy();
    }

    expect(compiled.querySelector('honesty-icon')).toBeNull();
  });

  it('evidences all 32 controlled sizes', () => {
    const values = [...render().querySelectorAll<HTMLElement>('[data-size-evidence]')].map(
      (icon) => icon.getAttribute('data-icon-size'),
    );

    expect(ERP_ICON_SIZES.length).toBe(32);
    expect(values.length).toBe(32);
    expect(values).toEqual([...ERP_ICON_SIZES]);
  });

  it('evidences the exact outline and filled variants', () => {
    const icons = [...render().querySelectorAll<HTMLElement>('[data-variant-evidence]')];

    expect(icons.length).toBe(2);
    expect(icons.map((icon) => icon.getAttribute('data-icon-variant'))).toEqual([
      ...ERP_ICON_VARIANTS,
    ]);
    expect(icons.map((icon) => icon.getAttribute('data-icon-name'))).toEqual([
      'settings',
      'settings',
    ]);
  });

  it('evidences the exact effective outline stroke-width scale', () => {
    const icons = [...render().querySelectorAll<HTMLElement>('[data-stroke-evidence]')];

    expect(icons.length).toBe(5);
    expect(icons.map((icon) => icon.getAttribute('data-icon-stroke-width'))).toEqual([
      ...ERP_ICON_STROKE_WIDTHS,
    ]);

    for (const icon of icons) {
      expect(icon.getAttribute('data-icon-variant')).toBe('outline');
      expect(icon.getAttribute('data-icon-stroke-effective')).toBe('true');
    }
  });

  it('evidences all 13 semantic tones', () => {
    const values = [...render().querySelectorAll<HTMLElement>('[data-tone-evidence]')].map(
      (icon) => icon.getAttribute('data-icon-tone'),
    );

    expect(values).toEqual([
      'inherit',
      'primary',
      'secondary',
      'muted',
      'disabled',
      'inverse',
      'brand-primary',
      'brand-secondary',
      'brand-accent',
      'success',
      'warning',
      'danger',
      'info',
    ]);
  });

  it('evidences the same six directional names in LTR and RTL contexts', () => {
    const compiled = render();
    const expected = [
      'chevron-start',
      'chevron-end',
      'login',
      'logout',
      'skip-start',
      'skip-end',
    ];
    const ltr = [...compiled.querySelectorAll<HTMLElement>('[data-directional-ltr]')].map(
      (icon) => icon.getAttribute('data-icon-name'),
    );
    const rtl = [...compiled.querySelectorAll<HTMLElement>('[data-directional-rtl]')].map(
      (icon) => icon.getAttribute('data-icon-name'),
    );

    expect(ltr).toEqual(expected);
    expect(rtl).toEqual(expected);
    expect(compiled.querySelector('[dir="ltr"]')).toBeTruthy();
    expect(compiled.querySelector('[dir="rtl"]')).toBeTruthy();
  });

  it('evidences decorative, labelled, and invalid accessibility states', () => {
    const compiled = render();
    const decorative = compiled.querySelector('#decorative-icon-proof');
    const labelled = compiled.querySelector('#labelled-icon-proof');
    const invalid = compiled.querySelector('#invalid-accessibility-icon-proof');

    expect(decorative?.getAttribute('data-icon-accessibility')).toBe('decorative');
    expect(decorative?.getAttribute('aria-hidden')).toBe('true');
    expect(labelled?.getAttribute('data-icon-accessibility')).toBe('labelled');
    expect(labelled?.getAttribute('role')).toBe('img');
    expect(labelled?.getAttribute('aria-label')).toBe('تحذير');
    expect(invalid?.getAttribute('data-icon-accessibility')).toBe('invalid');
    expect(invalid?.getAttribute('aria-hidden')).toBe('true');
  });
});
