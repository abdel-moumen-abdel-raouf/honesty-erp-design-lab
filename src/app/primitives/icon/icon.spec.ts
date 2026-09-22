import {Component, input, reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {
  ERP_ICON_NAMES,
  ERP_ICON_SIZES,
  ERP_ICON_STROKE_WIDTHS,
  ERP_ICON_VARIANTS,
  ErpIconName,
  ErpIconTone,
} from './icon-contracts';
import {ERP_ICON_REGISTRY} from './icon-registry';
import {ErpIcon} from './icon';

@Component({
  imports: [ErpIcon],
  template: '<erp-icon [name]="name()" />',
})
class ErpIconTestHost {
  readonly name = input.required<ErpIconName>();
}

describe('ErpIcon', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErpIcon, ErpIconTestHost],
    }).compileComponents();
  });

  it('exposes only the exact erp-icon selector and required public contract', () => {
    const mirror = reflectComponentType(ErpIcon);
    const fixture = TestBed.createComponent(ErpIcon);
    const component = fixture.componentInstance as ErpIcon & Record<string, unknown>;

    expect(mirror?.selector).toBe('erp-icon');
    expect(mirror?.selector).not.toContain('honesty-icon');
    expect(component.size()).toBe('md');
    expect(component.tone()).toBe('inherit');
    expect(component.variant()).toBe('outline');
    expect(component.strokeWidth()).toBe('regular');
    expect(component.decorative()).toBe(true);
    expect(component.label()).toBe('');
    expect('retry' in component).toBe(false);
    expect('family' in component).toBe(false);
    expect('group' in component).toBe(false);
    expect('kind' in component).toBe(false);
  });

  it('requires name before rendering', () => {
    const fixture = TestBed.createComponent(ErpIcon);

    expect(() => fixture.detectChanges()).toThrow();
  });

  it('keeps the semantic registry exhaustive and exact', () => {
    expect(ERP_ICON_NAMES.length).toBe(72);
    expect(Object.keys(ERP_ICON_REGISTRY).length).toBe(72);

    for (const name of ERP_ICON_NAMES) {
      const definition = ERP_ICON_REGISTRY[name];
      expect(definition).toBeDefined();
      expect(typeof definition.outlineSvg).toBe('string');
      expect(definition.outlineSvg.length).toBeGreaterThan(0);
      expect(typeof definition.filledSvg).toBe('string');
      expect(definition.filledSvg.length).toBeGreaterThan(0);
      expect(typeof definition.mirrorInRtl).toBe('boolean');
    }

    expect(Object.keys(ERP_ICON_REGISTRY).every((name) => {
      return ERP_ICON_NAMES.includes(name as ErpIconName);
    })).toBe(true);
  });

  it('marks exactly the required representative directional behavior', () => {
    const mirroredNames = new Set<ErpIconName>([
      'chevron-start',
      'chevron-end',
      'login',
      'logout',
      'skip-start',
      'skip-end',
    ]);

    for (const name of ERP_ICON_NAMES) {
      expect(ERP_ICON_REGISTRY[name].mirrorInRtl).toBe(mirroredNames.has(name));
    }
  });

  it('renders a ready semantic icon through exactly one internal NgIcon', () => {
    const fixture = TestBed.createComponent(ErpIconTestHost);
    fixture.componentRef.setInput('name', 'search');
    fixture.detectChanges();
    const host = fixture.nativeElement.querySelector('erp-icon') as HTMLElement;

    expect(host.tagName).toBe('ERP-ICON');
    expect(host.getAttribute('data-icon-name')).toBe('search');
    expect(host.getAttribute('data-icon-size')).toBe('md');
    expect(host.getAttribute('data-icon-tone')).toBe('inherit');
    expect(host.getAttribute('data-icon-variant')).toBe('outline');
    expect(host.getAttribute('data-icon-stroke-width')).toBe('regular');
    expect(host.getAttribute('data-icon-stroke-effective')).toBe('true');
    expect(host.getAttribute('data-icon-state')).toBe('ready');
    expect(host.querySelectorAll('ng-icon').length).toBe(1);
  });

  it('renders no glyph and remains hidden for an invalid runtime name', () => {
    const fixture = TestBed.createComponent(ErpIcon);
    fixture.componentRef.setInput('name', 'not-a-real-icon' as ErpIconName);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.getAttribute('data-icon-state')).toBe('invalid');
    expect(host.querySelectorAll('ng-icon').length).toBe(0);
    expect(host.getAttribute('aria-hidden')).toBe('true');
  });

  it('updates every controlled size exactly', () => {
    const fixture = TestBed.createComponent(ErpIcon);
    fixture.componentRef.setInput('name', 'search');
    const host = fixture.nativeElement as HTMLElement;
    expect(ERP_ICON_SIZES.length).toBe(32);
    expect(ERP_ICON_SIZES.at(-1)).toBe('15xl');

    for (const size of ERP_ICON_SIZES) {
      fixture.componentRef.setInput('size', size);
      fixture.detectChanges();
      expect(host.getAttribute('data-icon-size')).toBe(size);
    }
  });

  it('selects the exact outline and filled registry sources', () => {
    const fixture = TestBed.createComponent(ErpIcon);
    const component = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;

    expect(ERP_ICON_VARIANTS).toEqual(['outline', 'filled']);
    fixture.componentRef.setInput('name', 'settings');
    fixture.componentRef.setInput('variant', 'outline');
    fixture.detectChanges();

    expect(component.svg()).toBe(ERP_ICON_REGISTRY.settings.outlineSvg);
    expect(host.getAttribute('data-icon-variant')).toBe('outline');
    expect(host.getAttribute('data-icon-stroke-effective')).toBe('true');
    expect(host.querySelectorAll('ng-icon').length).toBe(1);

    fixture.componentRef.setInput('variant', 'filled');
    fixture.detectChanges();

    expect(component.svg()).toBe(ERP_ICON_REGISTRY.settings.filledSvg);
    expect(host.getAttribute('data-icon-variant')).toBe('filled');
    expect(host.getAttribute('data-icon-stroke-effective')).toBe('false');
    expect(host.querySelectorAll('ng-icon').length).toBe(1);
    expect(ERP_ICON_REGISTRY.settings.outlineSvg).not.toBe(
      ERP_ICON_REGISTRY.settings.filledSvg,
    );
  });

  it('resolves every controlled outline stroke width exactly', () => {
    const fixture = TestBed.createComponent(ErpIcon);
    const component = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const expectedValues = [1, 1.5, 2, 2.5, 3];

    expect(ERP_ICON_STROKE_WIDTHS).toEqual([
      'thin',
      'light',
      'regular',
      'medium',
      'bold',
    ]);
    fixture.componentRef.setInput('name', 'search');

    ERP_ICON_STROKE_WIDTHS.forEach((strokeWidth, index) => {
      fixture.componentRef.setInput('strokeWidth', strokeWidth);
      fixture.detectChanges();
      expect(host.getAttribute('data-icon-stroke-width')).toBe(strokeWidth);
      expect(component.resolvedStrokeWidth()).toBe(expectedValues[index]);
    });
  });

  it('updates every semantic tone exactly', () => {
    const fixture = TestBed.createComponent(ErpIcon);
    fixture.componentRef.setInput('name', 'info');
    const host = fixture.nativeElement as HTMLElement;
    const tones: readonly ErpIconTone[] = [
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
    ];

    for (const tone of tones) {
      fixture.componentRef.setInput('tone', tone);
      fixture.detectChanges();
      expect(host.getAttribute('data-icon-tone')).toBe(tone);
    }
  });

  it('hides decorative icons from the accessibility tree by default', () => {
    const fixture = TestBed.createComponent(ErpIcon);
    fixture.componentRef.setInput('name', 'info');
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.getAttribute('data-icon-accessibility')).toBe('decorative');
    expect(host.getAttribute('aria-hidden')).toBe('true');
    expect(host.hasAttribute('role')).toBe(false);
    expect(host.hasAttribute('aria-label')).toBe(false);
  });

  it('exposes a labelled non-decorative ready icon with a trimmed label', () => {
    const fixture = TestBed.createComponent(ErpIcon);
    fixture.componentRef.setInput('name', 'search');
    fixture.componentRef.setInput('decorative', false);
    fixture.componentRef.setInput('label', '  بحث  ');
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.getAttribute('data-icon-accessibility')).toBe('labelled');
    expect(host.getAttribute('role')).toBe('img');
    expect(host.getAttribute('aria-label')).toBe('بحث');
    expect(host.hasAttribute('aria-hidden')).toBe(false);
  });

  it('safely hides a non-decorative icon with a whitespace-only label', () => {
    const fixture = TestBed.createComponent(ErpIcon);
    fixture.componentRef.setInput('name', 'warning');
    fixture.componentRef.setInput('decorative', false);
    fixture.componentRef.setInput('label', '   ');
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.getAttribute('data-icon-accessibility')).toBe('invalid');
    expect(host.getAttribute('aria-hidden')).toBe('true');
    expect(host.hasAttribute('role')).toBe(false);
    expect(host.hasAttribute('aria-label')).toBe(false);
  });

  it('emits registry-owned RTL mirror evidence', () => {
    const fixture = TestBed.createComponent(ErpIcon);
    const host = fixture.nativeElement as HTMLElement;

    fixture.componentRef.setInput('name', 'chevron-start');
    fixture.detectChanges();
    expect(host.getAttribute('data-icon-mirror-rtl')).toBe('true');

    fixture.componentRef.setInput('name', 'search');
    fixture.detectChanges();
    expect(host.getAttribute('data-icon-mirror-rtl')).toBe('false');
  });
});
