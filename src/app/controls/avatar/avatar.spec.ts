import {TestBed} from '@angular/core/testing';
import {ErpAvatar, ErpAvatarPresenceMotion, ErpAvatarPresencePosition} from './avatar';

describe('ErpAvatar', () => {
  it('uses the exact reference defaults without making the Avatar interactive', () => {
    const fixture = TestBed.createComponent(ErpAvatar);
    fixture.componentRef.setInput('name', 'أحمد علي');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('data-avatar-size')).toBe('md');
    expect(host.getAttribute('data-avatar-shape')).toBe('circle');
    expect(host.getAttribute('data-avatar-tone')).toBe('neutral');
    expect(host.getAttribute('data-avatar-ring')).toBe('false');
    expect(host.getAttribute('data-avatar-loading')).toBe('false');
    expect(host.getAttribute('data-avatar-interactive')).toBe('false');
    expect(host.getAttribute('role')).toBe('img');
    expect(host.getAttribute('aria-label')).toBe('أحمد علي');
    expect(host.querySelector('button')).toBeNull();
  });

  it('follows image then explicit icon then initials then default icon fallback order', () => {
    const fixture = TestBed.createComponent(ErpAvatar);
    fixture.componentRef.setInput('name', 'أحمد علي');
    fixture.componentRef.setInput('src', '/avatar.png');
    fixture.componentRef.setInput('fallbackIcon', 'user');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('img')?.getAttribute('src')).toBe('/avatar.png');

    (fixture.nativeElement.querySelector('img') as HTMLImageElement)
      .dispatchEvent(new Event('error'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('erp-icon')?.getAttribute('data-icon-name'))
      .toBe('user');

    fixture.componentRef.setInput('fallbackIcon', null);
    fixture.componentRef.setInput('initials', 'aa');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('erp-text')?.textContent).toContain('AA');

    fixture.componentRef.setInput('initials', null);
    fixture.componentRef.setInput('name', '');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('erp-icon')?.getAttribute('data-icon-name'))
      .toBe('user');
  });

  it('scopes image failure to the failing source and retries a replacement source', () => {
    const fixture = TestBed.createComponent(ErpAvatar);
    fixture.componentRef.setInput('name', 'أحمد علي');
    fixture.componentRef.setInput('src', '/avatar-a.png');
    fixture.detectChanges();

    const first = fixture.nativeElement.querySelector('img') as HTMLImageElement;
    first.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('img')).toBeNull();

    fixture.componentRef.setInput('src', '/avatar-b.png');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('img')?.getAttribute('src')).toBe('/avatar-b.png');
  });

  it('maps all six reference sizes to their exact desktop geometry tokens', () => {
    const fixture = TestBed.createComponent(ErpAvatar);
    fixture.componentRef.setInput('name', 'User');
    const expected = {
      xs: '1.5rem', sm: '1.875rem', md: '2.375rem',
      lg: '3.125rem', xl: '4.25rem', '2xl': '5.5rem',
    } as const;

    for (const [size, pixels] of Object.entries(expected)) {
      fixture.componentRef.setInput('size', size);
      fixture.detectChanges();
      const style = getComputedStyle(fixture.nativeElement);
      expect(style.getPropertyValue('--honesty-avatar-size').trim()).toBe(pixels);
    }
  });

  it('maps circle, rounded, and square to the reference radii', () => {
    const fixture = TestBed.createComponent(ErpAvatar);
    fixture.componentRef.setInput('name', 'User');
    const expected = {
      circle: {
        radius: '50%',
        sourceToken: null,
        sourceValue: null,
      },
      rounded: {
        radius: 'var(--honesty-avatar-rounded-radius)',
        sourceToken: '--honesty-avatar-rounded-radius',
        sourceValue: '26%',
      },
      square: {
        radius: 'var(--honesty-avatar-square-radius)',
        sourceToken: '--honesty-avatar-square-radius',
        sourceValue: '0.25rem',
      },
    } as const;

    for (const [shape, contract] of Object.entries(expected)) {
      fixture.componentRef.setInput('shape', shape);
      fixture.detectChanges();
      const style = getComputedStyle(fixture.nativeElement);
      expect(style.getPropertyValue('--honesty-avatar-radius').trim())
        .toBe(contract.radius);
      if (contract.sourceToken !== null) {
        expect(style.getPropertyValue(contract.sourceToken).trim())
          .toBe(contract.sourceValue);
      }
    }
  });

  it('supports every reference tone and presence semantic without local theme ownership', () => {
    const fixture = TestBed.createComponent(ErpAvatar);
    fixture.componentRef.setInput('name', 'User');
    for (const tone of [
      'neutral', 'brand', 'success', 'warning', 'danger', 'info', 'purple', 'slate',
    ] as const) {
      fixture.componentRef.setInput('tone', tone);
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-avatar-tone')).toBe(tone);
    }
    for (const presence of [
      'online', 'away', 'busy', 'offline', 'info', 'brand', 'pending', 'vacation',
    ] as const) {
      fixture.componentRef.setInput('presence', presence);
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-avatar-presence')).toBe(presence);
      expect(fixture.nativeElement.getAttribute('aria-label')).toContain('—');
    }
    expect(fixture.nativeElement.hasAttribute('data-theme')).toBe(false);
  });

  it.each(['ltr', 'rtl'] as const)(
    'keeps every named position physically invariant in %s',
    (direction) => {
      const fixture = TestBed.createComponent(ErpAvatar);
      fixture.nativeElement.setAttribute('dir', direction);
      fixture.componentRef.setInput('name', 'User');
      fixture.componentRef.setInput('presence', 'online');
      const expected = {
        top: ['top', 'left'], bottom: ['bottom', 'left'],
        left: ['top', 'left'], right: ['top', 'right'],
        'top-left': ['top', 'left'], 'top-right': ['top', 'right'],
        'bottom-left': ['bottom', 'left'], 'bottom-right': ['bottom', 'right'],
      } as const;

      for (const [position, assignedEdges] of Object.entries(expected)) {
        fixture.componentRef.setInput('presencePosition', position);
        fixture.detectChanges();
        const style = getComputedStyle(
          fixture.nativeElement.querySelector('.avatar__presence') as HTMLElement,
        );
        for (const edge of ['top', 'right', 'bottom', 'left'] as const) {
          expect(style[edge] !== '').toBe(
            (assignedEdges as readonly string[]).includes(edge),
          );
        }
      }
    },
  );

  it('keeps position and all reference or compatibility motions on separate layers', () => {
    const fixture = TestBed.createComponent(ErpAvatar);
    fixture.componentRef.setInput('name', 'User');
    fixture.componentRef.setInput('presence', 'online');
    const positions: readonly ErpAvatarPresencePosition[] = [
      'top', 'bottom', 'left', 'right',
      'top-left', 'top-right', 'bottom-left', 'bottom-right',
    ];
    const motions: readonly ErpAvatarPresenceMotion[] = [
      'none', 'pulse', 'ping', 'bounce', 'blink', 'breathe',
    ];

    for (const position of positions) {
      for (const motion of motions) {
        fixture.componentRef.setInput('presencePosition', position);
        fixture.componentRef.setInput('presenceMotion', motion);
        fixture.detectChanges();
        const positionLayer = fixture.nativeElement.querySelector(
          '.avatar__presence',
        ) as HTMLElement;
        const motionLayer = positionLayer.querySelector(
          '.avatar__presence-indicator',
        ) as HTMLElement;
        expect(positionLayer).not.toBe(motionLayer);
        expect(positionLayer.contains(motionLayer)).toBe(true);
      }
    }
  });

  it('owns explicit interactive button semantics and emits activation', () => {
    const fixture = TestBed.createComponent(ErpAvatar);
    fixture.componentRef.setInput('name', 'أحمد علي');
    fixture.componentRef.setInput('interactive', true);
    const activated = vi.fn();
    fixture.componentInstance.avatarClick.subscribe(activated);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const button = host.querySelector('erp-avatar-action button') as HTMLButtonElement;
    expect(host.getAttribute('role')).toBeNull();
    expect(host.getAttribute('aria-label')).toBeNull();
    expect(host.querySelector('.avatar__frame')).not.toBeNull();
    expect(host.querySelector('erp-text')?.textContent).toContain('أع');
    expect(button.getAttribute('aria-label')).toBe('أحمد علي');
    button.click();
    expect(activated).toHaveBeenCalledOnce();
  });

  it('uses alt as the composite accessible name while keeping the internal image decorative', () => {
    const fixture = TestBed.createComponent(ErpAvatar);
    fixture.componentRef.setInput('name', 'System name');
    fixture.componentRef.setInput('alt', 'الصورة الشخصية لسارة');
    fixture.componentRef.setInput('src', '/avatar.png');
    fixture.detectChanges();

    const image = fixture.nativeElement.querySelector('img') as HTMLImageElement;
    expect(fixture.nativeElement.getAttribute('aria-label')).toBe('الصورة الشخصية لسارة');
    expect(image.getAttribute('alt')).toBe('');
    expect(image.getAttribute('aria-hidden')).toBe('true');
  });

  it('renders loading as a visible frame without duplicate content', () => {
    const fixture = TestBed.createComponent(ErpAvatar);
    fixture.componentRef.setInput('name', 'User');
    fixture.componentRef.setInput('src', '/avatar.png');
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.avatar__frame')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('img')).toBeNull();
    expect(fixture.nativeElement.querySelector('erp-icon')).toBeNull();
    expect(fixture.nativeElement.querySelector('erp-text')).toBeNull();
  });
});
