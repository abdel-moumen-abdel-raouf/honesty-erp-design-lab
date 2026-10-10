import {TestBed} from '@angular/core/testing';
import {ErpTooltipShowcase} from './tooltip-showcase';

describe('ErpTooltipShowcase', () => {
  beforeEach(async () => {
    Object.assign(HTMLElement.prototype, {
      showPopover: vi.fn(function(this: HTMLElement) { this.setAttribute('data-popover-open', ''); }),
      hidePopover: vi.fn(function(this: HTMLElement) { this.removeAttribute('data-popover-open'); }),
    });
    vi.spyOn(HTMLElement.prototype, 'matches').mockImplementation(function(this: HTMLElement, selector: string) {
      return selector === ':popover-open' ? this.hasAttribute('data-popover-open') : false;
    });
    await TestBed.configureTestingModule({imports: [ErpTooltipShowcase]}).compileComponents();
  });

  afterEach(() => vi.restoreAllMocks());

  it('keeps one target and authors valid plain and rich projection through the same workbench', () => {
    const fixture = TestBed.createComponent(ErpTooltipShowcase);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const target = root.querySelector('erp-tooltip[data-showcase-target]') as HTMLElement;

    expect(root.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(target.getAttribute('data-tooltip-state')).toBe('ready');
    expect(target.querySelector('erp-tooltip-content')).toBeNull();

    const variant = fixture.componentInstance.controls.find((control) => control.name === 'variant')!;
    fixture.componentInstance.applyControl({control: variant, value: 'rich'});
    fixture.detectChanges();

    expect(target.getAttribute('data-tooltip-variant')).toBe('rich');
    expect(target.getAttribute('data-tooltip-state')).toBe('ready');
    expect(target.querySelectorAll('erp-tooltip-content')).toHaveLength(1);
    expect(target.querySelector('erp-tooltip-content erp-button')).toBeNull();

    const interactive = fixture.componentInstance.controls.find((control) => control.name === 'interactive')!;
    fixture.componentInstance.applyControl({control: interactive, value: true});
    fixture.detectChanges();

    expect(target.getAttribute('data-tooltip-interactive')).toBe('true');
    expect(target.getAttribute('data-tooltip-state')).toBe('ready');
    expect(target.querySelectorAll('erp-tooltip-content erp-button')).toHaveLength(1);
  });

  it('exposes every shared motion preset through both animation controls', () => {
    const fixture = TestBed.createComponent(ErpTooltipShowcase);
    fixture.detectChanges();
    const enter = fixture.componentInstance.controls.find((control) => control.name === 'enterAnimation')!;
    const exit = fixture.componentInstance.controls.find((control) => control.name === 'exitAnimation')!;

    expect(enter.kind).toBe('select');
    expect(exit.kind).toBe('select');
    expect(enter.options).toHaveLength(23);
    expect(exit.options).toEqual(enter.options);
    expect(enter.options).toContain('zoom');
    expect(enter.options).toContain('roll');
  });
});
