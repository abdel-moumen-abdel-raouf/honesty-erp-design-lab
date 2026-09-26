import {
  containsAlphabeticCharacter,
  ERP_MONEY_FINAL_PATTERN,
  ERP_NUMBER_FINAL_PATTERN,
  ERP_TEL_FINAL_PATTERN,
  ERP_URL_FINAL_PATTERN,
  isHttpUrlDomainValue,
  isProgressiveNumericDraft,
  matchesDomainPattern,
  parseFiniteDomainNumber,
  resolveDomainPattern,
} from './domain-validation';

describe('domain validation', () => {
  it('resolves built-in and developer override patterns deterministically', () => {
    const builtIn = resolveDomainPattern(null, ERP_NUMBER_FINAL_PATTERN);
    const override = resolveDomainPattern('^\\d{2}$', ERP_NUMBER_FINAL_PATTERN);
    const invalid = resolveDomainPattern('[', ERP_NUMBER_FINAL_PATTERN);

    expect(builtIn.configurationState).toBe('ready');
    expect(matchesDomainPattern('12.5', builtIn.regex)).toBe(true);
    expect(matchesDomainPattern('12.', builtIn.regex)).toBe(false);
    expect(override.expression).toBe('^\\d{2}$');
    expect(matchesDomainPattern('12', override.regex)).toBe(true);
    expect(matchesDomainPattern('123', override.regex)).toBe(false);
    expect(invalid.configurationState).toBe('invalid');
    expect(invalid.regex).toBeNull();
  });

  it('keeps progressive numeric drafts distinct from final numeric values', () => {
    const number = resolveDomainPattern(null, ERP_NUMBER_FINAL_PATTERN).regex;
    const money = resolveDomainPattern(null, ERP_MONEY_FINAL_PATTERN).regex;

    expect(isProgressiveNumericDraft('-')).toBe(true);
    expect(isProgressiveNumericDraft('12.')).toBe(true);
    expect(isProgressiveNumericDraft('12a')).toBe(false);
    expect(parseFiniteDomainNumber('12.', number)).toBeNull();
    expect(parseFiniteDomainNumber('12.', money)).toBe(12);
  });

  it('requires URL pattern admission plus real HTTP or HTTPS parsing', () => {
    const pattern = resolveDomainPattern(null, ERP_URL_FINAL_PATTERN).regex;

    expect(isHttpUrlDomainValue('https://example.com/path', pattern)).toBe(true);
    expect(isHttpUrlDomainValue('ftp://example.com', pattern)).toBe(false);
    expect(isHttpUrlDomainValue('https://', pattern)).toBe(false);
  });

  it('enforces telephone shape and detects alphabetic draft characters', () => {
    const pattern = resolveDomainPattern(null, ERP_TEL_FINAL_PATTERN).regex;

    expect(matchesDomainPattern('+20 100 123 4567', pattern)).toBe(true);
    expect(matchesDomainPattern('+20 ABC', pattern)).toBe(false);
    expect(containsAlphabeticCharacter('+20 ABC')).toBe(true);
    expect(containsAlphabeticCharacter('+20 100')).toBe(false);
  });
});
