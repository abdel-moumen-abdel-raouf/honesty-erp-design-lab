import {Component, reflectComponentType} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ERP_TEXT_TYPE_DEFAULTS, ErpText, ErpTextType} from './text';

@Component({
  imports: [ErpText],
  template: '<erp-text id="projected-text">Projected once</erp-text>',
})
class ProjectedContentTestHost {}

@Component({
  imports: [ErpText],
  template: `
    <erp-text
      id="link-proof"
      type="link"
      href="#proof"
      target="_blank"
      rel="noopener"
      download="proof.png"
    >
      Link
    </erp-text>
    <erp-text id="label-proof" type="label" for="customer-proof">Label</erp-text>
    <erp-text id="time-proof" type="time" datetime="2026-09-22">Time</erp-text>
    <erp-text id="data-proof" type="data" value="1240">Data</erp-text>
    <erp-text id="abbr-proof" type="abbreviation" title="Enterprise Resource Planning">
      ERP
    </erp-text>
    <erp-text id="quote-proof" type="quote" cite="/source">Quote</erp-text>
    <erp-text id="bdo-proof" type="bdo" direction="ltr">BDO</erp-text>
    <erp-text id="output-proof" type="output" for="customer-proof">Output</erp-text>
  `,
})
class AttributeForwardingTestHost {}

@Component({
  imports: [ErpText],
  template: `
    <erp-text id="selection-default" type="paragraph">
      Default
    </erp-text>
    <erp-text id="selection-enabled" type="paragraph" selectable>
      Enabled
    </erp-text>
    <erp-text id="selection-explicit-false" type="paragraph" selectable="false">
      Explicit false
    </erp-text>
    <erp-text id="selection-bound-false" type="paragraph" [selectable]="false">
      Bound false
    </erp-text>
  `,
})
class SelectionBooleanAttributeTestHost {}

