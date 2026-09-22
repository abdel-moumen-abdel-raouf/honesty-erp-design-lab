import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ErpText} from './text';

@Component({
  imports: [ErpText],
  template: '<erp-text id="custom-text">Projected content</erp-text>',
})
class CustomTextTestHost {}

@Component({
  imports: [ErpText],
  template: '<erp-text type="heading-3">Heading</erp-text>',
})
class CustomHeadingTestHost {}

@Component({
  imports: [ErpText],
  template: `
    <h1 erpText type="heading-1">Heading</h1>
    <p erpText type="paragraph">Paragraph</p>
    <span erpText type="span">Span</span>
    <strong erpText type="strong">Strong</strong>
    <blockquote erpText type="blockquote">Quote</blockquote>
    <figure><figcaption erpText type="figcaption">Caption</figcaption></figure>
    <label erpText type="label" for="native-test-input">Label</label>
    <input id="native-test-input">
    <ul><li erpText type="list-item">Item</li></ul>
    <dl>
      <dt erpText type="term">Term</dt>
      <dd erpText type="description">Description</dd>
    </dl>
    <table>
      <caption erpText type="caption">Table</caption>
      <tr>
        <th erpText type="table-header">Header</th>
        <td erpText type="table-cell">Cell</td>
      </tr>
    </table>
    <time erpText type="time">10:30</time>
    <bdi erpText type="bdi">BDI</bdi>
    <ruby erpText type="ruby">漢<rt>かん</rt></ruby>
    <code erpText type="code">ERP-001</code>
    <a erpText type="link" href="#proof">Native link</a>
  `,
})
class NativeTextTestHost {}

@Component({
  imports: [ErpText],
  template: `
    <erp-text id="custom-link" type="link">Link-looking text</erp-text>
    <a id="native-link" erpText type="link" href="#proof">Native interactive link</a>
  `,
})
class LinkTextTestHost {}

