import {TestBed} from '@angular/core/testing';
import {ErpStatusBadge} from './status-badge';

describe('ErpStatusBadge', () => {
  function createBadge(label = 'نشط') {
    const fixture = TestBed.createComponent(ErpStatusBadge);
    fixture.componentRef.setInput('label', label);
    fixture.detectChanges();
    return fixture;
  }

  it('uses the exact-reference defaults without adding live-region or action semantics', () => {
    const fixture = createBadge();

    expect(fixture.componentInstance.tone()).toBe('neutral');
    expect(fixture.componentInstance.variant()).toBe('soft');
    expect(fixture.componentInstance.size()).toBe('md');
    expect(fixture.componentInstance.shape()).toBe('rounded');
    expect(fixture.componentInstance.widthMode()).toBe('content');
    expect(fixture.nativeElement.querySelector('button')).toBeNull();
    expect(fixture.nativeElement.getAttribute('role')).toBeNull();
    expect(fixture.nativeElement.getAttribute('aria-live')).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('نشط');
  });

  it('represents every reference tone and visual variant through stable host facets', () => {
    const fixture = createBadge('حالة');
    const tones = [
      'neutral',
      'success',
      'warning',
      'danger',
      'info',
      'brand',
      'pending',
      'archived',
    ] as const;
    const variants = ['soft', 'solid', 'outline', 'ghost'] as const;

    for (const tone of tones) {
      fixture.componentRef.setInput('tone', tone);
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-status-badge-tone')).toBe(tone);
    }

    for (const variant of variants) {
      fixture.componentRef.setInput('variant', variant);
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-status-badge-variant')).toBe(variant);
    }
  });

  it('represents every reference size and preserves bounded compatibility shapes and widths', () => {
    const fixture = createBadge('حالة');

    for (const size of ['sm', 'md', 'lg', 'xl'] as const) {
      fixture.componentRef.setInput('size', size);
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-status-badge-size')).toBe(size);
    }

    for (const shape of ['square', 'rounded', 'pill'] as const) {
      fixture.componentRef.setInput('shape', shape);
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-status-badge-shape')).toBe(shape);
    }

    fixture.componentRef.setInput('widthMode', 'stretch');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-status-badge-width')).toBe('stretch');
  });

  it('renders the reference anatomy without replacing semantic icon and text owners', () => {
    const fixture = createBadge('قيد المراجعة');
    fixture.componentRef.setInput('icon', 'warning');
    fixture.componentRef.setInput('count', 12);
    fixture.componentRef.setInput('showDot', true);
    fixture.componentRef.setInput('pulse', true);
    fixture.componentRef.setInput('uppercase', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.status-badge__dot')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.status-badge__pulse')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.status-badge__icon erp-icon')).not.toBeNull();
    expect(fixture.nativeElement.querySelectorAll('erp-text').length).toBe(2);
    expect(fixture.nativeElement.querySelector('.status-badge__count')?.textContent).toContain('12');
    expect(fixture.nativeElement.getAttribute('data-status-badge-uppercase')).toBe('true');
  });

  it('uses a decorative image instead of an icon when both are configured', () => {
    const fixture = createBadge('المستخدم الحالي');
    fixture.componentRef.setInput('icon', 'user');
    fixture.componentRef.setInput('image', '/assets/avatar.png');
    fixture.detectChanges();

    const image = fixture.nativeElement.querySelector('.status-badge__image') as HTMLImageElement;
    expect(image).not.toBeNull();
    expect(image.getAttribute('alt')).toBe('');
    expect(fixture.nativeElement.querySelector('.status-badge__icon')).toBeNull();
  });

  it('emits a controlled selection intent from the main reference action', () => {
    const fixture = createBadge('قابل للاختيار');
    const clicks: MouseEvent[] = [];
    const selections: boolean[] = [];
    fixture.componentRef.setInput('interactive', true);
    fixture.componentRef.setInput('selected', false);
    fixture.componentInstance.badgeClick.subscribe((event) => clicks.push(event));
    fixture.componentInstance.selectedChange.subscribe((value) => selections.push(value));
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector(
      '[data-status-badge-action="main"] button',
    ) as HTMLButtonElement;
    expect(button.getAttribute('aria-pressed')).toBe('false');
    button.click();

    expect(clicks).toHaveLength(1);
    expect(selections).toEqual([true]);
  });

  it('renders the reference selected marker only for an interactive selected badge', () => {
    const fixture = createBadge('مختار');
    fixture.componentRef.setInput('interactive', true);
    fixture.componentRef.setInput('selected', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('status-badge--selected')).toBe(true);
    expect(fixture.nativeElement.querySelector('.status-badge__check erp-icon')).not.toBeNull();
    expect(
      fixture.nativeElement.querySelector('[data-status-badge-action="main"] button')
        .getAttribute('aria-pressed'),
    ).toBe('true');
  });

  it('keeps the remove action independent from the main interactive action', () => {
    const fixture = createBadge('قابل للإزالة');
    let clickCount = 0;
    let removeCount = 0;
    fixture.componentRef.setInput('interactive', true);
    fixture.componentRef.setInput('removable', true);
    fixture.componentInstance.badgeClick.subscribe(() => clickCount += 1);
    fixture.componentInstance.remove.subscribe(() => removeCount += 1);
    fixture.detectChanges();

    const removeButton = fixture.nativeElement.querySelector(
      '[data-status-badge-action="remove"] button',
    ) as HTMLButtonElement;
    expect(removeButton.getAttribute('aria-label')).toBe('إزالة قابل للإزالة');
    removeButton.click();

    expect(removeCount).toBe(1);
    expect(clickCount).toBe(0);
  });

  it('disables every action and emits no intent when disabled', () => {
    const fixture = createBadge('غير متاح');
    let selectionCount = 0;
    let removeCount = 0;
    fixture.componentRef.setInput('interactive', true);
    fixture.componentRef.setInput('removable', true);
    fixture.componentRef.setInput('disabled', true);
    fixture.componentInstance.selectedChange.subscribe(() => selectionCount += 1);
    fixture.componentInstance.remove.subscribe(() => removeCount += 1);
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    expect(buttons.length).toBe(2);
    expect([...buttons].every((button) => button.disabled)).toBe(true);
    buttons.forEach((button) => button.click());
    expect(selectionCount).toBe(0);
    expect(removeCount).toBe(0);
    expect(fixture.nativeElement.getAttribute('aria-disabled')).toBe('true');
  });
});
