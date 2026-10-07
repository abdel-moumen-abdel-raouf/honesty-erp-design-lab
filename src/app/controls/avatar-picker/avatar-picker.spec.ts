import {TestBed} from '@angular/core/testing';
import {ERP_AVATAR_CATALOG} from './avatar-picker-contracts';
import {ErpAvatarPicker} from './avatar-picker';

describe('ErpAvatarPicker', () => {
  it('keeps the checked-in catalog at twenty male and twenty female unique assets', () => {
    expect(ERP_AVATAR_CATALOG).toHaveLength(40);
    expect(ERP_AVATAR_CATALOG.filter(({gender}) => gender === 'male')).toHaveLength(20);
    expect(ERP_AVATAR_CATALOG.filter(({gender}) => gender === 'female')).toHaveLength(20);
    expect(new Set(ERP_AVATAR_CATALOG.map(({id}) => id)).size).toBe(40);
    expect(new Set(ERP_AVATAR_CATALOG.map(({imageUrl}) => imageUrl)).size).toBe(40);
  });

  it('composes one ErpTabs owner and renders every active-gender tile through ErpAvatar', () => {
    const fixture = TestBed.createComponent(ErpAvatarPicker);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll(':scope > .avatar-picker__tabs erp-tabs'))
      .toHaveLength(1);
    expect(fixture.nativeElement.querySelectorAll('[role="tab"]')).toHaveLength(2);
    expect(fixture.nativeElement.querySelectorAll('[role="tab"] erp-text')).toHaveLength(4);
    expect(fixture.nativeElement.querySelectorAll('erp-avatar-picker-tile')).toHaveLength(20);
    expect(fixture.nativeElement.querySelectorAll('erp-avatar-picker-tile erp-avatar'))
      .toHaveLength(20);
    expect(fixture.nativeElement.querySelector('erp-avatar-picker-tile img')).not.toBeNull();

    (fixture.nativeElement.querySelectorAll('[role="tab"]')[1] as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.gender()).toBe('female');
    expect(fixture.nativeElement.querySelectorAll('erp-avatar-picker-tile')).toHaveLength(20);
  });

  it('stages selection and commits the controlled value only through Confirm', () => {
    const fixture = TestBed.createComponent(ErpAvatarPicker);
    fixture.componentRef.setInput('value', 'avatar-02');
    const pick = vi.fn();
    const changed = vi.fn();
    const confirm = vi.fn();
    fixture.componentInstance.pick.subscribe(pick);
    fixture.componentInstance.changed.subscribe(changed);
    fixture.componentInstance.confirm.subscribe(confirm);
    fixture.detectChanges();

    (fixture.nativeElement.querySelector('erp-avatar-picker-tile button') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('avatar-02');
    expect(pick).toHaveBeenCalledWith(ERP_AVATAR_CATALOG[0]);
    expect(
      fixture.nativeElement.querySelector('erp-avatar-picker-tile')
        .getAttribute('data-avatar-picker-tile-selected'),
    ).toBe('true');

    const footerButtons = fixture.nativeElement.querySelectorAll(
      '.avatar-picker__actions erp-button button',
    );
    (footerButtons[1] as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('avatar-01');
    expect(changed).toHaveBeenCalledWith('avatar-01');
    expect(confirm).toHaveBeenCalledWith('avatar-01');
    expect(fixture.nativeElement.querySelector('.avatar-picker__toast')).not.toBeNull();
  });

  it('cancels draft selection without mutating the controlled value', () => {
    const fixture = TestBed.createComponent(ErpAvatarPicker);
    fixture.componentRef.setInput('value', 'avatar-02');
    const cancel = vi.fn();
    fixture.componentInstance.cancelRequested.subscribe(cancel);
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('erp-avatar-picker-tile button') as HTMLButtonElement).click();
    fixture.detectChanges();
    const cancelButton = fixture.nativeElement.querySelector(
      '.avatar-picker__actions erp-button button',
    ) as HTMLButtonElement;
    cancelButton.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.value()).toBe('avatar-02');
    expect(cancel).toHaveBeenCalledOnce();
    expect(
      fixture.nativeElement.querySelectorAll(
        'erp-avatar-picker-tile[data-avatar-picker-tile-selected="true"]',
      ),
    ).toHaveLength(1);
  });

  it('filters through ErpSearchBox and uses ErpEmptyState for no results', () => {
    const fixture = TestBed.createComponent(ErpAvatarPicker);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector(
      'erp-search-box input[type="search"]',
    ) as HTMLInputElement;
    input.value = 'avatar-01';
    input.dispatchEvent(new Event('input', {bubbles: true}));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('erp-avatar-picker-tile')).toHaveLength(1);

    input.value = 'missing';
    input.dispatchEvent(new Event('input', {bubbles: true}));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('erp-empty-state')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('erp-empty-state erp-icon[name="search"]'))
      .not.toBeNull();
  });

  it('forwards bounded Avatar shape and size without private avatar rendering', () => {
    const fixture = TestBed.createComponent(ErpAvatarPicker);
    fixture.componentRef.setInput('avatarSize', 'sm');
    fixture.componentRef.setInput('avatarShape', 'square');
    fixture.detectChanges();
    const avatars = fixture.nativeElement.querySelectorAll(
      'erp-avatar-picker-tile erp-avatar',
    );
    expect(avatars).toHaveLength(20);
    expect([...avatars].every((avatar) => avatar.getAttribute('data-avatar-size') === 'sm'))
      .toBe(true);
    expect([...avatars].every((avatar) => avatar.getAttribute('data-avatar-shape') === 'square'))
      .toBe(true);
  });

  it('blocks tabs, search mutation, tiles and footer commits while disabled', () => {
    const fixture = TestBed.createComponent(ErpAvatarPicker);
    fixture.componentRef.setInput('disabled', true);
    const changed = vi.fn();
    fixture.componentInstance.changed.subscribe(changed);
    fixture.detectChanges();

    const tabs = fixture.nativeElement.querySelectorAll('[role="tab"]');
    expect([...tabs].every((tab) => (tab as HTMLButtonElement).disabled)).toBe(true);
    expect((fixture.nativeElement.querySelector('erp-search-box input') as HTMLInputElement).disabled)
      .toBe(true);
    (fixture.nativeElement.querySelector('erp-avatar-picker-tile button') as HTMLButtonElement).click();
    expect(changed).not.toHaveBeenCalled();
    expect(fixture.componentInstance.value()).toBeNull();
  });

  it('uses logical RTL/LTR arrow navigation without stealing Enter or Space activation', () => {
    const fixture = TestBed.createComponent(ErpAvatarPicker);
    fixture.nativeElement.style.direction = 'rtl';
    fixture.detectChanges();
    let buttons = fixture.nativeElement.querySelectorAll('erp-avatar-picker-tile button');
    buttons[0].focus();
    buttons[0].dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowLeft', bubbles: true}));
    fixture.detectChanges();
    buttons = fixture.nativeElement.querySelectorAll('erp-avatar-picker-tile button');
    expect(document.activeElement).toBe(buttons[1]);

    fixture.nativeElement.style.direction = 'ltr';
    buttons[1].dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowLeft', bubbles: true}));
    fixture.detectChanges();
    expect(document.activeElement).toBe(buttons[0]);
  });

  it('inherits theme and direction and exposes reference compact sizing', () => {
    const fixture = TestBed.createComponent(ErpAvatarPicker);
    fixture.componentRef.setInput('size', 'compact');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-avatar-picker-size')).toBe('compact');
    expect(fixture.nativeElement.hasAttribute('data-theme')).toBe(false);
    expect(fixture.nativeElement.hasAttribute('dir')).toBe(false);
  });
});
