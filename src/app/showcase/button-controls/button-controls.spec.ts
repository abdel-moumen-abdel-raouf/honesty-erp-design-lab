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

  it('applies the Light theme scope and renders exactly seven review groups', () => {
    const compiled = createFixture().nativeElement as HTMLElement;

    expect(
      compiled.querySelector('erp-container.button-showcase')?.getAttribute('data-theme'),
    ).toBe('light');
    expect(compiled.querySelectorAll('[data-review-group]').length).toBe(7);
  });

  it('evidences Standard Button variants, tones, sizes, shapes, border, and width', () => {
    const compiled = createFixture().nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('[data-standard-variant-evidence]').length).toBe(5);
    expect(compiled.querySelectorAll('[data-solid-tone-evidence]').length).toBe(8);
    expect(compiled.querySelectorAll('[data-outline-tone-evidence]').length).toBe(8);
    expect(compiled.querySelectorAll('[data-button-size-evidence]').length).toBe(3);
    expect(compiled.querySelectorAll('[data-button-shape-evidence]').length).toBe(3);
    expect(compiled.querySelector('[data-dashed-border-evidence]')).toBeTruthy();
    expect(compiled.querySelector('[data-full-width-evidence]')).toBeTruthy();
  });

  it('evidences all required IconButton variants and sizes', () => {
    const compiled = createFixture().nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('[data-icon-button-variant-evidence]').length).toBe(4);
    expect(compiled.querySelectorAll('[data-icon-button-size-evidence]').length).toBe(3);
  });

  it('evidences all required FAB sizes and tones', () => {
    const compiled = createFixture().nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('[data-fab-size-evidence]').length).toBe(3);
    expect(compiled.querySelectorAll('[data-fab-tone-evidence]').length).toBe(4);
  });

  it('evidences all required Extended FAB sizes and tones', () => {
    const compiled = createFixture().nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('[data-extended-fab-size-evidence]').length).toBe(3);
    expect(compiled.querySelectorAll('[data-extended-fab-tone-evidence]').length).toBe(4);
  });

  it('evidences ready, disabled, loading, and dark-theme review contexts', () => {
    const compiled = createFixture().nativeElement as HTMLElement;
    const states = [...compiled.querySelectorAll<HTMLElement>('[data-state-evidence]')];

    expect(states.length).toBe(12);
    expect(states.filter((control) => control.getAttribute('data-state-evidence')?.endsWith('disabled')).length).toBe(4);
    expect(states.filter((control) => control.getAttribute('data-state-evidence')?.endsWith('loading')).length).toBe(4);
    expect(compiled.querySelector('.dark-theme-proof[data-theme="dark"]')).toBeTruthy();
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
