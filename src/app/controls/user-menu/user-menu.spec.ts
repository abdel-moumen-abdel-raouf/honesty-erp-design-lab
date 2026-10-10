import {TestBed} from '@angular/core/testing';
import {ErpAvatar} from '../avatar/avatar';
import {ErpUserMenu} from './user-menu';

describe('ErpUserMenu', () => {
  function installPopover(surface: HTMLElement): void {
    Object.defineProperties(surface, {
      hidePopover: {configurable: true, value: vi.fn()},
      showPopover: {configurable: true, value: vi.fn()},
    });
  }

  it('renders the rich identity in the authorized order and keeps the full name accessible', () => {
    const fixture = TestBed.createComponent(ErpUserMenu);
    const fullName = 'نادية عبد الرحمن فؤاد مسؤولة المشتريات الإقليمية';
    fixture.componentRef.setInput('user', {
      displayName: fullName,
      secondaryText: 'إدارة سلاسل الإمداد',
      email: 'nadia.abdelrahman@honesty.example',
      roleLabel: 'مسؤولة المشتريات الإقليمية',
      branchLabel: 'فرع القاهرة الجديدة',
      avatarSrc: '/assets/honesty-erp-avatars/users/female/avatar-21.png',
      avatarPresence: 'online',
    });
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector(
      '.user-menu__trigger button',
    ) as HTMLButtonElement;
    const header = fixture.nativeElement.querySelector(
      '.user-menu__identity-header',
    ) as HTMLElement;
    const avatar = header.querySelector('erp-avatar') as HTMLElement;
    const name = header.querySelector('.user-menu__identity-name') as HTMLElement;
    const email = header.querySelector('.user-menu__email') as HTMLElement;
    const badges = header.querySelector('.user-menu__badges') as HTMLElement;
    const secondary = header.querySelector(
      '.user-menu__identity > erp-text:last-child',
    ) as HTMLElement;
    const triggerIdentity = fixture.nativeElement.querySelector(
      '.user-menu__trigger-identity',
    ) as HTMLElement;
    const triggerName = triggerIdentity.querySelector(
      '.user-menu__trigger-name',
    ) as HTMLElement;
    const triggerEmail = triggerIdentity.querySelector(
      '.user-menu__email',
    ) as HTMLElement;
    const triggerBadges = triggerIdentity.querySelectorAll(
      '.user-menu__badges--trigger erp-status-badge',
    );
    const triggerMetadata = triggerIdentity.querySelector(
      '.user-menu__trigger-metadata',
    ) as HTMLElement;
    const triggerEmailAddress = triggerEmail.querySelector(
      '.user-menu__email-address',
    ) as HTMLElement;

    expect(trigger.textContent).toContain(fullName);
    expect(
      fixture.nativeElement.querySelector('.user-menu__trigger-name')
        .getAttribute('data-text-overflow'),
    ).toBe('ellipsis');
    expect(avatar.getAttribute('data-avatar-presence')).toBe('online');
    expect(email.getAttribute('dir')).toBeNull();
    expect(email.querySelector('.user-menu__email-address')?.getAttribute('dir')).toBe('ltr');
    expect(header.querySelectorAll('erp-status-badge')).toHaveLength(2);
    expect(avatar.compareDocumentPosition(name) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(name.compareDocumentPosition(email) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(email.compareDocumentPosition(badges) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(badges.compareDocumentPosition(secondary) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(triggerName.compareDocumentPosition(triggerEmail) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(triggerEmail.compareDocumentPosition(triggerMetadata) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(triggerEmail.getAttribute('dir')).toBeNull();
    expect(triggerEmailAddress.getAttribute('dir')).toBe('ltr');
    expect(triggerMetadata.querySelector('.user-menu__trigger-secondary')).toBeNull();
    expect(triggerBadges).toHaveLength(2);
    expect(triggerIdentity.children).toHaveLength(3);
  });

  it('shows trigger and popup role and branch badges by default without rendering secondary text in the trigger', () => {
    const fixture = TestBed.createComponent(ErpUserMenu);
    fixture.componentRef.setInput('user', {
      displayName: 'أميرة حداد',
      secondaryText: 'الحساب المؤسسي',
      email: 'amira@honesty.example',
      roleLabel: 'مديرة المالية',
      branchLabel: 'الفرع الرئيسي',
    });
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelectorAll(
        '.user-menu__badges--trigger erp-status-badge',
      ),
    ).toHaveLength(2);
    expect(
      fixture.nativeElement.querySelectorAll(
        '.user-menu__identity-header .user-menu__badges erp-status-badge',
      ),
    ).toHaveLength(2);
    expect(
      fixture.nativeElement.querySelector('.user-menu__trigger-identity').children,
    ).toHaveLength(3);
    expect(
      fixture.nativeElement.querySelector('.user-menu__trigger-secondary'),
    ).toBeNull();
    expect(
      fixture.nativeElement.querySelector('.user-menu__trigger-metadata')?.textContent,
    ).not.toContain('الحساب المؤسسي');
  });

  it('controls trigger role and branch badges independently within the third row', () => {
    const fixture = TestBed.createComponent(ErpUserMenu);
    fixture.componentRef.setInput('user', {
      displayName: 'أميرة حداد',
      secondaryText: 'الحساب المؤسسي',
      email: 'amira@honesty.example',
      roleLabel: 'مديرة المالية',
      branchLabel: 'الفرع الرئيسي',
    });

    const triggerBadgeLabels = (): string[] => Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
        '.user-menu__badges--trigger erp-status-badge',
      ),
    ).map((badge) => badge.getAttribute('aria-label') ?? '');

    fixture.detectChanges();
    expect(triggerBadgeLabels()).toEqual(['مديرة المالية', 'الفرع الرئيسي']);

    fixture.componentRef.setInput('showTriggerBranchBadge', false);
    fixture.detectChanges();
    expect(triggerBadgeLabels()).toEqual(['مديرة المالية']);

    fixture.componentRef.setInput('showTriggerRoleBadge', false);
    fixture.componentRef.setInput('showTriggerBranchBadge', true);
    fixture.detectChanges();
    expect(triggerBadgeLabels()).toEqual(['الفرع الرئيسي']);

    fixture.componentRef.setInput('showTriggerRoleBadge', true);
    fixture.detectChanges();
    expect(triggerBadgeLabels()).toEqual(['مديرة المالية', 'الفرع الرئيسي']);
    const identity = fixture.nativeElement.querySelector(
      '.user-menu__trigger-identity',
    ) as HTMLElement;
    expect(identity.children).toHaveLength(3);
    expect(identity.children[2].classList).toContain('user-menu__trigger-metadata');

    fixture.componentRef.setInput('showRoleBadge', false);
    fixture.detectChanges();
    expect(triggerBadgeLabels()).toEqual(['الفرع الرئيسي']);
    expect(
      fixture.nativeElement.querySelectorAll(
        '.user-menu__identity-header erp-status-badge',
      ),
    ).toHaveLength(1);
  });

  it('keeps long trigger identity content to three rows with accessible full labels', () => {
    const fixture = TestBed.createComponent(ErpUserMenu);
    const displayName = 'Alexandria Regional Finance Operations Manager';
    const email = 'alexandria.finance.manager@honesty.example';
    fixture.componentRef.setInput('user', {
      displayName,
      email,
      secondaryText: 'Regional finance operations',
      roleLabel: 'Finance Operations',
      branchLabel: 'Alexandria Branch',
    });
    fixture.detectChanges();

    const identity = fixture.nativeElement.querySelector(
      '.user-menu__trigger-identity',
    ) as HTMLElement;
    expect(identity.children).toHaveLength(3);
    expect(
      identity.querySelector('.user-menu__trigger-name')?.getAttribute('aria-label'),
    ).toBe(displayName);
    expect(
      identity.querySelector('.user-menu__email--trigger')?.getAttribute('aria-label'),
    ).toBe(email);
    expect(
      identity.querySelector('.user-menu__trigger-secondary'),
    ).toBeNull();
    expect(identity.querySelectorAll('.user-menu__trigger-metadata')).toHaveLength(1);
    expect(identity.querySelectorAll('.user-menu__trigger-badge')).toHaveLength(2);

    const compiledStyles = (
      ErpUserMenu as unknown as {ɵcmp: {styles: readonly string[]}}
    ).ɵcmp.styles.join(' ');
    expect(compiledStyles).toMatch(
      /user-menu__badges--trigger[^}]*grid-auto-flow:\s*column/,
    );
    expect(compiledStyles).not.toMatch(
      /user-menu__trigger-identity[^}]*block-size:/,
    );
    expect(compiledStyles).toMatch(
      /user-menu__email[^}]*justify-content:\s*flex-start/,
    );
  });

  it('uses the bounded 60px Avatar presentation to match the intrinsic three-row identity stack', () => {
    const fixture = TestBed.createComponent(ErpUserMenu);
    fixture.componentRef.setInput('user', {
      displayName: 'أميرة حداد',
      email: 'amira@honesty.example',
      roleLabel: 'مديرة المالية',
      branchLabel: 'الفرع الرئيسي',
      avatarPresence: 'online',
    });
    fixture.detectChanges();

    const avatar = fixture.nativeElement.querySelector(
      'erp-avatar.user-menu__trigger-avatar',
    ) as HTMLElement;
    expect(avatar.getAttribute('data-avatar-presentation')).toBe('user-menu-trigger');

    const avatarStyles = (
      ErpAvatar as unknown as {ɵcmp: {styles: readonly string[]}}
    ).ɵcmp.styles.join(' ');
    expect(avatarStyles).toMatch(
      /data-avatar-presentation=user-menu-trigger[^}]*--honesty-avatar-size:\s*60px/s,
    );
  });

  it('keeps the full trigger default and exposes an accessible narrow-only compact composition', () => {
    const fixture = TestBed.createComponent(ErpUserMenu);
    fixture.componentRef.setInput('user', {
      displayName: 'أميرة حداد',
      email: 'amira@honesty.example',
      roleLabel: 'مديرة المالية',
      branchLabel: 'الفرع الرئيسي',
    });
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('data-user-menu-compact-trigger-at-narrow')).toBe(
      'false',
    );

    fixture.componentRef.setInput('compactTriggerAtNarrow', true);
    fixture.detectChanges();
    expect(host.getAttribute('data-user-menu-compact-trigger-at-narrow')).toBe(
      'true',
    );
    expect(
      host.querySelector('.user-menu__trigger button')?.textContent,
    ).toContain('amira@honesty.example');

    const compiledStyles = (
      ErpUserMenu as unknown as {ɵcmp: {styles: readonly string[]}}
    ).ɵcmp.styles.join(' ');
    expect(compiledStyles).toMatch(
      /data-user-menu-compact-trigger-at-narrow=true[^}]*user-menu__trigger-identity[^}]*display:\s*none/,
    );
  });

  it.each([
    {width: 320, height: 568, anchorTop: 220, anchorHeight: 104},
    {width: 320, height: 844, anchorTop: 359, anchorHeight: 126},
    {width: 390, height: 844, anchorTop: 370, anchorHeight: 104},
    {width: 768, height: 900, anchorTop: 398, anchorHeight: 104},
    {width: 1440, height: 900, anchorTop: 398, anchorHeight: 104},
  ])(
    'keeps a long-identity popup vertical, contained, and clear of its trigger at $width x $height',
    ({width, height, anchorTop, anchorHeight}) => {
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
      fixture.componentRef.setInput('user', {
        displayName: 'نادية عبد الرحمن فؤاد مسؤولة المشتريات الإقليمية',
        secondaryText: 'إدارة سلاسل الإمداد والمشتريات',
        email: 'nadia.abdelrahman@honesty.example',
        roleLabel: 'مسؤولة المشتريات الإقليمية',
        branchLabel: 'فرع القاهرة الجديدة',
        avatarPresence: 'online',
      });
      fixture.componentRef.setInput('items', Array.from({length: 12}, (_, index) => ({
        id: `action-${index}`,
        label: `الإجراء ${index + 1}`,
      })));
      fixture.detectChanges();

      const triggerHost = fixture.nativeElement.querySelector(
        '.user-menu__trigger-action',
      ) as HTMLElement;
      const surface = fixture.nativeElement.querySelector(
        '.user-menu__surface',
      ) as HTMLElement;
      installPopover(surface);
      surface.style.setProperty('--honesty-user-menu-arrow-size', '13px');
      surface.style.setProperty('--honesty-user-menu-arrow-offset', '16px');
      surface.style.setProperty('--honesty-user-menu-anchor-gap', '2px');
      surface.style.setProperty('--honesty-user-menu-viewport-inset', '8px');
      const triggerWidth = Math.min(360, width - 48);
      const triggerLeft = width - triggerWidth - 24;
      vi.spyOn(triggerHost, 'getBoundingClientRect').mockReturnValue({
        left: triggerLeft,
        top: anchorTop,
        right: triggerLeft + triggerWidth,
        bottom: anchorTop + anchorHeight,
        width: triggerWidth,
        height: anchorHeight,
        x: triggerLeft,
        y: anchorTop,
        toJSON: () => ({}),
      });
      vi.spyOn(surface, 'getBoundingClientRect').mockImplementation(() => {
        const measuredHeight = Number.parseFloat(surface.style.maxBlockSize);
        const measuredWidth = Math.min(360, width - 16);
        return {
          left: 0,
          top: 0,
          right: measuredWidth,
          bottom: measuredHeight,
          width: measuredWidth,
          height: measuredHeight,
          x: 0,
          y: 0,
          toJSON: () => ({}),
        };
      });
      Object.defineProperties(window, {
        innerWidth: {configurable: true, value: width},
        innerHeight: {configurable: true, value: height},
      });

      try {
        (fixture.nativeElement.querySelector(
          '.user-menu__trigger button',
        ) as HTMLButtonElement).click();

        const placement = surface.dataset['overlayPlacement'];
        const surfaceTop = Number.parseFloat(surface.style.top);
        const surfaceHeight = Number.parseFloat(surface.style.maxBlockSize);
        const surfaceBottom = surfaceTop + surfaceHeight;
        const triggerBottom = anchorTop + anchorHeight;

        expect(['bottom', 'top']).toContain(placement);
        expect(surfaceTop).toBeGreaterThanOrEqual(8);
        expect(surfaceBottom).toBeLessThanOrEqual(height - 8);
        if (placement === 'bottom') {
          expect(surfaceTop).toBeGreaterThanOrEqual(triggerBottom + 2);
        } else {
          expect(surfaceBottom).toBeLessThanOrEqual(anchorTop - 2);
        }
        expect(surface.style.maxBlockSize).not.toBe('');
      } finally {
        Object.defineProperties(window, {
          innerWidth: {configurable: true, value: previousViewport.width},
          innerHeight: {configurable: true, value: previousViewport.height},
        });
        requestFrame.mockRestore();
      }
    },
  );

  it('assigns vertical scrolling only to actions and keeps identity fixed', () => {
    const fixture = TestBed.createComponent(ErpUserMenu);
    fixture.componentRef.setInput('user', {
      displayName: 'نادية عبد الرحمن',
      email: 'nadia@honesty.example',
    });
    fixture.componentRef.setInput('items', Array.from({length: 12}, (_, index) => ({
      id: `action-${index}`,
      label: `الإجراء ${index + 1}`,
    })));
    fixture.detectChanges();

    const surface = fixture.nativeElement.querySelector(
      '.user-menu__surface',
    ) as HTMLElement;
    const identity = surface.querySelector(
      '.user-menu__identity-header',
    ) as HTMLElement;
    const actions = surface.querySelector(
      '.user-menu__items',
    ) as HTMLElement;
    vi.spyOn(identity, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 24,
      right: 300,
      bottom: 124,
      width: 300,
      height: 100,
      x: 0,
      y: 24,
      toJSON: () => ({}),
    } as DOMRect);

    const identityTopBefore = identity.getBoundingClientRect().top;
    actions.scrollTop = 48;

    const compiledStyles = (
      ErpUserMenu as unknown as {ɵcmp: {styles: readonly string[]}}
    ).ɵcmp.styles.join(' ');
    expect(compiledStyles).toMatch(
      /user-menu__surface[^}]*overflow:\s*visible/,
    );
    expect(compiledStyles).toMatch(
      /user-menu__items[^}]*overflow:\s*auto/,
    );
    expect(actions.scrollTop).toBe(48);
    expect(surface.scrollTop).toBe(0);
    expect(identity.getBoundingClientRect().top).toBe(identityTopBefore);
  });

  it('applies all visibility inputs to the same trigger and identity card without placeholders', () => {
    const fixture = TestBed.createComponent(ErpUserMenu);
    fixture.componentRef.setInput('user', {
      displayName: 'أميرة حداد',
      email: 'amira@honesty.example',
      roleLabel: 'مديرة المالية',
      branchLabel: 'الفرع الرئيسي',
      avatarPresence: 'away',
    });
    for (const inputName of [
      'showAvatar',
      'showUserName',
      'showEmail',
      'showPresence',
      'showRoleBadge',
      'showBranchBadge',
    ]) {
      fixture.componentRef.setInput(inputName, false);
    }
    fixture.componentRef.setInput('showTriggerRoleBadge', true);
    fixture.componentRef.setInput('showTriggerBranchBadge', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('erp-avatar')).toHaveLength(0);
    expect(fixture.nativeElement.querySelectorAll('.user-menu__trigger-name')).toHaveLength(0);
    expect(fixture.nativeElement.querySelectorAll('.user-menu__email')).toHaveLength(0);
    expect(fixture.nativeElement.querySelectorAll('erp-status-badge')).toHaveLength(0);
    expect(
      (fixture.nativeElement.querySelector(
        '.user-menu__trigger button',
      ) as HTMLButtonElement).textContent,
    ).toContain('أميرة حداد');
  });

  it.each(['online', 'away', 'busy', 'offline'] as const)(
    'forwards the explicit %s presence state without inventing one',
    (presence) => {
      const fixture = TestBed.createComponent(ErpUserMenu);
      fixture.componentRef.setInput('user', {
        displayName: 'أميرة حداد',
        avatarPresence: presence,
      });
      fixture.detectChanges();

      const avatars = (fixture.nativeElement as HTMLElement)
        .querySelectorAll<HTMLElement>('erp-avatar');
      expect(avatars).toHaveLength(2);
      expect(
        Array.from(avatars).every(
          (avatar) => avatar.getAttribute('data-avatar-presence') === presence,
        ),
      ).toBe(true);
    },
  );

  it('uses initials by default and only uses an icon fallback when explicitly supplied', () => {
    const fixture = TestBed.createComponent(ErpUserMenu);
    fixture.componentRef.setInput('user', {displayName: 'عمر ناصر'});
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.avatar__initials')).toHaveLength(2);
    expect(fixture.nativeElement.querySelectorAll('.avatar__icon')).toHaveLength(0);

    fixture.componentRef.setInput('user', {
      displayName: 'حساب الدعم',
      fallbackIcon: 'user',
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.avatar__icon')).toHaveLength(2);
    expect(fixture.nativeElement.querySelectorAll('.avatar__initials')).toHaveLength(0);
  });

  it('does not invent identity metadata or presence when optional data is absent', () => {
    const fixture = TestBed.createComponent(ErpUserMenu);
    fixture.componentRef.setInput('user', {displayName: 'ليلى محمود'});
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.user-menu__email')).toHaveLength(0);
    expect(fixture.nativeElement.querySelectorAll('erp-status-badge')).toHaveLength(0);
    expect(
      Array.from((fixture.nativeElement as HTMLElement)
        .querySelectorAll<HTMLElement>('erp-avatar')).every(
        (avatar) => !avatar.hasAttribute('data-avatar-presence'),
      ),
    ).toBe(true);
  });

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

  it('repositions the existing anchored surface after live identity and visibility changes', () => {
    const previousViewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    const frames: FrameRequestCallback[] = [];
    const requestFrame = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback) => {
        frames.push(callback);
        return frames.length;
      });
    const flushFrames = (timestamp: number): void => {
      let callback = frames.shift();
      while (callback) {
        callback(timestamp);
        callback = frames.shift();
      }
    };
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
    surface.style.setProperty('--honesty-user-menu-arrow-size', '13px');
    surface.style.setProperty('--honesty-user-menu-arrow-offset', '16px');
    surface.style.setProperty('--honesty-user-menu-anchor-gap', '2px');
    surface.style.setProperty('--honesty-user-menu-viewport-inset', '8px');
    let anchorLeft = 80;
    vi.spyOn(triggerHost, 'getBoundingClientRect').mockImplementation(() => ({
      left: anchorLeft,
      top: 40,
      right: anchorLeft + 160,
      bottom: 96,
      width: 160,
      height: 56,
      x: anchorLeft,
      y: 40,
      toJSON: () => ({}),
    }));
    vi.spyOn(surface, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      right: 360,
      bottom: 360,
      width: 360,
      height: 360,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });
    Object.defineProperties(window, {
      innerWidth: {configurable: true, value: 800},
      innerHeight: {configurable: true, value: 700},
    });

    try {
      (fixture.nativeElement.querySelector(
        '.user-menu__trigger button',
      ) as HTMLButtonElement).click();
      flushFrames(0);
      const firstCenter = surface.style.getPropertyValue(
        '--honesty-anchored-surface-arrow-cross-axis-center',
      );

      anchorLeft = 480;
      fixture.componentRef.setInput('user', {
        displayName: 'Alexandria Regional Finance Operations Manager',
        email: 'alexandria.finance.manager@honesty.example',
        roleLabel: 'Finance Operations',
      });
      fixture.detectChanges();
      flushFrames(16);
      const updatedCenter = surface.style.getPropertyValue(
        '--honesty-anchored-surface-arrow-cross-axis-center',
      );

      fixture.componentRef.setInput('showAvatar', false);
      fixture.componentRef.setInput('showRoleBadge', false);
      fixture.detectChanges();
      flushFrames(32);

      expect(firstCenter).not.toBe(updatedCenter);
      expect(updatedCenter).not.toBe('');
      expect(fixture.componentInstance.open()).toBe(true);
      expect(fixture.nativeElement.querySelectorAll('erp-avatar')).toHaveLength(0);
      expect(fixture.nativeElement.querySelectorAll('erp-status-badge')).toHaveLength(0);
    } finally {
      Object.defineProperties(window, {
        innerWidth: {configurable: true, value: previousViewport.width},
        innerHeight: {configurable: true, value: previousViewport.height},
      });
      requestFrame.mockRestore();
    }
  });
});
