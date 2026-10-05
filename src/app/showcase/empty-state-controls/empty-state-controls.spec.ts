import {TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import type {AnimationItem, LottiePlayer} from 'lottie-web';
import {routes} from '../../app.routes';
import {EMPTY_STATE_LOTTIE_LOADER} from '../../controls/empty-state/empty-state-lottie';
import {EmptyStateControls} from './empty-state-controls';

describe('EmptyStateControls showcase', () => {
  beforeEach(() => {
    const animation = {
      destroy: vi.fn(),
      goToAndPlay: vi.fn(),
      goToAndStop: vi.fn(),
      play: vi.fn(),
      setSpeed: vi.fn(),
    } as unknown as AnimationItem;
    const player = {
      loadAnimation: vi.fn(() => animation),
    } as unknown as LottiePlayer;

    TestBed.configureTestingModule({
      imports: [EmptyStateControls],
      providers: [
        provideRouter(routes),
        {
          provide: EMPTY_STATE_LOTTIE_LOADER,
          useValue: async () => player,
        },
      ],
    });
  });

  function create() {
    const fixture = TestBed.createComponent(EmptyStateControls);
    fixture.detectChanges();
    return fixture;
  }

  it('has the dedicated /controls/empty-states route and creates', () => {
    expect(
      routes.find((route) => route.path === 'controls/empty-states'),
    ).toBeDefined();
    expect(create().componentInstance).toBeTruthy();
  });

  it('renders the full exact-reference control surface with no local theme authority', () => {
    const root = create().nativeElement as HTMLElement;

    expect(root.querySelector('[data-empty-state-interactive-preview]')).not.toBeNull();
    expect(root.querySelector('[data-empty-state-scenario-matrix]')).not.toBeNull();
    expect(root.querySelectorAll('erp-empty-state')).toHaveLength(6);
    expect(root.querySelectorAll('[data-theme]')).toHaveLength(0);
    expect(root.querySelectorAll('erp-review-select')).toHaveLength(4);
    expect(root.querySelectorAll('erp-check-box')).toHaveLength(9);
  });

  it('renders all five reference variants in the scenario matrix', () => {
    const root = create().nativeElement as HTMLElement;
    const matrix = root.querySelector('[data-empty-state-scenario-matrix]')!;

    expect(
      [...matrix.querySelectorAll<HTMLElement>('erp-empty-state')].map(
        (item) => item.getAttribute('data-empty-state-variant'),
      ),
    ).toEqual(['no-data', 'no-search', 'error', 'forbidden', 'custom']);
  });

  it('applies reference scenario defaults to the interactive preview', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const root = fixture.nativeElement as HTMLElement;

    control.applyScenario('error');
    fixture.detectChanges();

    const preview = root.querySelector<HTMLElement>(
      '[data-empty-state-interactive-preview] erp-empty-state',
    )!;
    expect(preview.getAttribute('data-empty-state-variant')).toBe('error');
    expect(
      preview
        .querySelector('erp-empty-state-lottie')
        ?.getAttribute('data-empty-state-lottie-asset'),
    ).toBe('/lottie/empty-state/error.json');
    expect(preview.querySelector('[data-empty-state-action="primary"]')).not.toBeNull();
    expect(preview.querySelector('[data-empty-state-action="tertiary"]')).not.toBeNull();
    expect(preview.querySelector('[data-empty-state-action="secondary"]')).toBeNull();
  });

  it('records production action outputs from the preview', () => {
    const fixture = create();
    const root = fixture.nativeElement as HTMLElement;
    const preview = root.querySelector(
      '[data-empty-state-interactive-preview] erp-empty-state',
    )!;

    preview
      .querySelector<HTMLButtonElement>(
        '[data-empty-state-action="primary"] button',
      )
      ?.click();
    fixture.detectChanges();

    expect(
      root.querySelector('[data-empty-state-last-action]')?.textContent?.trim(),
    ).toBe('تم استقبال الإجراء الأساسي.');
  });

  it('keeps RTL/LTR evidence external to the EmptyState component itself', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const root = fixture.nativeElement as HTMLElement;
    const stage = root.querySelector<HTMLElement>(
      '[data-empty-state-interactive-preview]',
    )!;
    const emptyState = stage.querySelector('erp-empty-state')!;

    expect(stage.getAttribute('dir')).toBe('rtl');
    expect(emptyState.hasAttribute('dir')).toBe(false);

    control.direction.set('ltr');
    fixture.detectChanges();

    expect(stage.getAttribute('dir')).toBe('ltr');
    expect(emptyState.hasAttribute('dir')).toBe(false);
  });
});
