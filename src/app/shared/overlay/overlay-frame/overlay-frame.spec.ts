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
    actions: [
      {id: 'clear', label: 'مسح', icon: 'delete', presentation: 'icon-button', role: 'utility', placement: 'start'},
      {id: 'cancel', label: 'إلغاء', role: 'secondary', placement: 'end'},
      {id: 'apply', label: 'تطبيق', icon: 'check', role: 'primary', placement: 'end'},
    ],
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
  enterAnimation: 'flip-x',
  exitAnimation: 'flip-x',
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

    const clear = root.querySelector<HTMLElement>(
      '[data-overlay-frame-action-id="clear"]',
    );
    expect(clear?.tagName).toBe('ERP-ICON-BUTTON');
    expect(clear?.getAttribute('data-icon-button-state')).toBe('ready');
    expect(clear?.querySelector('button')?.getAttribute('aria-label')).toBe('مسح');
    expect(clear?.closest('erp-tooltip')).not.toBeNull();

    const frame = root.querySelector('.overlay-frame') as HTMLElement;
    const header = root.querySelector('.overlay-frame__header') as HTMLElement;
    const body = root.querySelector('.overlay-frame__body') as HTMLElement;
    const footer = root.querySelector('.overlay-frame__footer') as HTMLElement;

    expect(frame).not.toBeNull();
    expect(body).not.toBeNull();
    expect(footer).not.toBeNull();
    expect(getComputedStyle(root).display).toBe('block');
    expect(getComputedStyle(root).blockSize).toBe('100%');
    expect(getComputedStyle(frame).blockSize).toBe('100%');
    expect(getComputedStyle(body).overflow).toBe('auto');
    expect(getComputedStyle(header).borderBlockEndWidth).not.toBe('0px');
    expect(getComputedStyle(footer).borderBlockStartWidth).not.toBe('0px');
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

  it('routes ordered action IDs through the frame action channel', () => {
    const {fixture, ref} = create();
    const primary = vi.fn();
    const secondary = vi.fn();
    ref.registerFrameAction('apply', primary);
    ref.registerFrameAction('cancel', secondary);
    const root = fixture.nativeElement as HTMLElement;

    root.querySelector<HTMLButtonElement>('[data-overlay-frame-action-id="apply"] button')?.click();
    root.querySelector<HTMLButtonElement>('[data-overlay-frame-action-id="cancel"] button')?.click();

    expect(primary).toHaveBeenCalledOnce();
    expect(secondary).toHaveBeenCalledOnce();
  });

  it('honors configured close and footer action presentation', () => {
    const {fixture} = create({
      header: {...FRAME.header, closeLabel: 'إغلاق النافذة'},
      footer: {
        actions: FRAME.footer.actions.map((action) =>
          action.id === 'apply'
            ? {...action, disabled: true}
            : action.id === 'cancel'
              ? {...action, loading: true}
              : action,
        ),
      },
    });
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('[data-overlay-frame-close] button')?.getAttribute('aria-label')).toBe('إغلاق النافذة');
    expect(root.querySelector<HTMLButtonElement>('[data-overlay-frame-action-id="apply"] button')?.disabled).toBe(true);
    expect(root.querySelector('[data-overlay-frame-action-id="cancel"]')?.getAttribute('data-button-state')).toBe('loading');
  });

  it('reacts to runtime disabled and loading action state under OnPush', () => {
    const {fixture, ref} = create();
    const root = fixture.nativeElement as HTMLElement;

    ref.updateFrameActionState('clear', {disabled: true, loading: true});
    fixture.detectChanges();

    const clear = root.querySelector<HTMLElement>(
      '[data-overlay-frame-action-id="clear"]',
    );
    expect(clear?.getAttribute('data-icon-button-state')).toBe('loading');
    expect(clear?.querySelector<HTMLButtonElement>('button')?.disabled).toBe(true);
  });
});
