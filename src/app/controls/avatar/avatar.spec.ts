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
  });
});
