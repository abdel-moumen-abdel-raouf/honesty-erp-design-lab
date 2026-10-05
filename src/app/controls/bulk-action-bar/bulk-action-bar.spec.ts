import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpButton} from '../button/button';
import {ErpBulkActionBar} from './bulk-action-bar';

@Component({changeDetection:ChangeDetectionStrategy.OnPush,imports:[ErpBulkActionBar,ErpButton],template:`<erp-bulk-action-bar [selectedCount]="2"><erp-button label="أرشفة" /></erp-bulk-action-bar>`})
class Host {}

describe('ErpBulkActionBar',()=>{
  it('hides at zero and renders selected summary with projected actions',()=>{
    const empty=TestBed.createComponent(ErpBulkActionBar); empty.detectChanges(); expect(empty.nativeElement.textContent.trim()).toBe('');
    const fixture=TestBed.createComponent(Host); fixture.detectChanges(); expect(fixture.nativeElement.textContent).toContain('2 سجل'); expect(fixture.nativeElement.textContent).toContain('أرشفة');
  });
  it('emits clear-selection intent',()=>{const f=TestBed.createComponent(ErpBulkActionBar);f.componentRef.setInput('selectedCount',1);const spy=vi.fn();f.componentInstance.clearSelection.subscribe(spy);f.detectChanges();(f.nativeElement.querySelector('button') as HTMLButtonElement).click();expect(spy).toHaveBeenCalledOnce();});
});
