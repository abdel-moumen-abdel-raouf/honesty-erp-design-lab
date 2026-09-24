import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpSearchBox} from './search-box';

describe('ErpSearchBox', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ErpSearchBox]});
  });

  function create() {
    const fixture = TestBed.createComponent(ErpSearchBox);
    fixture.componentRef.setInput('label', 'Search');
    fixture.detectChanges();
    return fixture;
  }

  it('creates with search semantics, off autocomplete, and semantic search icon', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;

    expect(reflectComponentType(ErpSearchBox)?.selector).toBe('erp-search-box');
    expect(control.autocomplete()).toBe('off');
    expect(native.type).toBe('search');
    expect(native.autocomplete).toBe('off');
    expect(host.querySelector('erp-icon')?.getAttribute('data-icon-name')).toBe(
      'search',
    );
  });

  it('publishes direct search typing and provides no search-submit output', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const native = fixture.nativeElement.querySelector(
      'input',
    ) as HTMLInputElement;
    const onChange = vi.fn();
    control.registerOnChange(onChange);
    native.value = 'invoice';
    native.dispatchEvent(new Event('input'));

    expect(onChange).toHaveBeenCalledWith('invoice');
    expect(
      'searchSubmitted' in
        (control as unknown as Record<string, unknown>),
    ).toBe(false);
  });

  it('uses the configured leading icon instead of the default search icon', () => {
    const fixture = create();
    fixture.componentRef.setInput('leadingIcon', 'filter');
    fixture.detectChanges();
    expect(
      fixture.nativeElement
        .querySelector('erp-icon')
        ?.getAttribute('data-icon-name'),
    ).toBe('filter');
  });
});
