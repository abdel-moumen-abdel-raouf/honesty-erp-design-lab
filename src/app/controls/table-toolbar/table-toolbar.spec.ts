import {TestBed} from '@angular/core/testing';
import {ErpTableToolbar} from './table-toolbar';

describe('ErpTableToolbar', () => {
  it('emits refresh/export intents without owning data operations', () => {
    const fixture=TestBed.createComponent(ErpTableToolbar);
    fixture.componentRef.setInput('showExport',true);
    const refresh=vi.fn(), exported=vi.fn();
    fixture.componentInstance.refreshRequested.subscribe(refresh);
    fixture.componentInstance.exportRequested.subscribe(exported);
    fixture.detectChanges();
    const buttons=[...fixture.nativeElement.querySelectorAll('button')] as HTMLButtonElement[];
    buttons.forEach((button)=>button.click());
    expect(refresh).toHaveBeenCalledOnce(); expect(exported).toHaveBeenCalledOnce();
  });
});
