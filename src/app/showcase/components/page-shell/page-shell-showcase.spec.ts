import {TestBed} from '@angular/core/testing';
import {ErpPageShellShowcase} from './page-shell-showcase';

describe('ErpPageShellShowcase', () => {
  it('renders one complete page composition with distinct projected regions', () => {
    const fixture = TestBed.createComponent(ErpPageShellShowcase);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const target = host.querySelector('[data-showcase-target]') as HTMLElement;

    expect(host.querySelectorAll('[data-showcase-target]')).toHaveLength(1);
    expect(target.querySelector('.page-shell__header')?.textContent).toContain('مراجعة إقفال الفترة');
    expect(target.querySelector('.page-shell__main')?.textContent).toContain('قيود اليومية');
    expect(target.querySelector('.page-shell__side')?.textContent).toContain('سياق الفترة');
    expect(target.querySelector('.page-shell__footer')?.textContent).toContain('مملوكة للتطبيق المستهلك');
  });
});
