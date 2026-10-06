import {TestBed} from '@angular/core/testing';
import {ERP_AVATAR_CATALOG} from './avatar-picker-contracts';
import {ErpAvatarPicker} from './avatar-picker';

describe('ErpAvatarPicker', () => {
  it('uses the forty Product Owner supplied avatars in two exact gender tabs', () => {
    expect(ERP_AVATAR_CATALOG).toHaveLength(40);
    expect(ERP_AVATAR_CATALOG.filter(({gender}) => gender === 'male')).toHaveLength(20);
    expect(ERP_AVATAR_CATALOG.filter(({gender}) => gender === 'female')).toHaveLength(20);
    expect(new Set(ERP_AVATAR_CATALOG.map(({id}) => id)).size).toBe(40);

    const fixture = TestBed.createComponent(ErpAvatarPicker);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('[role="tab"]')).toHaveLength(2);
    expect(fixture.nativeElement.querySelectorAll('erp-selection-tile')).toHaveLength(20);
    expect(fixture.nativeElement.querySelectorAll('erp-selection-tile erp-avatar')).toHaveLength(20);
    expect(
      fixture.nativeElement.querySelectorAll('erp-selection-tile erp-avatar .avatar__frame'),
    ).toHaveLength(20);
  });

  it('keeps value controlled through model and emits the explicit changed intent', () => {
    const fixture = TestBed.createComponent(ErpAvatarPicker);
    const changed = vi.fn();
    fixture.componentInstance.changed.subscribe(changed);
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('erp-selection-tile button') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('avatar-01');
    expect(changed).toHaveBeenCalledOnce();
    expect(changed).toHaveBeenCalledWith('avatar-01');
    expect(fixture.nativeElement.querySelector('.avatar-picker__preview erp-avatar')).not.toBeNull();
  });

  it('blocks selection while disabled and inherits theme and direction', () => {
    const fixture = TestBed.createComponent(ErpAvatarPicker);
    fixture.componentRef.setInput('disabled', true);
    const changed = vi.fn();
    fixture.componentInstance.changed.subscribe(changed);
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('erp-selection-tile button') as HTMLButtonElement).click();
    expect(changed).not.toHaveBeenCalled();
    expect(fixture.componentInstance.value()).toBeNull();
    expect(fixture.nativeElement.hasAttribute('data-theme')).toBe(false);
    expect(fixture.nativeElement.hasAttribute('dir')).toBe(false);
  });

  it('uses icon-text gender tabs and forwards bounded avatar size and shape', () => {
    const fixture = TestBed.createComponent(ErpAvatarPicker);
    fixture.componentRef.setInput('avatarSize', 'sm');
    fixture.componentRef.setInput('avatarShape', 'square');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('[role="tab"] erp-icon')).toHaveLength(2);
    const avatar = fixture.nativeElement.querySelector('erp-selection-tile erp-avatar');
    expect(avatar.getAttribute('data-avatar-size')).toBe('sm');
    expect(avatar.getAttribute('data-avatar-shape')).toBe('square');
  });
});
