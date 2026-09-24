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
    fixture.componentRef.setInput('label', 'Image');
    fixture.detectChanges();
    return fixture;
  }

  it('creates as a single-image CVA with exact defaults', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;

    expect(reflectComponentType(ErpImagePicker)?.selector).toBe('erp-image-picker');
    expect(control.accept()).toBe('image/*');
    expect(control.clearable()).toBe(true);
    expect(native.type).toBe('file');
    expect(native.multiple).toBe(false);
    expect(host.querySelector('img')).toBeNull();
  });

  it('creates a local preview for an image and rejects non-image files', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const image = new File(['image'], 'photo.png', {type: 'image/png'});
    const text = new File(['text'], 'proof.txt', {type: 'text/plain'});

    control.writeValue(image);
    fixture.detectChanges();
    expect(host.querySelector('img')?.getAttribute('src')).toBe('blob:photo.png');
    expect(host.getAttribute('data-image-picker-file-name')).toBe('photo.png');

    control.writeValue(text);
    fixture.detectChanges();
    expect(host.querySelector('img')).toBeNull();
    expect(host.getAttribute('data-image-picker-selected')).toBe('false');
  });

  it('revokes previews on replacement and destroy', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const first = new File(['one'], 'one.png', {type: 'image/png'});
    const second = new File(['two'], 'two.png', {type: 'image/png'});

    control.writeValue(first);
    control.writeValue(second);
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:one.png');

    fixture.destroy();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:two.png');
  });

  it('publishes native image selection and clears native/value state', () => {
    const fixture = create();
    const control = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;
    const native = host.querySelector('input') as HTMLInputElement;
    const image = new File(['image'], 'selected.png', {type: 'image/png'});
    const onChange = vi.fn();
    control.registerOnChange(onChange);
    setFiles(native, image);

    native.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(onChange).toHaveBeenCalledWith(image);
    expect(host.querySelector('img')?.getAttribute('src')).toBe('blob:selected.png');

    (host.querySelector('erp-icon-button button') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(onChange).toHaveBeenLastCalledWith(null);
    expect(native.value).toBe('');
    expect(host.querySelector('img')).toBeNull();
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
