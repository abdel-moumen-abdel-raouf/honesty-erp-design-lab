import {TestBed} from '@angular/core/testing';
import {ErpOverlayConfig, ErpOverlayFrameConfig} from '../overlay-contracts';
import {ErpOverlayRef} from '../overlay-ref';
import {ErpOverlayFrame} from './overlay-frame';

const FRAME: ErpOverlayFrameConfig = {
  header: {
    title: 'عنوان النافذة',
    subtitle: 'وصف داعم للنافذة',
    icon: 'info',
  },
  footer: {
    primary: {label: 'تطبيق', icon: 'check'},
    secondary: {label: 'إلغاء'},
  },
};

const CONFIG: Readonly<ErpOverlayConfig> = Object.freeze({
  kind: 'modal',
  position: 'center',
  size: 'md',
  frame: FRAME,
  legacyCompactMenuLabel: null,
  dismissOnEscape: false,
  dismissOnBackdrop: false,
  blur: 'low',
  backdropTone: 'default',
  enterAnimation: 'fade-scale',
  exitAnimation: 'fade-scale',
  restoreFocus: true,
  trapFocus: true,
  blocking: true,
  initialFocus: null,
  data: undefined,
});

describe('ErpOverlayFrame', () => {
  function create(frame = FRAME) {
    const requestClose = vi.fn(() => true);
    const ref = new ErpOverlayRef('frame-proof', CONFIG, requestClose);
    const fixture = TestBed.createComponent(ErpOverlayFrame);
    fixture.componentRef.setInput('config', frame);
    fixture.componentRef.setInput('ref', ref);
    fixture.detectChanges();
    return {fixture, ref, requestClose};
  }

  beforeEach(() => TestBed.configureTestingModule({imports: [ErpOverlayFrame]}));

  it('renders semantic header evidence, default close label, and fixed body/footer regions', () => {
    const {fixture} = create();
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('#frame-proof-title')?.textContent?.trim()).toBe(
      'عنوان النافذة',
    );
    expect(root.querySelector('#frame-proof-subtitle')?.textContent?.trim()).toBe(
      'وصف داعم للنافذة',
    );
    expect(root.querySelector('.overlay-frame__header erp-icon')?.getAttribute('data-icon-name')).toBe('info');
    expect(root.querySelector('[data-overlay-frame-close]')?.getAttribute('data-icon-button-state')).toBe('ready');
    expect(root.querySelector('[data-overlay-frame-close] button')?.getAttribute('aria-label')).toBe('إغلاق');
    expect(root.querySelector('.overlay-frame__body')).not.toBeNull();
    expect(root.querySelector('.overlay-frame__footer')).not.toBeNull();
    expect(getComputedStyle(root.querySelector('.overlay-frame__body') as HTMLElement).overflow).toBe('auto');
  });

  it('dismisses close with the fixed close-action reason', () => {
    const {fixture, requestClose} = create();
    (fixture.nativeElement as HTMLElement)
      .querySelector<HTMLButtonElement>('[data-overlay-frame-close] button')
      ?.click();

    expect(requestClose).toHaveBeenCalledWith({
      type: 'dismissed',
      reason: 'close-action',
    });
  });

  it('routes primary and secondary controls through the frame action channel', () => {
    const {fixture, ref} = create();
    const primary = vi.fn();
    const secondary = vi.fn();
    ref.registerFrameAction('primary', primary);
    ref.registerFrameAction('secondary', secondary);
    const root = fixture.nativeElement as HTMLElement;

    root.querySelector<HTMLButtonElement>('[data-overlay-frame-primary] button')?.click();
    root.querySelector<HTMLButtonElement>('[data-overlay-frame-secondary] button')?.click();

    expect(primary).toHaveBeenCalledOnce();
    expect(secondary).toHaveBeenCalledOnce();
  });

  it('honors configured close and footer action presentation', () => {
    const {fixture} = create({
      header: {...FRAME.header, closeLabel: 'إغلاق النافذة'},
      footer: {
        primary: {...FRAME.footer.primary, disabled: true},
        secondary: {...FRAME.footer.secondary, loading: true},
      },
    });
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('[data-overlay-frame-close] button')?.getAttribute('aria-label')).toBe('إغلاق النافذة');
    expect(root.querySelector<HTMLButtonElement>('[data-overlay-frame-primary] button')?.disabled).toBe(true);
    expect(root.querySelector('[data-overlay-frame-secondary]')?.getAttribute('data-button-state')).toBe('loading');
  });
});
