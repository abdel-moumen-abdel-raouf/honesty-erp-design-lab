import {Component, reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import type {AnimationItem, LottiePlayer} from 'lottie-web';
import {
  ERP_EMPTY_STATE_LOTTIE_ASSETS,
  ERP_EMPTY_STATE_SCENARIOS,
  ErpEmptyState,
  ErpEmptyStateExtra,
  ErpEmptyStateIllustration,
  ErpEmptyStateVariant,
} from './empty-state';
import {EMPTY_STATE_LOTTIE_LOADER} from './empty-state-lottie';

@Component({
  imports: [ErpEmptyState, ErpEmptyStateIllustration, ErpEmptyStateExtra],
  template: `
    <erp-empty-state>
      <span erpEmptyStateIllustration data-custom-illustration>Custom art</span>
      <span erpEmptyStateExtra data-custom-extra>Custom extra</span>
    </erp-empty-state>
  `,
})
class ProjectionHost {}

describe('ErpEmptyState', () => {
  let animation: AnimationItem;
  let player: LottiePlayer;

  beforeEach(() => {
    animation = {
      destroy: vi.fn(),
      goToAndPlay: vi.fn(),
      goToAndStop: vi.fn(),
      play: vi.fn(),
      setSpeed: vi.fn(),
    } as unknown as AnimationItem;
    player = {
      loadAnimation: vi.fn(() => animation),
    } as unknown as LottiePlayer;

    TestBed.configureTestingModule({
      imports: [ErpEmptyState, ProjectionHost],
      providers: [
        {
          provide: EMPTY_STATE_LOTTIE_LOADER,
          useValue: async () => player,
        },
      ],
    });
  });

  function create() {
    const fixture = TestBed.createComponent(ErpEmptyState);
    fixture.detectChanges();
    return fixture;
  }

  it('creates with exact no-data reference defaults and live status semantics', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;

    expect(reflectComponentType(ErpEmptyState)?.selector).toBe('erp-empty-state');
    expect(host.getAttribute('role')).toBe('status');
    expect(host.getAttribute('aria-live')).toBe('polite');
    expect(host.getAttribute('aria-atomic')).toBe('true');
    expect(host.getAttribute('data-empty-state-variant')).toBe('no-data');
    expect(host.getAttribute('data-theme')).toBeNull();
    expect(host.getAttribute('dir')).toBeNull();

    expect(
      host.querySelector('[data-empty-state-part="title"]')?.textContent?.trim(),
    ).toBe(ERP_EMPTY_STATE_SCENARIOS['no-data'].title);
    expect(
      host
        .querySelector('[data-empty-state-part="description"]')
        ?.textContent?.trim(),
    ).toBe(ERP_EMPTY_STATE_SCENARIOS['no-data'].description);
    expect(host.querySelectorAll('[data-empty-state-action="primary"]')).toHaveLength(1);
    expect(host.querySelector('[data-empty-state-action="secondary"]')).toBeNull();
    expect(host.querySelector('[data-empty-state-action="tertiary"]')).toBeNull();
    expect(host.querySelector('[data-empty-state-part="extra"]')).not.toBeNull();
    expect(
      host
        .querySelector('erp-empty-state-lottie')
        ?.getAttribute('data-empty-state-lottie-asset'),
    ).toBe(ERP_EMPTY_STATE_LOTTIE_ASSETS['no-data']);
    expect(
      host.querySelector('.empty-state__illustration svg'),
    ).toBeNull();
  });

  it('implements all five reference variants with their exact scenario defaults', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    const variants: readonly ErpEmptyStateVariant[] = [
      'no-data',
      'no-search',
      'error',
      'forbidden',
      'custom',
    ];

    for (const variant of variants) {
      fixture.componentRef.setInput('variant', variant);
      fixture.detectChanges();

      const defaults = ERP_EMPTY_STATE_SCENARIOS[variant];
      expect(host.getAttribute('data-empty-state-variant')).toBe(variant);
      expect(
        host.querySelector('[data-empty-state-part="title"]')?.textContent?.trim(),
      ).toBe(defaults.title);
      expect(
        host
          .querySelector('[data-empty-state-part="description"]')
          ?.textContent?.trim(),
      ).toBe(defaults.description);
      expect(
        Boolean(host.querySelector('[data-empty-state-part="illustration"]')),
      ).toBe(defaults.showIllustration);
      expect(
        Boolean(host.querySelector('[data-empty-state-action="primary"]')),
      ).toBe(defaults.showPrimaryAction);
      expect(
        Boolean(host.querySelector('[data-empty-state-action="secondary"]')),
      ).toBe(defaults.showSecondaryAction);
      expect(
        Boolean(host.querySelector('[data-empty-state-action="tertiary"]')),
      ).toBe(defaults.showTertiaryAction);
      expect(Boolean(host.querySelector('[data-empty-state-part="extra"]'))).toBe(
        defaults.showExtra,
      );
    }
  });

  it('keeps the dedicated no-search illustration available when its part override is enabled', () => {
    const fixture = create();
    fixture.componentRef.setInput('variant', 'no-search');
    fixture.componentRef.setInput('showIllustration', true);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(
      host
        .querySelector('erp-empty-state-lottie')
        ?.getAttribute('data-empty-state-lottie-asset'),
    ).toBe(ERP_EMPTY_STATE_LOTTIE_ASSETS['no-search']);
  });

  it('maps every variant to its exact Product Owner Lottie asset', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    const variants: readonly ErpEmptyStateVariant[] = [
      'no-data',
      'no-search',
      'error',
      'forbidden',
      'custom',
    ];

    expect(ERP_EMPTY_STATE_LOTTIE_ASSETS).toEqual({
      'no-data': '/lottie/empty-state/no-data.json',
      'no-search': '/lottie/empty-state/no-search.json',
      error: '/lottie/empty-state/error.json',
      forbidden: '/lottie/empty-state/forbidden.json',
      custom: '/lottie/empty-state/custom.json',
    });

    for (const variant of variants) {
      fixture.componentRef.setInput('variant', variant);
      fixture.componentRef.setInput('showIllustration', true);
      fixture.detectChanges();

      expect(
        host
          .querySelector('erp-empty-state-lottie')
          ?.getAttribute('data-empty-state-lottie-asset'),
      ).toBe(ERP_EMPTY_STATE_LOTTIE_ASSETS[variant]);
    }
  });

  it('supports independent visibility overrides for every component region and action', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;

    fixture.componentRef.setInput('variant', 'custom');
    fixture.componentRef.setInput('showIllustration', false);
    fixture.componentRef.setInput('showTitle', false);
    fixture.componentRef.setInput('showDescription', false);
    fixture.componentRef.setInput('showActions', false);
    fixture.componentRef.setInput('showExtra', false);
    fixture.detectChanges();

    expect(host.querySelector('[data-empty-state-part="illustration"]')).toBeNull();
    expect(host.querySelector('[data-empty-state-part="title"]')).toBeNull();
    expect(host.querySelector('[data-empty-state-part="description"]')).toBeNull();
    expect(host.querySelector('[data-empty-state-part="actions"]')).toBeNull();
    expect(host.querySelector('[data-empty-state-part="extra"]')).toBeNull();

    fixture.componentRef.setInput('showActions', true);
    fixture.componentRef.setInput('showPrimaryAction', false);
    fixture.componentRef.setInput('showSecondaryAction', true);
    fixture.componentRef.setInput('showTertiaryAction', false);
    fixture.detectChanges();

    expect(host.querySelector('[data-empty-state-action="primary"]')).toBeNull();
    expect(host.querySelector('[data-empty-state-action="secondary"]')).not.toBeNull();
    expect(host.querySelector('[data-empty-state-action="tertiary"]')).toBeNull();
  });

  it('allows live title, description, and action-label customization', () => {
    const fixture = create();
    fixture.componentRef.setInput('title', 'عنوان مخصص');
    fixture.componentRef.setInput('description', 'وصف مخصص بالكامل.');
    fixture.componentRef.setInput('primaryActionLabel', 'نفّذ الآن');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(
      host.querySelector('[data-empty-state-part="title"]')?.textContent?.trim(),
    ).toBe('عنوان مخصص');
    expect(
      host
        .querySelector('[data-empty-state-part="description"]')
        ?.textContent?.trim(),
    ).toBe('وصف مخصص بالكامل.');
    expect(
      host
        .querySelector('[data-empty-state-action="primary"]')
        ?.textContent?.trim(),
    ).toContain('نفّذ الآن');
  });

  it('publishes primary, secondary, and tertiary actions through ErpButton only', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    fixture.componentRef.setInput('variant', 'custom');
    fixture.detectChanges();

    const primary = vi.fn();
    const secondary = vi.fn();
    const tertiary = vi.fn();
    control.primaryAction.subscribe(primary);
    control.secondaryAction.subscribe(secondary);
    control.tertiaryAction.subscribe(tertiary);

    const host = fixture.nativeElement as HTMLElement;
    host
      .querySelector<HTMLButtonElement>(
        '[data-empty-state-action="primary"] button',
      )
      ?.click();
    host
      .querySelector<HTMLButtonElement>(
        '[data-empty-state-action="secondary"] button',
      )
      ?.click();
    host
      .querySelector<HTMLButtonElement>(
        '[data-empty-state-action="tertiary"] button',
      )
      ?.click();

    expect(primary).toHaveBeenCalledOnce();
    expect(secondary).toHaveBeenCalledOnce();
    expect(tertiary).toHaveBeenCalledOnce();
    expect(host.querySelector('.empty-state__actions > button')).toBeNull();
  });

  it('exposes animation, motion, and speed contracts without owning theme or direction', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;

    fixture.componentRef.setInput('animated', true);
    fixture.componentRef.setInput('illustrationMotion', 'pulse');
    fixture.componentRef.setInput('motionSpeed', 1.5);
    fixture.detectChanges();

    expect(host.getAttribute('data-empty-state-animated')).toBe('true');
    expect(host.getAttribute('data-empty-state-motion')).toBe('pulse');
    expect(host.getAttribute('data-empty-state-motion-speed')).toBe('1.5');
    expect(host.querySelector('.empty-state')?.classList.contains('is-entering')).toBe(
      true,
    );

    fixture.componentRef.setInput('animated', false);
    fixture.detectChanges();
    expect(host.querySelector('.empty-state')?.classList.contains('is-entering')).toBe(
      false,
    );
  });

  it('uses projected illustration and extra regions instead of creating default Lottie', async () => {
    const fixture = TestBed.createComponent(ProjectionHost);
    fixture.detectChanges();
    await fixture.whenStable();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('[data-custom-illustration]')?.textContent).toContain(
      'Custom art',
    );
    expect(host.querySelector('erp-empty-state-lottie')).toBeNull();
    expect(player.loadAnimation).not.toHaveBeenCalled();
    expect(host.querySelector('[data-custom-extra]')?.textContent).toContain(
      'Custom extra',
    );
    expect(host.querySelector('.empty-state__default-extra')).toBeNull();
  });

  it('replays the Lottie illustration with the existing entrance API', async () => {
    const fixture = create();
    await vi.waitFor(() => {
      expect(player.loadAnimation).toHaveBeenCalledOnce();
    });

    fixture.componentInstance.replayEntrance();

    expect(animation.goToAndPlay).toHaveBeenCalledWith(0, true);
  });

});
