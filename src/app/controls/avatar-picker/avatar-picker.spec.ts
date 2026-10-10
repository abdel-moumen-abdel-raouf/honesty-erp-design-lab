import {TestBed} from '@angular/core/testing';
import {ERP_AVATAR_CATALOG} from './avatar-picker-contracts';
import {ErpAvatarPicker} from './avatar-picker';

describe('ErpAvatarPicker', () => {
  it('keeps the checked-in catalog at sixty male and fifty-six female unique assets', () => {
    expect(ERP_AVATAR_CATALOG).toHaveLength(116);
    expect(ERP_AVATAR_CATALOG.filter(({gender}) => gender === 'male')).toHaveLength(60);
    expect(ERP_AVATAR_CATALOG.filter(({gender}) => gender === 'female')).toHaveLength(56);
    expect(new Set(ERP_AVATAR_CATALOG.map(({id}) => id)).size).toBe(116);
    expect(new Set(ERP_AVATAR_CATALOG.map(({imageUrl}) => imageUrl)).size).toBe(116);
    expect(ERP_AVATAR_CATALOG.find(({id}) => id === 'avatar-21')?.gender).toBe('female');
    expect(ERP_AVATAR_CATALOG.find(({id}) => id === 'avatar-21')?.imageUrl)
      .toBe('/assets/honesty-erp-avatars/users/female/avatar-21.png');
  });

  it('composes one ErpTabs owner and renders every active-gender tile through ErpAvatar', () => {
    const fixture = TestBed.createComponent(ErpAvatarPicker);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll(':scope > .avatar-picker__tabs erp-tabs'))
      .toHaveLength(1);
    expect(
      fixture.nativeElement.querySelector(':scope > .avatar-picker__tabs erp-tabs')
        ?.getAttribute('data-tabs-presentation'),
    ).toBe('avatar-picker');
    expect(fixture.nativeElement.querySelectorAll('[role="tab"]')).toHaveLength(2);
    expect(fixture.nativeElement.querySelectorAll('[role="tab"] erp-text')).toHaveLength(4);
    expect(fixture.nativeElement.querySelectorAll('erp-avatar-picker-tile')).toHaveLength(60);
    expect(fixture.nativeElement.querySelectorAll('erp-avatar-picker-tile erp-avatar'))
      .toHaveLength(60);
    expect(fixture.nativeElement.getAttribute('data-avatar-picker-avatar-shape')).toBe('rounded');
    expect(fixture.nativeElement.querySelector('erp-avatar-picker-tile img')).not.toBeNull();
    expect(
      [...fixture.nativeElement.querySelectorAll('erp-avatar-picker-tile img')]
        .every((image) => image.getAttribute('loading') === 'lazy'),
    ).toBe(true);

    (fixture.nativeElement.querySelectorAll('[role="tab"]')[1] as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.gender()).toBe('female');
    expect(fixture.nativeElement.querySelectorAll('erp-avatar-picker-tile')).toHaveLength(56);
  });

  it('uses the reference preview presentation and footer block inset', () => {
    const fixture = TestBed.createComponent(ErpAvatarPicker);
    fixture.detectChanges();

    const preview = fixture.nativeElement.querySelector(
      '.avatar-picker__preview erp-avatar',
    ) as HTMLElement;
    const footer = fixture.nativeElement.querySelector(
      '.avatar-picker__footer',
    ) as HTMLElement;
    expect(preview.getAttribute('data-avatar-presentation')).toBe('avatar-picker-preview');
    expect(getComputedStyle(preview).getPropertyValue('--honesty-avatar-size').trim()).toBe('44px');
    expect(
      getComputedStyle(fixture.nativeElement)
        .getPropertyValue('--honesty-avatar-picker-footer-padding-block')
        .trim(),
    ).toBe('0.75rem');
    expect(getComputedStyle(footer).paddingBlock).toContain(
      '--honesty-avatar-picker-footer-padding-block',
    );
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

  it('searches the complete female collection by accessible source label', () => {
    const fixture = TestBed.createComponent(ErpAvatarPicker);
    fixture.componentRef.setInput('gender', 'female');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector(
      'erp-search-box input[type="search"]',
    ) as HTMLInputElement;
    input.value = 'رقم 116';
    input.dispatchEvent(new Event('input', {bubbles: true}));
    fixture.detectChanges();

    const tiles = fixture.nativeElement.querySelectorAll('erp-avatar-picker-tile');
    expect(tiles).toHaveLength(1);
    expect(tiles[0].querySelector('button')?.getAttribute('aria-label'))
      .toContain('116');
  });

  it('forwards bounded Avatar shape and size without private avatar rendering', () => {
    const fixture = TestBed.createComponent(ErpAvatarPicker);
    fixture.componentRef.setInput('avatarSize', 'sm');
    fixture.componentRef.setInput('avatarShape', 'square');
    fixture.detectChanges();
    const avatars = fixture.nativeElement.querySelectorAll(
      'erp-avatar-picker-tile erp-avatar',
    );
    expect(avatars).toHaveLength(60);
    expect([...avatars].every((avatar) => avatar.getAttribute('data-avatar-size') === 'sm'))
      .toBe(true);
    expect([...avatars].every((avatar) => avatar.getAttribute('data-avatar-shape') === 'square'))
      .toBe(true);
  });

  it('applies the proportional Picker tile law to every large Avatar size and shape', () => {
    const fixture = TestBed.createComponent(ErpAvatarPicker);
    const tileSizes = {
      '2xl': '6.125rem',
      '3xl': '7.625rem',
      '4xl': '9.625rem',
      '5xl': '12.125rem',
    } as const;

    for (const [size, tileSize] of Object.entries(tileSizes)) {
      for (const shape of ['circle', 'rounded', 'square'] as const) {
        fixture.componentRef.setInput('avatarSize', size);
        fixture.componentRef.setInput('avatarShape', shape);
        fixture.detectChanges();

        const host = fixture.nativeElement as HTMLElement;
        const avatars = host.querySelectorAll('erp-avatar-picker-tile erp-avatar');
        expect(host.getAttribute('data-avatar-picker-avatar-size')).toBe(size);
        expect(host.getAttribute('data-avatar-picker-avatar-shape')).toBe(shape);
        expect(getComputedStyle(host).getPropertyValue('--honesty-avatar-picker-tile-size').trim())
          .toBe(tileSize);
        expect([...avatars].every((avatar) => avatar.getAttribute('data-avatar-size') === size))
          .toBe(true);
        expect([...avatars].every((avatar) => avatar.getAttribute('data-avatar-shape') === shape))
          .toBe(true);
      }
    }
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
