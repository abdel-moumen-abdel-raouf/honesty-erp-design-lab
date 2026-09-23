import {TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {routes} from '../../app.routes';
import {ButtonControls} from './button-controls';

describe('ButtonControls showcase', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonControls],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  function createFixture() {
    const fixture = TestBed.createComponent(ButtonControls);
    fixture.detectChanges();
    return fixture;
  }

  it('has the /controls/buttons route', () => {
    expect(routes.find((route) => route.path === 'controls/buttons')).toBeDefined();
  });

  it('creates', () => {
    expect(createFixture().componentInstance).toBeTruthy();
  });

  it('renders exactly seven review groups with equivalent Light and Dark contexts', () => {
    const compiled = createFixture().nativeElement as HTMLElement;

    expect(
      compiled.querySelector('erp-container.button-showcase')?.getAttribute('data-theme'),
    ).toBe('light');
    const groups = [...compiled.querySelectorAll<HTMLElement>('[data-review-group]')];
    expect(groups.length).toBe(7);

    for (const group of groups) {
      const contexts = [...group.querySelectorAll<HTMLElement>('[data-theme-context]')];
      expect(contexts.length).toBe(2);
      expect(contexts.map((context) => context.getAttribute('data-theme'))).toEqual([
        'light',
        'dark',
      ]);
    }
  });

  it('evidences Standard Button variants, tones, sizes, shapes, border, and width', () => {
    const compiled = createFixture().nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('[data-standard-variant-evidence]').length).toBe(10);
    expect(compiled.querySelectorAll('[data-solid-tone-evidence]').length).toBe(16);
    expect(compiled.querySelectorAll('[data-outline-tone-evidence]').length).toBe(16);
    expect(compiled.querySelectorAll('[data-button-size-evidence]').length).toBe(6);
    expect(compiled.querySelectorAll('[data-button-shape-evidence]').length).toBe(6);
    expect(compiled.querySelectorAll('[data-dashed-border-evidence]').length).toBe(2);
    expect(compiled.querySelectorAll('[data-full-width-evidence]').length).toBe(2);
  });

  it('evidences all required IconButton variants and sizes', () => {
    const compiled = createFixture().nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('[data-icon-button-variant-evidence]').length).toBe(8);
    expect(compiled.querySelectorAll('[data-icon-button-size-evidence]').length).toBe(6);
    expect(compiled.querySelectorAll('[data-icon-button-shape-evidence]').length).toBe(6);
  });

  it('evidences external Tooltip composition for IconButton and FAB in both themes', () => {
    const compiled = createFixture().nativeElement as HTMLElement;
    const iconButtonTooltips = [
      ...compiled.querySelectorAll<HTMLElement>('[data-icon-button-tooltip-evidence]'),
    ];
    const fabTooltips = [
      ...compiled.querySelectorAll<HTMLElement>('[data-fab-tooltip-evidence]'),
    ];

    expect(iconButtonTooltips.length).toBe(2);
    for (const tooltip of iconButtonTooltips) {
      expect(tooltip.querySelectorAll('erp-icon-button').length).toBe(1);
      expect(tooltip.getAttribute('data-tooltip-state')).toBe('ready');
    }

    expect(fabTooltips.length).toBe(2);
    for (const tooltip of fabTooltips) {
      expect(tooltip.querySelectorAll('erp-fab').length).toBe(1);
      expect(tooltip.getAttribute('data-tooltip-state')).toBe('ready');
    }
  });

  it('evidences all required FAB sizes and tones', () => {
    const compiled = createFixture().nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('[data-fab-size-evidence]').length).toBe(6);
    expect(compiled.querySelectorAll('[data-fab-tone-evidence]').length).toBe(8);
  });

  it('evidences all required Extended FAB sizes and tones', () => {
    const compiled = createFixture().nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('[data-extended-fab-size-evidence]').length).toBe(6);
    expect(compiled.querySelectorAll('[data-extended-fab-tone-evidence]').length).toBe(8);
    expect(compiled.querySelectorAll('[data-extended-fab-no-icon]').length).toBe(2);
  });

  it('evidences ready, disabled, loading, cursor, and ripple speed in both themes', () => {
    const compiled = createFixture().nativeElement as HTMLElement;
    const states = [...compiled.querySelectorAll<HTMLElement>('[data-state-evidence]')];

    expect(states.length).toBe(24);
    expect(states.filter((control) => control.getAttribute('data-state-evidence')?.endsWith('ready')).length).toBe(8);
    expect(states.filter((control) => control.getAttribute('data-state-evidence')?.endsWith('disabled')).length).toBe(8);
    expect(states.filter((control) => control.getAttribute('data-state-evidence')?.endsWith('loading')).length).toBe(8);
    const pointerControls = compiled.querySelectorAll('[data-cursor-evidence="pointer"]');
    const defaultControls = compiled.querySelectorAll('[data-cursor-evidence="default"]');
    expect(pointerControls.length).toBe(2);
    expect(defaultControls.length).toBe(2);
    for (const control of pointerControls) {
      expect(control.getAttribute('data-button-cursor')).toBe('pointer');
    }
    for (const control of defaultControls) {
      expect(control.getAttribute('data-button-cursor')).toBe('default');
    }

    for (const speed of ['fast', 'normal', 'slow']) {
      const controls = compiled.querySelectorAll(
        `[data-ripple-speed-evidence="${speed}"]`,
      );
      expect(controls.length).toBe(2);
      for (const control of controls) {
        expect(control.getAttribute('data-button-ripple-speed')).toBe(speed);
      }
    }
  });

  it('evidences the normal default ripple for all four controls in both themes', () => {
    const compiled = createFixture().nativeElement as HTMLElement;
    const controls = [
      ...compiled.querySelectorAll<HTMLElement>('[data-default-ripple-evidence]'),
    ];

    expect(controls.length).toBe(8);
    for (const control of controls) {
      switch (control.tagName) {
        case 'ERP-BUTTON':
          expect(control.getAttribute('data-button-ripple-speed')).toBe('normal');
          break;
        case 'ERP-ICON-BUTTON':
          expect(control.getAttribute('data-icon-button-ripple-speed')).toBe('normal');
          break;
        case 'ERP-FAB':
          expect(control.getAttribute('data-fab-ripple-speed')).toBe('normal');
          break;
        case 'ERP-EXTENDED-FAB':
          expect(control.getAttribute('data-extended-fab-ripple-speed')).toBe('normal');
          break;
        default:
          throw new Error(`Unexpected default ripple evidence host: ${control.tagName}`);
      }
    }
  });

  it('updates the docs-only pressed counter after ready button activation', () => {
    const fixture = createFixture();
    const compiled = fixture.nativeElement as HTMLElement;
    const nativeButton = compiled.querySelector<HTMLButtonElement>(
      '#ripple-counter-button button',
    );

    expect(compiled.querySelector('#ripple-counter-value')?.textContent).toContain('0');
    nativeButton?.click();
    fixture.detectChanges();
    expect(compiled.querySelector('#ripple-counter-value')?.textContent).toContain('1');
  });
});
