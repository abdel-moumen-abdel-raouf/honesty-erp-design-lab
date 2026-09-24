import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpFilePicker} from './file-picker';

describe('ErpFilePicker', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ErpFilePicker]});
  });

  function create() {
    const fixture = TestBed.createComponent(ErpFilePicker);
    fixture.componentRef.setInput('label', 'Document');
    fixture.detectChanges();
    return fixture;
  }

  it('creates as a single-file CVA with the exact defaults', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;

    expect(reflectComponentType(ErpFilePicker)?.selector).toBe('erp-file-picker');
    expect(control.accept()).toBeNull();
    expect(control.clearable()).toBe(true);
    expect(native.type).toBe('file');
    expect(native.multiple).toBe(false);
    expect(host.getAttribute('data-file-picker-selected')).toBe('false');
    expect(host.querySelector('[data-file-picker-browse] button')?.textContent).toContain('Choose file');
  });

  it('accepts one native browser file and publishes it once', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;
    const file = new File(['proof'], 'proof.txt', {type: 'text/plain'});
    const onChange = vi.fn();
    control.registerOnChange(onChange);
    setFiles(native, file);

    native.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith(file);
    expect(host.getAttribute('data-file-picker-file-name')).toBe('proof.txt');
  });

  it('never attempts to populate the native file input from a non-null form write', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;
    const file = new File(['proof'], 'programmatic.txt', {type: 'text/plain'});
    const onChange = vi.fn();
    control.registerOnChange(onChange);

    control.writeValue(file);
    fixture.detectChanges();

    expect(host.getAttribute('data-file-picker-file-name')).toBe('programmatic.txt');
    expect(native.value).toBe('');
    expect(native.files?.length).toBe(0);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('clears the CVA value and native input', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;
    const file = new File(['proof'], 'proof.txt', {type: 'text/plain'});
    const onChange = vi.fn();
    control.registerOnChange(onChange);
    control.writeValue(file);
    fixture.detectChanges();

    (host.querySelector('erp-icon-button button') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(onChange).toHaveBeenCalledWith(null);
    expect(host.getAttribute('data-file-picker-selected')).toBe('false');
    expect(native.value).toBe('');
  });
});

function setFiles(input: HTMLInputElement, file: File): void {
  Object.defineProperty(input, 'files', {
    configurable: true,
    value: {
      0: file,
      length: 1,
      item: (index: number) => (index === 0 ? file : null),
    },
  });
}
