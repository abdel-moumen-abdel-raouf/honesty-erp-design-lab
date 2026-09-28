import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BordersRadius} from './borders-radius';

describe('Borders & Radius Candidate V1 Visual Specimen', () => {
  let fixture: ComponentFixture<BordersRadius>;
  let component: BordersRadius;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BordersRadius],
    }).compileComponents();

    fixture = TestBed.createComponent(BordersRadius);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the borders-radius specimen and inherit the global theme', () => {
    expect(component).toBeTruthy();
    const root = compiled.querySelector('#borders-radius-specimen-root');
    expect(root).toBeTruthy();
    expect(root?.hasAttribute('data-theme')).toBe(false);
  });

  describe('Section 1: Reference Border Widths', () => {
    it('should render all 3 Reference border-width specimens (0, 1, 2)', () => {
      const width0 = compiled.querySelector('#ref-width-specimen-0');
      const width1 = compiled.querySelector('#ref-width-specimen-1');
      const width2 = compiled.querySelector('#ref-width-specimen-2');

      expect(width0).toBeTruthy();
      expect(width1).toBeTruthy();
      expect(width2).toBeTruthy();

      expect(width0?.textContent).toContain('$honesty-ref-border-width-0');
      expect(width1?.textContent).toContain('$honesty-ref-border-width-1');
      expect(width2?.textContent).toContain('$honesty-ref-border-width-2');
    });
  });

  describe('Section 2: Reference Border Styles', () => {
    it('should render both Reference style specimens (solid, dashed)', () => {
      const solidSpecimen = compiled.querySelector('#ref-style-specimen-solid');
      const dashedSpecimen = compiled.querySelector('#ref-style-specimen-dashed');

      expect(solidSpecimen).toBeTruthy();
      expect(dashedSpecimen).toBeTruthy();

      expect(solidSpecimen?.textContent).toContain('$honesty-ref-border-style-solid');
      expect(dashedSpecimen?.textContent).toContain('$honesty-ref-border-style-dashed');
    });

    it('should render the Semantic dashed-border proof', () => {
      const dashedProof = compiled.querySelector('#semantic-border-style-dashed');
      expect(dashedProof).toBeTruthy();
      expect(dashedProof?.textContent).toContain('--honesty-border-style-dashed');
    });
  });

  describe('Section 3: Border Color vs Geometry Contract under inherited App theme', () => {
    it('should render the border hierarchy once under the inherited App theme', () => {
      const context = compiled.querySelector('#border-theme-context-current');
      expect(context).toBeTruthy();
      expect(context?.hasAttribute('data-theme')).toBe(false);
      expect(context?.querySelector('#current-border-subtle')).toBeTruthy();
      expect(context?.querySelector('#current-border-default')).toBeTruthy();
      expect(context?.querySelector('#current-border-strong')).toBeTruthy();
    });
  });

  describe('Section 4: Emphasis Width Review', () => {
    it('should render side-by-side comparison of Default (1px) and Emphasis (2px) widths', () => {
      const defaultCard = compiled.querySelector('#specimen-width-default');
      const emphasisCard = compiled.querySelector('#specimen-width-emphasis');

      expect(defaultCard).toBeTruthy();
      expect(emphasisCard).toBeTruthy();

      expect(defaultCard?.textContent).toContain('--honesty-border-width-default');
      expect(emphasisCard?.textContent).toContain('--honesty-border-width-emphasis');
    });

    it('should explicitly document that emphasis 2px is not equivalent to strong border color', () => {
      const note = compiled.querySelector('#emphasis-explanation-note');
      expect(note).toBeTruthy();
      expect(note?.textContent).toContain('--honesty-border-strong');
    });
  });

  describe('Section 5: Reference Radius Scale', () => {
    it('should render all 7 Reference radius scale specimens (0, 2, 4, 6, 8, 12, full)', () => {
      const expectedSteps = ['0', '2', '4', '6', '8', '12', 'full'];

      for (const step of expectedSteps) {
        const specimen = compiled.querySelector(`#ref-radius-specimen-${step}`);
        expect(specimen).toBeTruthy();
        expect(specimen?.textContent).toContain(`$honesty-ref-radius-${step}`);
      }

      expect(compiled.querySelector('#ref-radius-specimen-full')?.textContent).toContain('9999px');
    });

    it('should render the unaliased radius note for 2px and 12px primitives', () => {
      const unaliasedNote = compiled.querySelector('#unaliased-radius-note');
      expect(unaliasedNote).toBeTruthy();
      expect(unaliasedNote?.textContent).toContain('$honesty-ref-radius-2');
      expect(unaliasedNote?.textContent).toContain('$honesty-ref-radius-12');
    });
  });

  describe('Section 6: Semantic Radius Roles', () => {
    it('should render all 5 Semantic radius role specimens (none, control, surface, overlay, full)', () => {
      const noneRole = compiled.querySelector('#semantic-radius-none');
      const controlRole = compiled.querySelector('#semantic-radius-control');
      const surfaceRole = compiled.querySelector('#semantic-radius-surface');
      const overlayRole = compiled.querySelector('#semantic-radius-overlay');
      const fullRole = compiled.querySelector('#semantic-radius-full');

      expect(noneRole).toBeTruthy();
      expect(controlRole).toBeTruthy();
      expect(surfaceRole).toBeTruthy();
      expect(overlayRole).toBeTruthy();
      expect(fullRole).toBeTruthy();

      expect(noneRole?.textContent).toContain('--honesty-radius-none');
      expect(controlRole?.textContent).toContain('--honesty-radius-control');
      expect(surfaceRole?.textContent).toContain('--honesty-radius-surface');
      expect(overlayRole?.textContent).toContain('--honesty-radius-overlay');
      expect(fullRole?.textContent).toContain('--honesty-radius-full');
    });
  });

  describe('Section 7: Combined Geometry Composition', () => {
    it('should render the combined composition samples A, B, C, and D', () => {
      const sampleA = compiled.querySelector('#composition-sample-a');
      const sampleB = compiled.querySelector('#composition-sample-b');
      const sampleC = compiled.querySelector('#composition-sample-c');
      const sampleD = compiled.querySelector('#composition-sample-d');

      expect(sampleA).toBeTruthy();
      expect(sampleB).toBeTruthy();
      expect(sampleC).toBeTruthy();
      expect(sampleD).toBeTruthy();

      expect(sampleA?.textContent).toContain('--honesty-border-width-default');
      expect(sampleB?.textContent).toContain('--honesty-border-strong');
      expect(sampleC?.textContent).toContain('--honesty-border-width-emphasis');
      expect(sampleD?.textContent).toContain('--honesty-radius-overlay');
    });
  });

  describe('Section 8: Focus Ring Geometry', () => {
    it('should render one inherited-theme Focus context with two static proofs and one native target', () => {
      const section = compiled.querySelector('#sec-focus-ring-geometry');
      const context = section?.querySelector('[data-focus-context="current"]');
      expect(context).toBeTruthy();
      expect(context?.querySelectorAll('[data-focus-static-proof]')).toHaveLength(2);
      expect(context?.querySelector('erp-button[data-focus-keyboard-target]')).toBeTruthy();
    });

    it('should render the four runtime token names used by the Focus evidence', () => {
      const tokens = Array.from(
        compiled.querySelectorAll<HTMLElement>('#focus-contract-tokens [data-focus-token]')
      ).map((token) => token.textContent?.trim());

      expect(tokens).toEqual([
        '--honesty-focus-ring-width',
        '--honesty-focus-ring-offset',
        '--honesty-focus-ring-style',
        '--honesty-color-action-focus-ring',
      ]);
    });
  });
});
