import {
  normalizeColorPickerValue,
  resolveColorPickerValue,
} from './selection-utils';

describe('selection color utilities', () => {
  it('normalizes the exact ColorPicker union and rejects unknown system tokens', () => {
    expect(
      normalizeColorPickerValue({mode: 'system', token: 'primary-500'}),
    ).toEqual({mode: 'system', token: 'primary-500'});
    expect(
      normalizeColorPickerValue({mode: 'free', value: '#abcdef'}),
    ).toEqual({mode: 'free', value: '#ABCDEF'});
    expect(
      normalizeColorPickerValue({mode: 'system', token: 'primary-75'}),
    ).toBeNull();
  });

  it('resolves stored system identity through the current generated resolver', () => {
    const resolver = vi.fn(() => '#123456');

    expect(
      resolveColorPickerValue(
        {mode: 'system', token: 'primary-500'},
        resolver,
      ),
    ).toBe('#123456');
    expect(resolver).toHaveBeenCalledWith('primary-500');
    expect(
      resolveColorPickerValue({mode: 'free', value: '#ABCDEF'}, resolver),
    ).toBe('#ABCDEF');
    expect(resolver).toHaveBeenCalledOnce();
  });
});
