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
    fixture.detectChanges();
    return fixture;
  }

  it('creates with horizontal attached defaults and logical positions', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;

    expect(fixture.componentInstance).toBeTruthy();
    expect(host.getAttribute('data-button-group-orientation')).toBe('horizontal');
    expect(host.getAttribute('data-button-group-attached')).toBe('true');
    expect(
      [...host.querySelectorAll('erp-button')].map((button) =>
        button.getAttribute('data-group-position'),
      ),
    ).toEqual(['first', 'middle', 'last']);
    expect(host.querySelectorAll('button')).toHaveLength(3);
  });

  it('updates orientation and attached facets and preserves child button output', () => {
    const fixture = create();
    const pressed = vi.fn();
    fixture.componentInstance.itemPressed.subscribe(pressed);

    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.componentRef.setInput('attached', false);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.getAttribute('data-button-group-orientation')).toBe('vertical');
    expect(host.getAttribute('data-button-group-attached')).toBe('false');
    host.querySelector<HTMLButtonElement>('button')?.click();
    expect(pressed).toHaveBeenCalledWith('save');
  });
});
