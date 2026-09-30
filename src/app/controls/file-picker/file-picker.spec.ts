import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpFilePicker} from './file-picker';

describe('ErpFilePicker', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ErpFilePicker]});
  });

  function create() {
    const fixture = TestBed.createComponent(ErpFilePicker);
    fixture.componentRef.setInput('label', 'المستندات');
    fixture.detectChanges();
    return fixture;
  }

  it('creates as a multi-file CVA with the exact shared defaults', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input[type="file"]') as HTMLInputElement;

    expect(reflectComponentType(ErpFilePicker)?.selector).toBe('erp-file-picker');
    expect(control.accept()).toBeNull();
    expect(control.maxFileSize()).toBeNull();
    expect(control.minFiles()).toBeNull();
    expect(control.maxFiles()).toBeNull();
    expect(control.clearable()).toBe(true);
    expect(native.multiple).toBe(true);
    expect(host.getAttribute('data-file-picker-count')).toBe('0');
    expect(host.querySelector('[data-file-picker-browse]')).toBeTruthy();
    expect('upload' in (control as unknown as Record<string, unknown>)).toBe(false);
  });

  it('supports additive native selection, stable dedupe, and same-file reselection reset', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input[type="file"]') as HTMLInputElement;
    const first = file('first.txt', 'first', 'text/plain', 1);
    const second = file('second.pdf', 'second', 'application/pdf', 2);
    const onChange = vi.fn();
    control.registerOnChange(onChange);

    selectFiles(native, [first]);
    fixture.detectChanges();
    expect(native.value).toBe('');
    expect(onChange).toHaveBeenLastCalledWith([first]);

    selectFiles(native, [second]);
    fixture.detectChanges();
    expect(onChange).toHaveBeenLastCalledWith([first, second]);
    expect(host.querySelectorAll('[data-file-picker-item]').length).toBe(2);

    selectFiles(native, [first]);
    fixture.detectChanges();
    expect(native.value).toBe('');
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(host.getAttribute('data-file-picker-count')).toBe('2');
  });

  it('adds files from drag and drop without replacing the existing queue', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input[type="file"]') as HTMLInputElement;
    const dropZone = host.querySelector('.file-picker__drop-zone') as HTMLElement;
    const first = file('first.txt', 'first', 'text/plain', 1);
    const second = file('second.txt', 'second', 'text/plain', 2);
    const onChange = vi.fn();
    control.registerOnChange(onChange);

    selectFiles(native, [first]);
    dropFiles(dropZone, [second]);
    fixture.detectChanges();

    expect(onChange).toHaveBeenLastCalledWith([first, second]);
    expect(host.getAttribute('data-file-picker-drag-active')).toBe('false');
    expect(host.querySelectorAll('[data-file-picker-item]').length).toBe(2);
  });

  it('enforces accept, max-size, and max-count policy before queue insertion', () => {
    const fixture = create();
    fixture.componentRef.setInput('accept', '.txt');
    fixture.componentRef.setInput('maxFileSize', 5);
    fixture.componentRef.setInput('maxFiles', 1);
    fixture.detectChanges();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input[type="file"]') as HTMLInputElement;
    const accepted = file('ok.txt', 'okay', 'text/plain', 1);
    const wrongType = file('wrong.pdf', 'pdf', 'application/pdf', 2);
    const tooLarge = file('large.txt', '123456', 'text/plain', 3);
    const overCount = file('second.txt', 'two', 'text/plain', 4);
    const onChange = vi.fn();
    control.registerOnChange(onChange);

    selectFiles(native, [accepted, wrongType, tooLarge, overCount]);
    fixture.detectChanges();

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith([accepted]);
    expect(host.querySelectorAll('[data-file-picker-item]').length).toBe(1);
    expect(host.querySelector('erp-field-feedback')?.textContent).toContain(
      'غير مسموح',
    );
    expect(host.querySelector('erp-field-feedback')?.textContent).toContain(
      'الحد الأقصى للحجم',
    );
    expect(host.querySelector('erp-field-feedback')?.textContent).toContain(
      'الحد الأقصى لعدد الملفات',
    );
  });

  it('removes one file and clears the complete immutable CVA queue', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input[type="file"]') as HTMLInputElement;
    const first = file('first.txt', 'first', 'text/plain', 1);
    const second = file('second.txt', 'second', 'text/plain', 2);
    const onChange = vi.fn();
    control.registerOnChange(onChange);

    selectFiles(native, [first, second]);
    fixture.detectChanges();
    const initial = onChange.mock.calls.at(-1)?.[0] as readonly File[];
    expect(Object.isFrozen(initial)).toBe(true);

    (host.querySelector('[data-file-picker-remove] button') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(onChange).toHaveBeenLastCalledWith([second]);

    (host.querySelector('[data-file-picker-clear-all] button') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(onChange).toHaveBeenLastCalledWith([]);
    expect(host.getAttribute('data-file-picker-count')).toBe('0');
    expect(native.value).toBe('');
  });

  it('normalizes programmatic writes without populating the native browser input', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input[type="file"]') as HTMLInputElement;
    const selected = file('programmatic.txt', 'proof', 'text/plain', 1);
    const onChange = vi.fn();
    control.registerOnChange(onChange);

    control.writeValue([selected]);
    fixture.detectChanges();

    expect(host.getAttribute('data-file-picker-count')).toBe('1');
    expect(native.value).toBe('');
    expect(native.files?.length).toBe(0);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('reports no-selection and minFiles validation through the common error contract', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    fixture.componentRef.setInput('minFiles', 2);
    fixture.detectChanges();

    expect(control.inputState()).toBe('no-selection');
    expect(control.valid()).toBe(false);
    expect(control.validationIssues().map((issue) => issue.code)).toContain(
      'files.min-count',
    );
    expect(
      (host.querySelector('input[type="file"]') as HTMLInputElement)
        .getAttribute('aria-invalid'),
    ).toBe('true');
    expect(host.textContent).toContain('يجب اختيار 2 ملفًا على الأقل');
  });

});

function file(
  name: string,
  contents: string,
  type: string,
  lastModified: number,
): File {
  return new File([contents], name, {type, lastModified});
}

function fileList(files: readonly File[]): FileList {
  return {
    ...Object.fromEntries(files.map((entry, index) => [index, entry])),
    length: files.length,
    item: (index: number) => files[index] ?? null,
  } as unknown as FileList;
}

function selectFiles(input: HTMLInputElement, files: readonly File[]): void {
  Object.defineProperty(input, 'files', {
    configurable: true,
    value: fileList(files),
  });
  input.dispatchEvent(new Event('change'));
}

function dropFiles(target: HTMLElement, files: readonly File[]): void {
  const event = new Event('drop', {bubbles: true, cancelable: true});
  Object.defineProperty(event, 'dataTransfer', {
    value: {files: fileList(files), dropEffect: 'none'},
  });
  target.dispatchEvent(event);
}
