import {TestBed} from '@angular/core/testing';
import {ERP_OVERLAY_DATA} from '../../overlay/overlay-tokens';
import {
  ErpConfirmDialogContent,
  ErpConfirmDialogData,
} from './confirm-dialog-content';

describe('ErpConfirmDialogContent', () => {
  it('renders message, optional details, and normalized intent through ERP primitives', () => {
    const data: ErpConfirmDialogData = {
      message: 'هل تريد حذف السجل؟',
      details: 'لا يمكن التراجع عن الحذف.',
      intent: 'danger',
    };
    TestBed.configureTestingModule({
      imports: [ErpConfirmDialogContent],
      providers: [{provide: ERP_OVERLAY_DATA, useValue: data}],
    });
    const fixture = TestBed.createComponent(ErpConfirmDialogContent);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;

    expect(
      root.querySelector('[data-system-confirm-dialog-content]')?.getAttribute(
        'data-confirm-dialog-intent',
      ),
    ).toBe('danger');
    expect(root.textContent).toContain(data.message);
    expect(root.textContent).toContain(data.details);
    expect(root.querySelectorAll('erp-text')).toHaveLength(2);
  });
});
