import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Spacing} from './spacing';

describe('Spacing Candidate V1 Visual Specimen', () => {
  let fixture: ComponentFixture<Spacing>;
  let component: Spacing;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Spacing],
    }).compileComponents();

    fixture = TestBed.createComponent(Spacing);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the spacing specimen component', () => {
    expect(component).toBeTruthy();
  });

  describe('4px Grid & Reference Scale Verification', () => {
    it('should render the 4px grid explanation note', () => {
      const gridNote = compiled.querySelector('#grid-4px-explanation');
      expect(gridNote).toBeTruthy();
      expect(gridNote?.textContent).toContain('4px');
      expect(gridNote?.textContent).toContain('20');
      expect(gridNote?.textContent).toContain('40');
      expect(gridNote?.textContent).toContain('64');
    });

    it('should render all 11 Reference scale steps in component data', () => {
      expect(component.referenceSteps.length).toBe(11);
      const expectedSteps = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64];
      const actualSteps = component.referenceSteps.map((s) => s.step);
      expect(actualSteps).toEqual(expectedSteps);
    });

    it('should render all 11 Reference scale visual specimens in the DOM', () => {
      const expectedSteps = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64];

      for (const step of expectedSteps) {
        const row = compiled.querySelector(`#ref-step-row-${step}`);
        const tokenName = compiled.querySelector(`#ref-token-name-${step}`);
        const remVal = compiled.querySelector(`#ref-rem-val-${step}`);
        const pxVal = compiled.querySelector(`#ref-px-val-${step}`);
        const visualDemo = compiled.querySelector(`#ref-specimen-gap-${step}`);

        expect(row).toBeTruthy();
        expect(tokenName).toBeTruthy();
        expect(remVal).toBeTruthy();
        expect(pxVal).toBeTruthy();
        expect(visualDemo).toBeTruthy();
      }
    });

    it('should specifically render the Reference 0 specimen with markers', () => {
      const row0 = compiled.querySelector('#ref-step-row-0');
      const visualDemo0 = compiled.querySelector('#ref-specimen-gap-0');
      const markerStart0 = compiled.querySelector('#ref-marker-start-0');
      const markerEnd0 = compiled.querySelector('#ref-marker-end-0');

      expect(row0).toBeTruthy();
      expect(visualDemo0).toBeTruthy();
      expect(visualDemo0?.classList).toContain('ref-gap-0');
      expect(markerStart0).toBeTruthy();
      expect(markerEnd0).toBeTruthy();
    });

    it('should accurately label unaliased reference steps 20, 40, and 64', () => {
      const unaliasedSteps = [20, 40, 64];
      for (const step of unaliasedSteps) {
        const badge = compiled.querySelector(`#alias-badge-unaliased-${step}`);
        expect(badge).toBeTruthy();
        expect(badge?.textContent?.trim()).toContain('مرجعي مجرد');
      }
    });
  });

  describe('Semantic Inline Spacing Verification', () => {
    it('should render the inline spacing section with all 3 specimens', () => {
      const section = compiled.querySelector('#inline-spacing-section');
      expect(section).toBeTruthy();

      const tight = compiled.querySelector('#inline-specimen-tight');
      const def = compiled.querySelector('#inline-specimen-default');
      const loose = compiled.querySelector('#inline-specimen-loose');

      expect(tight).toBeTruthy();
      expect(def).toBeTruthy();
      expect(loose).toBeTruthy();
    });

    it('should render 3 inline items in each inline specimen', () => {
      const tightItems = compiled.querySelectorAll('#inline-specimen-tight .inline-neutral-item');
      const defItems = compiled.querySelectorAll('#inline-specimen-default .inline-neutral-item');
      const looseItems = compiled.querySelectorAll('#inline-specimen-loose .inline-neutral-item');

      expect(tightItems.length).toBe(3);
      expect(defItems.length).toBe(3);
      expect(looseItems.length).toBe(3);
    });
  });

  describe('Semantic Stack Spacing Verification', () => {
    it('should render the stack spacing section with all 3 specimens', () => {
      const section = compiled.querySelector('#stack-spacing-section');
      expect(section).toBeTruthy();

      const tight = compiled.querySelector('#stack-specimen-tight');
      const def = compiled.querySelector('#stack-specimen-default');
      const loose = compiled.querySelector('#stack-specimen-loose');

      expect(tight).toBeTruthy();
      expect(def).toBeTruthy();
      expect(loose).toBeTruthy();
    });

    it('should render 3 stack content rows in each stack specimen', () => {
      const tightRows = compiled.querySelectorAll('#stack-specimen-tight .stack-neutral-row');
      const defRows = compiled.querySelectorAll('#stack-specimen-default .stack-neutral-row');
      const looseRows = compiled.querySelectorAll('#stack-specimen-loose .stack-neutral-row');

      expect(tightRows.length).toBe(3);
      expect(defRows.length).toBe(3);
      expect(looseRows.length).toBe(3);
    });
  });

  describe('Semantic Inset Spacing Verification', () => {
    it('should render the inset spacing section with all 3 specimens', () => {
      const section = compiled.querySelector('#inset-spacing-section');
      expect(section).toBeTruthy();

      const tight = compiled.querySelector('#inset-specimen-tight');
      const def = compiled.querySelector('#inset-specimen-default');
      const loose = compiled.querySelector('#inset-specimen-loose');

      expect(tight).toBeTruthy();
      expect(def).toBeTruthy();
      expect(loose).toBeTruthy();
    });

    it('should render inner bounded content within each inset specimen', () => {
      const tightInner = compiled.querySelector('#inset-inner-tight');
      const defInner = compiled.querySelector('#inset-inner-default');
      const looseInner = compiled.querySelector('#inset-inner-loose');

      expect(tightInner).toBeTruthy();
      expect(defInner).toBeTruthy();
      expect(looseInner).toBeTruthy();
    });
  });

  describe('Semantic Section Spacing Verification', () => {
    it('should render the section spacing section with both default and large specimens', () => {
      const section = compiled.querySelector('#section-spacing-section');
      expect(section).toBeTruthy();

      const def = compiled.querySelector('#section-gap-default-specimen');
      const lg = compiled.querySelector('#section-gap-large-specimen');

      expect(def).toBeTruthy();
      expect(lg).toBeTruthy();
    });

    it('should render two neutral groups in each section gap comparison', () => {
      const defGroups = compiled.querySelectorAll('#section-gap-default-specimen .section-neutral-group');
      const lgGroups = compiled.querySelectorAll('#section-gap-large-specimen .section-neutral-group');

      expect(defGroups.length).toBe(2);
      expect(lgGroups.length).toBe(2);
    });
  });

  describe('Realistic Rhythm Composition Verification', () => {
    it('should render the realistic rhythm composition section', () => {
      const section = compiled.querySelector('#rhythm-composition-section');
      const composition = compiled.querySelector('#rhythm-realistic-composition');
      const heading = compiled.querySelector('#rhythm-heading-1');
      const body = compiled.querySelector('#rhythm-body-1');
      const inlineTags = compiled.querySelector('#rhythm-inline-tags');
      const relatedBlock = compiled.querySelector('#rhythm-related-block');
      const majorSection2 = compiled.querySelector('#rhythm-major-section-2');

      expect(section).toBeTruthy();
      expect(composition).toBeTruthy();
      expect(heading).toBeTruthy();
      expect(body).toBeTruthy();
      expect(inlineTags).toBeTruthy();
      expect(relatedBlock).toBeTruthy();
      expect(majorSection2).toBeTruthy();
    });
  });
});