describe('ErpText', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ErpText,
        ProjectedContentTestHost,
        AttributeForwardingTestHost,
        SelectionBooleanAttributeTestHost,
      ],
    }).compileComponents();
  });

  it('creates with the custom-element-only selector', () => {
    const fixture = TestBed.createComponent(ProjectedContentTestHost);
    fixture.detectChanges();
    const text = fixture.debugElement.query(By.directive(ErpText));

    expect(text.componentInstance).toBeInstanceOf(ErpText);
    expect(text.nativeElement.tagName).toBe('ERP-TEXT');
    expect(reflectComponentType(ErpText)?.selector).toBe('erp-text');
  });

  it('keeps all 54 type defaults exhaustive', () => {
    expect(Object.keys(ERP_TEXT_TYPE_DEFAULTS).length).toBe(54);
    expect(new Set(Object.keys(ERP_TEXT_TYPE_DEFAULTS)).size).toBe(54);
  });

  it('uses the exact public input defaults', () => {
    const component = TestBed.createComponent(ErpText).componentInstance;

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
    expect(component.selectable()).toBe(false);
    expect(component.href()).toBeNull();
    expect(component.target()).toBeNull();
    expect(component.rel()).toBeNull();
    expect(component.download()).toBeNull();
    expect(component.forId()).toBeNull();
    expect(component.datetime()).toBeNull();
    expect(component.value()).toBeNull();
    expect(component.title()).toBeNull();
    expect(component.cite()).toBeNull();
  });

  it('is unselectable by default', () => {
    const fixture = TestBed.createComponent(ErpText);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect(fixture.componentInstance.selectable()).toBe(false);
    expect(host.getAttribute('data-text-selectable')).toBe('false');
  });

  it('coerces bare, string false, and bound false selectable inputs', () => {
    const fixture = TestBed.createComponent(SelectionBooleanAttributeTestHost);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('#selection-default')?.getAttribute('data-text-selectable')).toBe(
      'false',
    );
    expect(root.querySelector('#selection-enabled')?.getAttribute('data-text-selectable')).toBe(
      'true',
    );
    expect(
      root.querySelector('#selection-explicit-false')?.getAttribute('data-text-selectable'),
    ).toBe('false');
    expect(
      root.querySelector('#selection-bound-false')?.getAttribute('data-text-selectable'),
    ).toBe('false');
  });

  it('updates selectable dynamically', () => {
    const fixture = TestBed.createComponent(ErpText);
    const host = fixture.nativeElement as HTMLElement;

    fixture.componentRef.setInput('selectable', true);
    fixture.detectChanges();
    expect(host.getAttribute('data-text-selectable')).toBe('true');

    fixture.componentRef.setInput('selectable', false);
    fixture.detectChanges();
    expect(host.getAttribute('data-text-selectable')).toBe('false');
  });

  it('keeps selection independent from representative type presets', () => {
    const fixture = TestBed.createComponent(ErpText);
    const host = fixture.nativeElement as HTMLElement;

    for (const type of ['heading-1', 'paragraph', 'code', 'link', 'table-cell'] as const) {
      fixture.componentRef.setInput('type', type);
      fixture.detectChanges();
      expect(host.getAttribute('data-text-selectable')).toBe('false');
    }

    fixture.componentRef.setInput('selectable', true);
    fixture.detectChanges();
    expect(host.getAttribute('data-text-selectable')).toBe('true');
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
    expect(host.getAttribute('data-text-native-element')).toBe('span');
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

  it('emits the exact safe internal native elements', () => {
    const fixtures: readonly (readonly [ErpTextType, string])[] = [
      ['text', 'span'],
      ['heading-1', 'h1'],
      ['heading-2', 'h2'],
      ['heading-3', 'h3'],
      ['heading-4', 'h4'],
      ['heading-5', 'h5'],
      ['heading-6', 'h6'],
      ['paragraph', 'p'],
      ['div', 'div'],
      ['span', 'span'],
      ['pre', 'pre'],
      ['blockquote', 'blockquote'],
      ['address', 'address'],
      ['strong', 'strong'],
      ['bold', 'b'],
      ['emphasis', 'em'],
      ['italic', 'i'],
      ['underline', 'u'],
      ['strike', 's'],
      ['deleted', 'del'],
      ['inserted', 'ins'],
      ['mark', 'mark'],
      ['small', 'small'],
      ['subscript', 'sub'],
      ['superscript', 'sup'],
      ['abbreviation', 'abbr'],
      ['definition', 'dfn'],
      ['citation', 'cite'],
      ['quote', 'q'],
      ['time', 'time'],
      ['data', 'data'],
      ['bdi', 'bdi'],
      ['bdo', 'bdo'],
      ['code', 'code'],
      ['keyboard', 'kbd'],
      ['sample', 'samp'],
      ['variable', 'var'],
      ['label', 'label'],
      ['output', 'output'],
      ['link', 'a'],
    ];
    const fixture = TestBed.createComponent(ErpText);
    const host = fixture.nativeElement as HTMLElement;

    for (const [type, tag] of fixtures) {
      fixture.componentRef.setInput('type', type);
      fixture.detectChanges();
      expect(fixture.componentInstance.nativeElement()).toBe(tag);
      expect(host.getAttribute('data-text-native-element')).toBe(tag);
      expect(host.querySelectorAll(`:scope > ${tag}.erp-text__native`).length).toBe(1);
    }
  });

  it('uses real internal headings without duplicate host heading semantics', () => {
    const fixture = TestBed.createComponent(ErpText);
    const host = fixture.nativeElement as HTMLElement;

    fixture.componentRef.setInput('type', 'heading-1');
    fixture.detectChanges();
    expect(host.querySelectorAll(':scope > h1').length).toBe(1);
    expect(host.hasAttribute('role')).toBe(false);
    expect(host.hasAttribute('aria-level')).toBe(false);

    fixture.componentRef.setInput('type', 'heading-6');
    fixture.detectChanges();
    expect(host.querySelectorAll(':scope > h6').length).toBe(1);
    expect(host.hasAttribute('role')).toBe(false);
    expect(host.hasAttribute('aria-level')).toBe(false);
  });

  it('keeps code on the inherited internal typography contract without a monospace API', () => {
    const fixture = TestBed.createComponent(ErpText);
    fixture.componentRef.setInput('type', 'code');
    fixture.detectChanges();
    const code = fixture.nativeElement.querySelector(':scope > code.erp-text__native');

    expect(code).toBeTruthy();
    expect(fixture.nativeElement.getAttribute('data-text-family')).toBe('latin');
    expect('monospace' in fixture.componentInstance).toBe(false);
  });

  it('forwards link attributes to exactly one internal anchor', () => {
    const fixture = TestBed.createComponent(AttributeForwardingTestHost);
    fixture.detectChanges();
    const host = fixture.nativeElement.querySelector('#link-proof') as HTMLElement;
    const anchor = host.querySelector('a') as HTMLAnchorElement;

    expect(host.querySelectorAll('a').length).toBe(1);
    expect(host.hasAttribute('tabindex')).toBe(false);
    expect(host.hasAttribute('role')).toBe(false);
    expect(anchor.getAttribute('href')).toBe('#proof');
    expect(anchor.getAttribute('target')).toBe('_blank');
    expect(anchor.getAttribute('rel')).toBe('noopener');
    expect(anchor.getAttribute('download')).toBe('proof.png');
  });

  it('forwards label, time, data, abbreviation, quote, and bdo attributes', () => {
    const fixture = TestBed.createComponent(AttributeForwardingTestHost);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('#label-proof > label')?.getAttribute('for')).toBe('customer-proof');
    expect(root.querySelector('#time-proof > time')?.getAttribute('datetime')).toBe('2026-09-22');
    expect(root.querySelector('#data-proof > data')?.getAttribute('value')).toBe('1240');
    expect(root.querySelector('#abbr-proof > abbr')?.getAttribute('title')).toBe(
      'Enterprise Resource Planning',
    );
    expect(root.querySelector('#quote-proof > q')?.getAttribute('cite')).toBe('/source');
    expect(root.querySelector('#bdo-proof > bdo')?.getAttribute('dir')).toBe('ltr');
    expect(root.querySelector('#output-proof > output')?.getAttribute('for')).toBe(
      'customer-proof',
    );
  });

  it('emits bdi and output native elements', () => {
    const fixture = TestBed.createComponent(ErpText);

    fixture.componentRef.setInput('type', 'bdi');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector(':scope > bdi')).toBeTruthy();

    fixture.componentRef.setInput('type', 'output');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector(':scope > output')).toBeTruthy();
  });

  it('does not emit invalid native elements for structural-context types', () => {
    const fixtures: readonly (readonly [ErpTextType, string])[] = [
      ['hgroup', 'hgroup'],
      ['figure', 'figure'],
      ['figcaption', 'figcaption'],
      ['ruby', 'ruby'],
      ['ruby-text', 'rt'],
      ['ruby-parenthesis', 'rp'],
      ['legend', 'legend'],
      ['caption', 'caption'],
      ['summary', 'summary'],
      ['list-item', 'li'],
      ['term', 'dt'],
      ['description', 'dd'],
      ['table-header', 'th'],
      ['table-cell', 'td'],
    ];
    const fixture = TestBed.createComponent(ErpText);
    const host = fixture.nativeElement as HTMLElement;

    for (const [type, forbiddenTag] of fixtures) {
      fixture.componentRef.setInput('type', type);
      fixture.detectChanges();
      expect(fixture.componentInstance.nativeElement()).toBe('none');
      expect(host.hasAttribute('data-text-native-element')).toBe(false);
      expect(host.querySelector(forbiddenTag)).toBeNull();
    }
  });

  it('renders projected content exactly once', () => {
    const fixture = TestBed.createComponent(ProjectedContentTestHost);
    fixture.detectChanges();
    const host = fixture.debugElement.query(By.directive(ErpText)).nativeElement as HTMLElement;

    expect(host.textContent?.match(/Projected once/g)?.length).toBe(1);
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
});
