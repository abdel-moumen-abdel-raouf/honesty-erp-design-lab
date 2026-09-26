import {TestBed} from '@angular/core/testing';
import {ErpSelectionTile} from './selection-tile';

describe('ErpSelectionTile', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [ErpSelectionTile]}));

  it('owns stable native button semantics and deterministic state evidence', () => {
    const fixture = TestBed.createComponent(ErpSelectionTile);
    fixture.componentRef.setInput('label', 'Tile');
    fixture.componentRef.setInput('selected', true);
    fixture.componentRef.setInput('active', true);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const button = host.querySelector('button') as HTMLButtonElement;
    expect(button.type).toBe('button');
    expect(button.getAttribute('aria-label')).toBe('Tile');
    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(host.getAttribute('data-selection-tile-selected')).toBe('true');
    expect(host.getAttribute('data-selection-tile-active')).toBe('true');
  });

  it('emits activation only while enabled', () => {
    const fixture = TestBed.createComponent(ErpSelectionTile);
    fixture.componentRef.setInput('label', 'Tile');
    fixture.detectChanges();
    const activated = vi.fn();
    fixture.componentInstance.activated.subscribe(activated);
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.click();
    expect(activated).toHaveBeenCalledOnce();
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    button.click();
    expect(activated).toHaveBeenCalledOnce();
  });
});
