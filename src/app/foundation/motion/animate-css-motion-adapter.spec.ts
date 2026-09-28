import {
  AnimateCssMotionAdapter,
  resolveAnimateCssEffect,
} from './animate-css-motion-adapter';
import {ERP_MOTION_PRESETS} from './motion-contracts';

describe('AnimateCssMotionAdapter', () => {
  let adapter: AnimateCssMotionAdapter;
  let matchMediaDescriptor: PropertyDescriptor | undefined;

  beforeEach(() => {
    adapter = new AnimateCssMotionAdapter();
    matchMediaDescriptor = Object.getOwnPropertyDescriptor(window, 'matchMedia');
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockReturnValue({matches: false} as MediaQueryList),
    });
  });

  afterEach(() => {
    if (matchMediaDescriptor) {
      Object.defineProperty(window, 'matchMedia', matchMediaDescriptor);
    } else {
      delete (window as Partial<Window>).matchMedia;
    }
  });

  it('maps every system preset to enter and exit effects', () => {
    for (const preset of ERP_MOTION_PRESETS) {
      expect(resolveAnimateCssEffect(preset, 'enter', 'ltr')).toBeTruthy();
      expect(resolveAnimateCssEffect(preset, 'exit', 'ltr')).toBeTruthy();
    }
  });

  it('reverses logical horizontal effects between LTR and RTL', () => {
    expect(resolveAnimateCssEffect('fade-start', 'enter', 'ltr')).toBe(
      'fadeInLeft',
    );
    expect(resolveAnimateCssEffect('fade-start', 'enter', 'rtl')).toBe(
      'fadeInRight',
    );
    expect(resolveAnimateCssEffect('slide-end', 'exit', 'ltr')).toBe(
      'slideOutRight',
    );
    expect(resolveAnimateCssEffect('slide-end', 'exit', 'rtl')).toBe(
      'slideOutLeft',
    );
  });

  it('keeps vertical slide names aligned with their visible movement direction', () => {
    expect(resolveAnimateCssEffect('slide-up', 'enter', 'ltr')).toBe(
      'slideInUp',
    );
    expect(resolveAnimateCssEffect('slide-up', 'exit', 'ltr')).toBe(
      'slideOutUp',
    );
    expect(resolveAnimateCssEffect('slide-down', 'enter', 'rtl')).toBe(
      'slideInDown',
    );
    expect(resolveAnimateCssEffect('slide-down', 'exit', 'rtl')).toBe(
      'slideOutDown',
    );
  });

  it('applies duration, completes on animationend, and cleans classes', () => {
    const element = document.createElement('div');
    const completed = vi.fn();

    adapter.start({
      element,
      preset: 'zoom-up',
      phase: 'enter',
      direction: 'ltr',
      durationMs: 360,
      completed,
    });

    expect(element.classList.contains('animate__animated')).toBe(true);
    expect(element.classList.contains('animate__zoomInUp')).toBe(true);
    expect(element.style.getPropertyValue('--animate-duration')).toBe('360ms');

    element.dispatchEvent(new Event('animationend'));

    expect(completed).toHaveBeenCalledOnce();
    expect(element.classList.contains('animate__animated')).toBe(false);
    expect(element.classList.contains('animate__zoomInUp')).toBe(false);
    expect(element.style.getPropertyValue('--animate-duration')).toBe('');
  });

  it('cancels prior motion before replay without completing it', () => {
    const element = document.createElement('div');
    const firstCompleted = vi.fn();
    const secondCompleted = vi.fn();

    adapter.start({
      element,
      preset: 'fade',
      phase: 'enter',
      direction: 'ltr',
      durationMs: 320,
      completed: firstCompleted,
    });
    adapter.start({
      element,
      preset: 'roll',
      phase: 'exit',
      direction: 'ltr',
      durationMs: 220,
      completed: secondCompleted,
    });

    expect(firstCompleted).not.toHaveBeenCalled();
    expect(element.classList.contains('animate__fadeIn')).toBe(false);
    expect(element.classList.contains('animate__rollOut')).toBe(true);

    element.dispatchEvent(new Event('animationend'));
    expect(secondCompleted).toHaveBeenCalledOnce();
  });

  it('completes reduced motion deterministically without vendor classes', async () => {
    vi.mocked(window.matchMedia).mockReturnValue({
      matches: true,
    } as MediaQueryList);
    const element = document.createElement('div');
    const completed = vi.fn();

    adapter.start({
      element,
      preset: 'bounce',
      phase: 'enter',
      direction: 'rtl',
      durationMs: 320,
      completed,
    });

    expect(element.className).toBe('');
    await Promise.resolve();
    expect(completed).toHaveBeenCalledOnce();
  });
});
