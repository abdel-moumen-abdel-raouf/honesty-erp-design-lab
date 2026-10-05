import {TestBed} from '@angular/core/testing';
import {ErpOverlayManager} from '../../shared/overlay/overlay-manager';
import {ErpFilterDrawer} from './filter-drawer';

describe('ErpFilterDrawer',()=>{
  it('opens a framed blocking end drawer with staged filter data',()=>{
    const afterClosed=Promise.resolve({type:'dismissed',reason:'test'} as const);
    const open=vi.fn((...arguments_: unknown[])=>{
      void arguments_;
      return {afterClosed};
    });
    TestBed.configureTestingModule({providers:[{provide:ErpOverlayManager,useValue:{open}}]});
    const f=TestBed.createComponent(ErpFilterDrawer);
    f.componentRef.setInput('definitions',[{key:'status',label:'الحالة'}]);
    f.componentRef.setInput('filters',[{key:'status',label:'الحالة',value:'نشط'}]);
    f.detectChanges();
    (f.nativeElement.querySelector('button') as HTMLButtonElement).click();
    expect(open).toHaveBeenCalledOnce();
    const config=open.mock.calls[0][1] as {kind: string; position: string; frame: {footer: {actions: readonly {id: string}[]}}};
    expect(config.kind).toBe('drawer'); expect(config.position).toBe('end');
    expect(config.frame.footer.actions.map((action: {id:string})=>action.id)).toEqual(['clear','cancel','apply']);
  });

  it('does not open while disabled',()=>{
    const open=vi.fn(); TestBed.configureTestingModule({providers:[{provide:ErpOverlayManager,useValue:{open}}]});
    const f=TestBed.createComponent(ErpFilterDrawer);f.componentRef.setInput('definitions',[]);f.componentRef.setInput('disabled',true);f.detectChanges();
    (f.nativeElement.querySelector('button') as HTMLButtonElement).click();expect(open).not.toHaveBeenCalled();
  });
});
