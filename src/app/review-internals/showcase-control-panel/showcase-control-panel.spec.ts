import {TestBed} from '@angular/core/testing';
import {
  ErpReviewShowcaseControlPanel,
  ErpShowcaseControlDefinition,
} from './showcase-control-panel';

describe('ErpReviewShowcaseControlPanel', () => {
  function create(
    controls: readonly ErpShowcaseControlDefinition[],
    values: Readonly<Record<string, unknown>>,
  ) {
    const fixture = TestBed.createComponent(ErpReviewShowcaseControlPanel);
    fixture.componentRef.setInput('controls', controls);
    fixture.componentRef.setInput('values', values);
    fixture.detectChanges();
    return fixture;
  }

  it('emits an input change immediately from its live editor', () => {
    const definition: ErpShowcaseControlDefinition = {
      name: 'disabled',
      label: 'disabled',
      source: 'input',
      kind: 'boolean',
      required: false,
      type: 'boolean',
      options: ['false', 'true'],
      initialValue: false,
    };
    const fixture = create([definition], {disabled: false});
    const changed = vi.fn();
    fixture.componentInstance.controlChanged.subscribe(changed);

    fixture.componentInstance.editor(definition).setValue(true);

    expect(changed).toHaveBeenCalledWith({control: definition, value: true});
  });

  it('keeps invalid JSON out of the live component and exposes a validation message', () => {
    const definition: ErpShowcaseControlDefinition = {
      name: 'items',
      label: 'items',
      source: 'input',
      kind: 'json',
      required: true,
      type: 'readonly Item[]',
      options: [],
      initialValue: [],
    };
    const fixture = create([definition], {items: []});
    const changed = vi.fn();
    fixture.componentInstance.controlChanged.subscribe(changed);

    fixture.componentInstance.editor(definition).setValue('{invalid');

    expect(changed).not.toHaveBeenCalled();
    expect(fixture.componentInstance.error('items')).toContain('JSON غير صالح');
  });

  it('maps the preview position slider value to its numeric API value', () => {
    const definition: ErpShowcaseControlDefinition = {
      name: '$previewInline',
      label: 'الموضع الأفقي',
      source: 'preview',
      kind: 'range',
      required: false,
      type: 'number',
      options: [],
      initialValue: 80,
    };
    const fixture = create([definition], {$previewInline: 80});
    const changed = vi.fn();
    fixture.componentInstance.controlChanged.subscribe(changed);

    fixture.componentInstance.editor(definition).setValue({lower: 0, upper: 35});

    expect(changed).toHaveBeenCalledWith({control: definition, value: 35});
  });
});
