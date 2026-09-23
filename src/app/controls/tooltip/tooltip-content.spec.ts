import {reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpTooltipContent} from './tooltip-content';

describe('ErpTooltipContent', () => {
  it('creates as the exact projection-only companion', async () => {
    await TestBed.configureTestingModule({imports: [ErpTooltipContent]}).compileComponents();
    const fixture = TestBed.createComponent(ErpTooltipContent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
    expect(reflectComponentType(ErpTooltipContent)?.selector).toBe('erp-tooltip-content');
    expect((fixture.nativeElement as HTMLElement).textContent).toBe('');
  });
});