describe('ErpText', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ErpText,
        CustomTextTestHost,
        CustomHeadingTestHost,
        NativeTextTestHost,
        LinkTextTestHost,
      ],
    }).compileComponents();
  });

  it('creates in custom erp-text mode', () => {
    const fixture = TestBed.createComponent(CustomTextTestHost);
    fixture.detectChanges();
    const text = fixture.debugElement.query(By.directive(ErpText));

    expect(text).toBeTruthy();
    expect(text.componentInstance).toBeInstanceOf(ErpText);
    expect(text.nativeElement.tagName).toBe('ERP-TEXT');
  });

  it('creates in native erpText mode using the same ErpText class', () => {
    const fixture = TestBed.createComponent(NativeTextTestHost);
    fixture.detectChanges();
    const texts = fixture.debugElement.queryAll(By.directive(ErpText));

    expect(texts.length).toBe(18);
    expect(texts.every((text) => text.componentInstance instanceof ErpText)).toBe(true);
    expect(texts.some((text) => text.nativeElement.tagName !== 'ERP-TEXT')).toBe(true);
  });

  it('uses the exact public input defaults', () => {
    const fixture = TestBed.createComponent(ErpText);
    const component = fixture.componentInstance;

    expect(component.type()).toBe('text');
    expect(component.size()).toBe('auto');
    expect(component.weight()).toBe('auto');
    expect(component.tone()).toBe('auto');
    expect(component.family()).toBe('auto');
    expect(component.lineHeight()).toBe('auto');
    expect(component.fontStyle()).toBe('auto');
    expect(component.decoration()).toBe('auto');
    expect(component.align()).toBe('inherit');
    expect(component.wrap()).toBe('auto');
    expect(component.overflow()).toBe('visible');
    expect(component.lineClamp()).toBe(0);
    expect(component.direction()).toBe('inherit');
  });

  it('resolves the text type defaults into host data attributes', () => {
    const fixture = TestBed.createComponent(ErpText);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.getAttribute('data-text-type')).toBe('text');
    expect(host.getAttribute('data-text-size')).toBe('md');
    expect(host.getAttribute('data-text-weight')).toBe('regular');
    expect(host.getAttribute('data-text-tone')).toBe('primary');
    expect(host.getAttribute('data-text-family')).toBe('ui');
    expect(host.getAttribute('data-text-line-height')).toBe('loose');
    expect(host.getAttribute('data-text-font-style')).toBe('normal');
    expect(host.getAttribute('data-text-decoration')).toBe('none');
    expect(host.getAttribute('data-text-align')).toBe('inherit');
    expect(host.getAttribute('data-text-wrap')).toBe('normal');
    expect(host.getAttribute('data-text-overflow')).toBe('visible');
    expect(host.getAttribute('data-text-line-clamp')).toBe('0');
  });

  it('lets every explicit presentation input override the type preset', () => {
    const fixture = TestBed.createComponent(ErpText);
    fixture.componentRef.setInput('type', 'heading-1');
    fixture.componentRef.setInput('size', '5xl');
    fixture.componentRef.setInput('weight', 'regular');
    fixture.componentRef.setInput('tone', 'info');
    fixture.componentRef.setInput('family', 'latin');
    fixture.componentRef.setInput('lineHeight', 'tight');
    fixture.componentRef.setInput('fontStyle', 'italic');
    fixture.componentRef.setInput('decoration', 'line-through');
    fixture.componentRef.setInput('align', 'end');
    fixture.componentRef.setInput('wrap', 'break-spaces');
    fixture.componentRef.setInput('overflow', 'clip');
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.getAttribute('data-text-size')).toBe('5xl');
    expect(host.getAttribute('data-text-weight')).toBe('regular');
    expect(host.getAttribute('data-text-tone')).toBe('info');
    expect(host.getAttribute('data-text-family')).toBe('latin');
    expect(host.getAttribute('data-text-line-height')).toBe('tight');
    expect(host.getAttribute('data-text-font-style')).toBe('italic');
    expect(host.getAttribute('data-text-decoration')).toBe('line-through');
    expect(host.getAttribute('data-text-align')).toBe('end');
    expect(host.getAttribute('data-text-wrap')).toBe('break-spaces');
    expect(host.getAttribute('data-text-overflow')).toBe('clip');
  });

  it('maps direction to dir and omits inherited direction', () => {
    const fixture = TestBed.createComponent(ErpText);
    const host = fixture.nativeElement as HTMLElement;

    fixture.detectChanges();
    expect(host.hasAttribute('dir')).toBe(false);

    for (const direction of ['auto', 'rtl', 'ltr'] as const) {
      fixture.componentRef.setInput('direction', direction);
      fixture.detectChanges();
      expect(host.getAttribute('dir')).toBe(direction);
    }

    fixture.componentRef.setInput('direction', 'inherit');
    fixture.detectChanges();
    expect(host.hasAttribute('dir')).toBe(false);
  });

  it('adds heading accessibility only to custom heading hosts', () => {
    const customFixture = TestBed.createComponent(CustomHeadingTestHost);
    customFixture.detectChanges();
    const customHost = customFixture.nativeElement.querySelector('erp-text') as HTMLElement;

    expect(customHost.getAttribute('role')).toBe('heading');
    expect(customHost.getAttribute('aria-level')).toBe('3');

    const nativeFixture = TestBed.createComponent(NativeTextTestHost);
    nativeFixture.detectChanges();
    const nativeHeading = nativeFixture.nativeElement.querySelector('h1') as HTMLElement;

    expect(nativeHeading.tagName).toBe('H1');
    expect(nativeHeading.hasAttribute('role')).toBe(false);
    expect(nativeHeading.hasAttribute('aria-level')).toBe(false);
  });

  it('renders projected content through custom mode', () => {
    const fixture = TestBed.createComponent(CustomTextTestHost);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#custom-text')?.textContent).toContain(
      'Projected content',
    );
  });

  it('keeps custom link mode typography-only', () => {
    const fixture = TestBed.createComponent(LinkTextTestHost);
    fixture.detectChanges();
    const customLink = fixture.nativeElement.querySelector('#custom-link') as HTMLElement;

    expect(customLink.getAttribute('data-text-size')).toBe('md');
    expect(customLink.getAttribute('data-text-weight')).toBe('medium');
    expect(customLink.getAttribute('data-text-tone')).toBe('brand-primary');
    expect(customLink.getAttribute('data-text-decoration')).toBe('underline');
    expect(customLink.querySelectorAll('a').length).toBe(0);
    expect(customLink.hasAttribute('tabindex')).toBe(false);
    expect(customLink.hasAttribute('role')).toBe(false);
  });

  it('preserves a native interactive anchor without nesting another anchor', () => {
    const fixture = TestBed.createComponent(LinkTextTestHost);
    fixture.detectChanges();
    const nativeLink = fixture.nativeElement.querySelector('#native-link') as HTMLAnchorElement;
    const debugLink = fixture.debugElement.queryAll(By.directive(ErpText)).find((item) => {
      return item.nativeElement.id === 'native-link';
    });

    expect(nativeLink.tagName).toBe('A');
    expect(debugLink?.componentInstance).toBeInstanceOf(ErpText);
    expect(nativeLink.getAttribute('href')).toBe('#proof');
    expect(nativeLink.querySelectorAll('a').length).toBe(0);
  });

  it('accepts every supported lineClamp value from 0 through 6', () => {
    const fixture = TestBed.createComponent(ErpText);
    const host = fixture.nativeElement as HTMLElement;

    for (const lineClamp of [0, 1, 2, 3, 4, 5, 6] as const) {
      fixture.componentRef.setInput('lineClamp', lineClamp);
      fixture.detectChanges();
      expect(host.getAttribute('data-text-line-clamp')).toBe(String(lineClamp));
    }
  });

  it('supports every required representative native host', () => {
    const fixture = TestBed.createComponent(NativeTextTestHost);
    fixture.detectChanges();
    const requiredTags = [
      'h1',
      'p',
      'span',
      'strong',
      'blockquote',
      'figcaption',
      'label',
      'li',
      'dt',
      'dd',
      'caption',
      'th',
      'td',
      'time',
      'bdi',
      'ruby',
      'code',
      'a',
    ];

    for (const tag of requiredTags) {
      expect(fixture.nativeElement.querySelector(`${tag}[erptext]`)).toBeTruthy();
    }
  });
});
