import {TestBed} from '@angular/core/testing';
import {ErpApplicationsMenu} from './applications-menu';

describe('ErpApplicationsMenu', () => {
  function fixtureWithItems() {
    const fixture = TestBed.createComponent(ErpApplicationsMenu);
    fixture.componentRef.setInput('groups', [
      {
        id: 'operations',
        label: 'العمليات',
        items: [
          {id: 'sales', label: 'المبيعات', icon: 'shopping-cart'},
          {id: 'inventory', label: 'المخزون', icon: 'inventory'},
          {id: 'blocked', label: 'موقوف', icon: 'lock', disabled: true},
        ],
      },
    ]);
    fixture.detectChanges();
    const surface = fixture.nativeElement.querySelector(
      '.applications-menu__surface',
    ) as HTMLElement;
    Object.defineProperties(surface, {
      hidePopover: {configurable: true, value: vi.fn()},
      showPopover: {configurable: true, value: vi.fn()},
    });
    return fixture;
  }

  it('renders grouped applications and emits enabled activation', () => {
    const fixture = fixtureWithItems();
    const activated = vi.fn();
    fixture.componentInstance.applicationActivated.subscribe(activated);

    (fixture.nativeElement.querySelector('erp-icon-button button') as HTMLButtonElement).click();
    expect(fixture.componentInstance.open()).toBe(true);
    const actions = fixture.nativeElement.querySelectorAll(
      'erp-shell-menu-action button',
    ) as NodeListOf<HTMLButtonElement>;
    expect(actions).toHaveLength(3);
    actions[0].click();
    expect(activated).toHaveBeenCalledWith(
      expect.objectContaining({id: 'sales'}),
    );
    expect(fixture.componentInstance.open()).toBe(false);
  });

  it('keeps disabled applications inert and closes on Escape', () => {
    const fixture = fixtureWithItems();
    const activated = vi.fn();
    fixture.componentInstance.applicationActivated.subscribe(activated);
    const trigger = fixture.nativeElement.querySelector(
      'erp-icon-button button',
    ) as HTMLButtonElement;
    trigger.click();
    const actions = fixture.nativeElement.querySelectorAll(
      'erp-shell-menu-action button',
    ) as NodeListOf<HTMLButtonElement>;
    expect(actions[2].disabled).toBe(true);
    actions[2].click();
    expect(activated).not.toHaveBeenCalled();
    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', bubbles: true}));
    expect(fixture.componentInstance.open()).toBe(false);
    expect(document.activeElement).toBe(trigger);
  });

  it('uses reference geometry and reduced-motion protection', () => {
    const styles = (
      ErpApplicationsMenu as unknown as {ɵcmp: {styles: readonly string[]}}
    ).ɵcmp.styles.join(' ');
    expect(styles).toContain('var(--honesty-applications-menu-popup-width)');
    expect(styles).toContain('grid-template-columns');
    expect(styles).toContain('prefers-reduced-motion: reduce');
  });
});
