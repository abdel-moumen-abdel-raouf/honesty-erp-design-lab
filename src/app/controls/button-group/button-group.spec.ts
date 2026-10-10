import {TestBed} from '@angular/core/testing';
import {ErpButtonGroup} from './button-group';

describe('ErpButtonGroup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ErpButtonGroup]});
  });

  function create() {
    const fixture = TestBed.createComponent(ErpButtonGroup);
    fixture.componentRef.setInput('items', [
      {value: 'save', label: 'Save'},
      {value: 'copy', label: 'Copy'},
      {value: 'delete', label: 'Delete', disabled: true},
    ]);
    fixture.componentRef.setInput('ariaLabel', 'Document actions');
    fixture.detectChanges();
    return fixture;
  }

  it('creates with horizontal attached defaults and logical segment geometry', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;
    const buttons = [...host.querySelectorAll('erp-button')];

    expect(fixture.componentInstance).toBeTruthy();
    expect(host.getAttribute('data-button-group-orientation')).toBe('horizontal');
    expect(host.getAttribute('data-button-group-attached')).toBe('true');
    expect(host.querySelector('[role="group"]')?.getAttribute('aria-label'))
      .toBe('Document actions');
    expect(getComputedStyle(host).inlineSize).toBe('fit-content');
    expect(buttons.map((button) => button.getAttribute('data-group-position')))
      .toEqual(['first', 'middle', 'last']);
    expect(buttons.map((button) => button.getAttribute('data-attached-axis')))
      .toEqual(['inline', 'inline', 'inline']);
    expect(buttons.map((button) => button.getAttribute('data-attached-position')))
      .toEqual(['first', 'middle', 'last']);
    expect(host.querySelectorAll('button')).toHaveLength(3);
  });

  it('uses block-axis attached geometry for vertical groups', () => {
    const fixture = create();
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();
    const buttons = [
      ...(fixture.nativeElement as HTMLElement).querySelectorAll('erp-button'),
    ];

    expect(buttons.map((button) => button.getAttribute('data-attached-axis')))
      .toEqual(['block', 'block', 'block']);
  });

  it('removes attached geometry when detached and preserves child output', () => {
    const fixture = create();
    const pressed = vi.fn();
    fixture.componentInstance.itemPressed.subscribe(pressed);

    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.componentRef.setInput('attached', false);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.getAttribute('data-button-group-orientation')).toBe('vertical');
    expect(host.getAttribute('data-button-group-attached')).toBe('false');
    for (const button of host.querySelectorAll('erp-button')) {
      expect(button.hasAttribute('data-attached-axis')).toBe(false);
      expect(button.hasAttribute('data-attached-position')).toBe(false);
    }

    host.querySelector<HTMLButtonElement>('button')?.click();
    expect(pressed).toHaveBeenCalledWith('save');
  });
});
