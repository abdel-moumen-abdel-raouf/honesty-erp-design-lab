import {TestBed} from '@angular/core/testing';
import {ErpStatusBadge} from './status-badge';
describe('ErpStatusBadge', () => { it('renders semantic noninteractive status evidence', () => { const f = TestBed.createComponent(ErpStatusBadge); f.componentRef.setInput('label', 'نشط'); f.componentRef.setInput('tone', 'success'); f.detectChanges(); expect(f.nativeElement.getAttribute('data-status-badge-tone')).toBe('success'); expect(f.nativeElement.querySelector('button')).toBeNull(); expect(f.nativeElement.textContent).toContain('نشط'); }); });
