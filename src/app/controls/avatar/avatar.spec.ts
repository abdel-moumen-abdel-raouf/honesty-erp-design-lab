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

  it('applies every size and shape as inherited-theme host evidence', () => {
    const fixture = TestBed.createComponent(ErpAvatar);
    fixture.componentRef.setInput('name', 'User');
    for (const size of ['xs', 'sm', 'md', 'lg', 'xl'] as const) {
      fixture.componentRef.setInput('size', size);
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-avatar-size')).toBe(size);
    }
    fixture.componentRef.setInput('shape', 'rounded');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-avatar-shape')).toBe('rounded');
    expect(fixture.nativeElement.hasAttribute('data-theme')).toBe(false);
  });
});
