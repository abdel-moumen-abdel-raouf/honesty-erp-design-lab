import {TestBed} from '@angular/core/testing';
import {ErpUserMenu} from './user-menu';

describe('ErpUserMenu', () => {
  function installPopover(surface: HTMLElement): void {
    Object.defineProperties(surface, {
      hidePopover: {configurable: true, value: vi.fn()},
      showPopover: {configurable: true, value: vi.fn()},
    });
  }

  it('composes Avatar, opens an anchored action list, and emits enabled actions', () => {
    const fixture = TestBed.createComponent(ErpUserMenu);
    fixture.componentRef.setInput('user', {
      displayName: 'أحمد علي',
      secondaryText: 'ahmed@example.com',
    });
    fixture.componentRef.setInput('items', [
      {id: 'profile', label: 'الملف الشخصي', icon: 'user'},
      {id: 'blocked', label: 'غير متاح', disabled: true, dividerBefore: true},
    ]);
    const activated = vi.fn();
    fixture.componentInstance.actionActivated.subscribe(activated);
    fixture.detectChanges();
    installPopover(fixture.nativeElement.querySelector('.user-menu__surface'));

    expect(fixture.nativeElement.querySelector('erp-avatar')).not.toBeNull();
    expect(
      fixture.nativeElement.querySelector('erp-avatar .avatar__frame'),
    ).not.toBeNull();
    expect(
      fixture.nativeElement.querySelector(
        'erp-avatar[data-avatar-presentation="user-menu-trigger"]',
      ),
    ).not.toBeNull();
    expect(
      fixture.nativeElement.querySelector(
        'header erp-avatar[data-avatar-presentation="user-menu-identity"]',
      ),
    ).not.toBeNull();
    expect(fixture.nativeElement.querySelectorAll('erp-divider')).toHaveLength(2);
    expect(
      fixture.nativeElement.querySelectorAll(
        'erp-button[data-button-presentation="user-menu-action"]',
      ),
    ).toHaveLength(2);
    const trigger = fixture.nativeElement.querySelector(
      '.user-menu__trigger erp-button button',
    ) as HTMLButtonElement;
    trigger.click();
    expect(fixture.componentInstance.open()).toBe(true);
    (fixture.nativeElement.querySelector('.user-menu__items erp-button button') as HTMLButtonElement)
      .click();
    expect(activated).toHaveBeenCalledWith(
      expect.objectContaining({id: 'profile'}),
    );
    expect(fixture.componentInstance.open()).toBe(false);
  });

  it('closes on outside pointer interaction', () => {
    const fixture = TestBed.createComponent(ErpUserMenu);
    fixture.componentRef.setInput('user', {displayName: 'أحمد علي'});
    fixture.detectChanges();
    installPopover(fixture.nativeElement.querySelector('.user-menu__surface'));
    (fixture.nativeElement.querySelector('.user-menu__trigger button') as HTMLButtonElement)
      .click();
    document.body.dispatchEvent(new PointerEvent('pointerdown', {bubbles: true}));
    expect(fixture.componentInstance.open()).toBe(false);
  });

  it('ignores disabled items and restores trigger focus on Escape', () => {
    const fixture = TestBed.createComponent(ErpUserMenu);
    fixture.componentRef.setInput('user', {displayName: 'أحمد علي'});
    fixture.componentRef.setInput('items', [
      {id: 'blocked', label: 'غير متاح', disabled: true},
    ]);
    const activated = vi.fn();
    fixture.componentInstance.actionActivated.subscribe(activated);
    fixture.detectChanges();
    installPopover(fixture.nativeElement.querySelector('.user-menu__surface'));
    const trigger = fixture.nativeElement.querySelector(
      '.user-menu__trigger button',
    ) as HTMLButtonElement;

    trigger.click();
    (fixture.nativeElement.querySelector('.user-menu__items erp-button button') as HTMLButtonElement)
      .click();
    expect(activated).not.toHaveBeenCalled();
    expect(fixture.componentInstance.open()).toBe(true);

    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}));
    expect(fixture.componentInstance.open()).toBe(false);
    expect(document.activeElement).toBe(trigger);
  });

  it('opens with ArrowDown and moves focus to the first enabled action', async () => {
    const fixture = TestBed.createComponent(ErpUserMenu);
    fixture.componentRef.setInput('user', {displayName: 'أحمد علي'});
    fixture.componentRef.setInput('items', [
      {id: 'blocked', label: 'غير متاح', disabled: true},
      {id: 'profile', label: 'الملف الشخصي', icon: 'user'},
    ]);
    fixture.detectChanges();
    installPopover(fixture.nativeElement.querySelector('.user-menu__surface'));
    const trigger = fixture.nativeElement.querySelector(
      '.user-menu__trigger button',
    ) as HTMLButtonElement;
    const enabledAction = fixture.nativeElement.querySelectorAll(
      '.user-menu__items button',
    )[1] as HTMLButtonElement;

    trigger.dispatchEvent(
      new KeyboardEvent('keydown', {key: 'ArrowDown', bubbles: true}),
    );
    await Promise.resolve();

    expect(fixture.componentInstance.open()).toBe(true);
    expect(document.activeElement).toBe(enabledAction);
  });

  it('cycles keyboard focus across enabled action rows', async () => {
    const fixture = TestBed.createComponent(ErpUserMenu);
    fixture.componentRef.setInput('user', {displayName: 'أحمد علي'});
    fixture.componentRef.setInput('items', [
      {id: 'profile', label: 'الملف الشخصي', icon: 'user'},
      {id: 'blocked', label: 'غير متاح', disabled: true},
      {id: 'logout', label: 'تسجيل الخروج', icon: 'logout'},
    ]);
    fixture.detectChanges();
    installPopover(fixture.nativeElement.querySelector('.user-menu__surface'));
    const trigger = fixture.nativeElement.querySelector(
      '.user-menu__trigger button',
    ) as HTMLButtonElement;
    const enabledActions = fixture.nativeElement.querySelectorAll(
      '.user-menu__items button:not(:disabled)',
    ) as NodeListOf<HTMLButtonElement>;

    trigger.dispatchEvent(
      new KeyboardEvent('keydown', {key: 'ArrowUp', bubbles: true}),
    );
    await Promise.resolve();
    expect(document.activeElement).toBe(enabledActions[1]);

    enabledActions[1].dispatchEvent(
      new KeyboardEvent('keydown', {key: 'ArrowDown', bubbles: true}),
    );
    expect(document.activeElement).toBe(enabledActions[0]);
  });

  it('applies the measured cross-axis arrow center when the popup is viewport-clamped', () => {
    const previousViewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    const requestFrame = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback) => {
        callback(0);
        return 1;
      });
    const fixture = TestBed.createComponent(ErpUserMenu);
    fixture.componentRef.setInput('user', {displayName: 'أميرة حداد'});
    fixture.detectChanges();

    const triggerHost = fixture.nativeElement.querySelector(
      '.user-menu__trigger-action',
    ) as HTMLElement;
    const surface = fixture.nativeElement.querySelector(
      '.user-menu__surface',
    ) as HTMLElement;
    installPopover(surface);
    triggerHost.style.direction = 'rtl';
    surface.style.setProperty('--honesty-user-menu-arrow-size', '13px');
    surface.style.setProperty('--honesty-user-menu-arrow-offset', '16px');
    surface.style.setProperty('--honesty-user-menu-anchor-gap', '2px');
    surface.style.setProperty('--honesty-user-menu-viewport-inset', '8px');
    vi.spyOn(triggerHost, 'getBoundingClientRect').mockReturnValue({
      left: 320,
      top: 240,
      right: 360,
      bottom: 280,
      width: 40,
      height: 40,
      x: 320,
      y: 240,
      toJSON: () => ({}),
    });
    vi.spyOn(surface, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      right: 360,
      bottom: 180,
      width: 360,
      height: 180,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });
    Object.defineProperties(window, {
      innerWidth: {configurable: true, value: 400},
      innerHeight: {configurable: true, value: 300},
    });

    try {
      (fixture.nativeElement.querySelector(
        '.user-menu__trigger button',
      ) as HTMLButtonElement).click();

      expect(surface.dataset['overlayPlacement']).toBe('top');
      expect(
        surface.style.getPropertyValue(
          '--honesty-anchored-surface-arrow-cross-axis-center',
        ),
      ).toBe('308px');
    } finally {
      Object.defineProperties(window, {
        innerWidth: {configurable: true, value: previousViewport.width},
        innerHeight: {configurable: true, value: previousViewport.height},
      });
      requestFrame.mockRestore();
    }
  });
});
