import {TestBed} from '@angular/core/testing';
import {ErpAvatar} from './avatar';

describe('ErpAvatar', () => {
  it('uses deterministic initials and semantic fallback when no image is available', () => {
    const fixture = TestBed.createComponent(ErpAvatar);
    fixture.componentRef.setInput('name', 'أحمد علي');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('أع');
    expect(fixture.nativeElement.querySelector('img')).toBeNull();

    fixture.componentRef.setInput('name', '');
    fixture.componentRef.setInput('fallbackIcon', 'user');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('erp-icon')).not.toBeNull();
  });

  it('scopes image failure to the failing src and retries a replacement src', () => {
    const fixture = TestBed.createComponent(ErpAvatar);
    fixture.componentRef.setInput('name', 'أحمد علي');
    fixture.componentRef.setInput('src', '/avatar-a.png');
    fixture.detectChanges();

    const first = fixture.nativeElement.querySelector('img') as HTMLImageElement;
    expect(first.getAttribute('src')).toBe('/avatar-a.png');
    first.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('img')).toBeNull();

    fixture.componentRef.setInput('src', '/avatar-b.png');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('img')?.getAttribute('src')).toBe('/avatar-b.png');
  });

  it('applies every size and exact shape as inherited-theme host evidence', () => {
    const fixture = TestBed.createComponent(ErpAvatar);
    fixture.componentRef.setInput('name', 'User');
    for (const size of ['xs', 'sm', 'md', 'lg', 'xl'] as const) {
      fixture.componentRef.setInput('size', size);
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-avatar-size')).toBe(size);
    }
    for (const shape of ['circle', 'rounded', 'square'] as const) {
      fixture.componentRef.setInput('shape', shape);
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-avatar-shape')).toBe(shape);
    }
    expect(fixture.nativeElement.hasAttribute('data-theme')).toBe(false);
  });

  it('supports all presence states, physical positions, and bounded motions', () => {
    const fixture = TestBed.createComponent(ErpAvatar);
    fixture.componentRef.setInput('name', 'أحمد علي');
    for (const presence of ['online', 'away', 'busy', 'offline'] as const) {
      fixture.componentRef.setInput('presence', presence);
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-avatar-presence')).toBe(presence);
    }
    for (const position of [
      'top', 'bottom', 'left', 'right',
      'top-left', 'top-right', 'bottom-left', 'bottom-right',
    ] as const) {
      fixture.componentRef.setInput('presencePosition', position);
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-avatar-presence-position')).toBe(position);
    }
    fixture.componentRef.setInput('presenceMotion', 'ping');
    fixture.componentRef.setInput('hoverMotion', 'lift');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-avatar-presence-motion')).toBe('ping');
    expect(fixture.nativeElement.getAttribute('data-avatar-hover-motion')).toBe('lift');
    expect(fixture.nativeElement.getAttribute('aria-label')).toContain('غير متصل');
    expect(fixture.nativeElement.querySelector('.avatar__media')).not.toBeNull();
    expect(fixture.componentInstance.cursor()).toBe('default');
    fixture.componentRef.setInput('cursor', 'pointer');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-avatar-cursor')).toBe('pointer');
  });

  it.each(['ltr', 'rtl'] as const)(
    'keeps all named presence positions physical in %s',
    (direction) => {
      const fixture = TestBed.createComponent(ErpAvatar);
      fixture.nativeElement.setAttribute('dir', direction);
      fixture.componentRef.setInput('name', 'أحمد علي');
      fixture.componentRef.setInput('presence', 'online');

      const expected = {
        top: {top: true, left: true, transform: 'translateX'},
        bottom: {bottom: true, left: true, transform: 'translateX'},
        left: {top: true, left: true, transform: 'translateY'},
        right: {top: true, right: true, transform: 'translateY'},
        'top-left': {top: true, left: true},
        'top-right': {top: true, right: true},
        'bottom-left': {bottom: true, left: true},
        'bottom-right': {bottom: true, right: true},
      } as const;

      for (const [position, contract] of Object.entries(expected)) {
        fixture.componentRef.setInput('presencePosition', position);
        fixture.detectChanges();
        const layer = fixture.nativeElement.querySelector(
          '.avatar__presence',
        ) as HTMLElement;
        const style = getComputedStyle(layer);
        for (const edge of ['top', 'right', 'bottom', 'left'] as const) {
          expect(style[edge] !== '').toBe(edge in contract);
        }
        if ('transform' in contract) {
          expect(style.transform).toContain(contract.transform);
        }
      }
    },
  );

  it('keeps positioning and presence motion on distinct layers for every combination', () => {
    const fixture = TestBed.createComponent(ErpAvatar);
    fixture.componentRef.setInput('name', 'أحمد علي');
    fixture.componentRef.setInput('presence', 'online');

    for (const position of [
      'top', 'bottom', 'left', 'right',
      'top-left', 'top-right', 'bottom-left', 'bottom-right',
    ] as const) {
      for (const motion of ['none', 'pulse', 'ping', 'breathe'] as const) {
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
        expect(fixture.nativeElement.getAttribute('data-avatar-presence-position')).toBe(position);
        expect(fixture.nativeElement.getAttribute('data-avatar-presence-motion')).toBe(motion);
      }
    }
  });
});
