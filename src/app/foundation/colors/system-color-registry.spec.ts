import {
  ERP_SYSTEM_COLOR_FAMILIES,
  ERP_SYSTEM_COLOR_PALETTES,
  ERP_SYSTEM_COLOR_STEPS,
  ErpSystemColorToken,
  resolveErpSystemColorToken,
} from './system-color-registry';

describe('Foundation system color registry', () => {
  it('exposes the exact family and step contracts', () => {
    expect(ERP_SYSTEM_COLOR_FAMILIES).toEqual([
      'neutral',
      'primary',
      'secondary',
      'accent',
      'green',
      'amber',
      'red',
      'cyan',
    ]);
    expect(ERP_SYSTEM_COLOR_STEPS).toEqual([
      50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
    ]);
  });

  it('resolves every generated system token to its normalized hex value', () => {
    for (const family of ERP_SYSTEM_COLOR_FAMILIES) {
      for (const step of ERP_SYSTEM_COLOR_STEPS) {
        const token = `${family}-${step}` as ErpSystemColorToken;
        const value = resolveErpSystemColorToken(token);

        expect(value).toBe(ERP_SYSTEM_COLOR_PALETTES[family][step]);
        expect(value).toMatch(/^#[0-9A-F]{6}$/);
      }
    }
  });
});
