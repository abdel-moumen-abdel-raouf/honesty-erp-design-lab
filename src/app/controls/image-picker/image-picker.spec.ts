import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpImagePicker} from './image-picker';

describe('ErpImagePicker', () => {
  beforeEach(() => {
    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: vi.fn((file: File) => `blob:${file.name}`),
    });
    Object.defineProperty(URL, 'revokeObjectURL', {
      configurable: true,
      value: vi.fn(),
    });
    TestBed.configureTestingModule({imports: [ErpImagePicker]});
  });

  function create() {
    const fixture = TestBed.createComponent(ErpImagePicker);
    fixture.componentRef.setInput('label', 'الصور');
    fixture.detectChanges();
    return fixture;
  }

  it('creates as a multi-image CVA with the exact defaults and preview contract', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input[type="file"]') as HTMLInputElement;

    expect(reflectComponentType(ErpImagePicker)?.selector).toBe('erp-image-picker');
    expect(control.accept()).toBe('image/*');
    expect(control.maxFileSize()).toBeNull();
    expect(control.maxFiles()).toBeNull();
    expect(control.clearable()).toBe(true);
    expect(control.previewSize()).toBe('md');
    expect(native.multiple).toBe(true);
    expect(host.getAttribute('data-image-picker-preview-size')).toBe('md');
    expect('upload' in (control as unknown as Record<string, unknown>)).toBe(false);
  });

  it('creates stable Object URLs for additive image selection without recreating duplicates', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input[type="file"]') as HTMLInputElement;
    const first = image('first.png', 1);
    const second = image('second.jpg', 2, 'image/jpeg');
    const onChange = vi.fn();
    control.registerOnChange(onChange);

    selectFiles(native, [first]);
    fixture.detectChanges();
    selectFiles(native, [first, second]);
    fixture.detectChanges();

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith([first, second]);
    expect(URL.createObjectURL).toHaveBeenCalledTimes(2);
    expect(host.querySelectorAll('img').length).toBe(2);
    expect(host.querySelectorAll('[data-image-picker-item]').length).toBe(2);
  });

  it('rejects non-image files through the default local accept policy', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input[type="file"]') as HTMLInputElement;
    const text = new File(['text'], 'proof.txt', {type: 'text/plain'});
    const onChange = vi.fn();
    control.registerOnChange(onChange);

    selectFiles(native, [text]);
    fixture.detectChanges();

    expect(onChange).not.toHaveBeenCalled();
    expect(host.querySelectorAll('img').length).toBe(0);
    expect(host.querySelector('erp-field-feedback')?.textContent).toContain(
      'غير مسموح',
    );
  });

  it('revokes one preview on removal and every remaining preview on clear', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input[type="file"]') as HTMLInputElement;
    const first = image('first.png', 1);
    const second = image('second.png', 2);
    control.registerOnChange(vi.fn());

    selectFiles(native, [first, second]);
    fixture.detectChanges();
    (host.querySelector('[data-image-picker-remove] button') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:first.png');
    expect(URL.revokeObjectURL).not.toHaveBeenCalledWith('blob:second.png');

    (host.querySelector('[data-image-picker-clear-all] button') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:second.png');
    expect(host.querySelectorAll('img').length).toBe(0);
  });

  it('reconciles programmatic writes and revokes remaining previews on destroy', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const first = image('first.png', 1);
    const second = image('second.png', 2);

    control.writeValue([first]);
    control.writeValue([first, second]);
    expect(URL.createObjectURL).toHaveBeenCalledTimes(2);
    expect(URL.revokeObjectURL).not.toHaveBeenCalled();

    fixture.destroy();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:first.png');
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:second.png');
  });

  it('supports all three preview-size host facets', () => {
    const fixture = create();
    const host = fixture.nativeElement as HTMLElement;

    for (const size of ['sm', 'md', 'lg'] as const) {
      fixture.componentRef.setInput('previewSize', size);
      fixture.detectChanges();
      expect(host.getAttribute('data-image-picker-preview-size')).toBe(size);
    }
  });
});

function image(
  name: string,
  lastModified: number,
  type = 'image/png',
): File {
  return new File(['image'], name, {type, lastModified});
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
