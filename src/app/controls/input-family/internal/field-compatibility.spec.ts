import {resolveFieldCompatibility} from './field-compatibility';

describe('Field Family compatibility matrix', () => {
  const defaults = {
    appearance: 'standard',
    borderMode: 'solid',
    shape: 'default',
    variant: 'outline',
    multiline: false,
    clearable: false,
    canRepresentEmpty: true,
  } as const;

  it('forces text variant to the effective underline border mode', () => {
    for (const borderMode of ['solid', 'underline'] as const) {
      expect(
        resolveFieldCompatibility({
          ...defaults,
          variant: 'text',
          borderMode,
        }),
      ).toEqual({
        configurationState: 'ready',
        effectiveBorderMode: 'underline',
      });
    }
  });

  it('accepts glass only for solid, outline, and subtle variants', () => {
    for (const variant of ['solid', 'outline', 'subtle'] as const) {
      expect(
        resolveFieldCompatibility({
          ...defaults,
          appearance: 'glass',
          variant,
        }).configurationState,
      ).toBe('ready');
    }

    for (const variant of ['ghost', 'text'] as const) {
      expect(
        resolveFieldCompatibility({
          ...defaults,
          appearance: 'glass',
          variant,
        }).configurationState,
      ).toBe('invalid');
    }
  });

  it('accepts dashed only for outline and subtle and underline for every variant', () => {
    for (const variant of ['solid', 'outline', 'subtle', 'ghost', 'text'] as const) {
      expect(
        resolveFieldCompatibility({
          ...defaults,
          variant,
          borderMode: 'underline',
        }).configurationState,
      ).toBe('ready');
    }

    for (const variant of ['outline', 'subtle'] as const) {
      expect(
        resolveFieldCompatibility({
          ...defaults,
          variant,
          borderMode: 'dashed',
        }).configurationState,
      ).toBe('ready');
    }

    for (const variant of ['solid', 'ghost', 'text'] as const) {
      expect(
        resolveFieldCompatibility({
          ...defaults,
          variant,
          borderMode: 'dashed',
        }).configurationState,
      ).toBe('invalid');
    }
  });

  it('rejects pill for multiline fields and keeps it valid for single-line fields', () => {
    expect(
      resolveFieldCompatibility({
        ...defaults,
        shape: 'pill',
        multiline: false,
      }).configurationState,
    ).toBe('ready');
    expect(
      resolveFieldCompatibility({
        ...defaults,
        shape: 'pill',
        multiline: true,
      }).configurationState,
    ).toBe('invalid');
  });

  it('rejects clear when a concrete control cannot represent an empty value', () => {
    expect(
      resolveFieldCompatibility({
        ...defaults,
        clearable: true,
        canRepresentEmpty: false,
      }).configurationState,
    ).toBe('invalid');
    expect(
      resolveFieldCompatibility({
        ...defaults,
        clearable: true,
        canRepresentEmpty: true,
      }).configurationState,
    ).toBe('ready');
  });
});
