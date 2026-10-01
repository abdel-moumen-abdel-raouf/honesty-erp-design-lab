import {
  containsAlphabeticCharacter,
  ERP_DATE_FINAL_PATTERN,
  ERP_DATE_TIME_FINAL_PATTERN,
  ERP_INTEGER_FINAL_PATTERN,
  ERP_MONEY_FINAL_PATTERN,
  ERP_NUMBER_FINAL_PATTERN,
  ERP_TEL_FINAL_PATTERN,
  ERP_TIME_FINAL_PATTERN,
  ERP_URL_FINAL_PATTERN,
  isDigitsOnlyDraft,
  isHttpUrlDomainValue,
  isProgressiveHttpUrlDraft,
  isProgressiveNumericDraft,
  matchesDomainPattern,
  parseFiniteDomainNumber,
  resolveDomainPattern,
  sanitizeTelephoneDraft,
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

  it('keeps integer admission distinct from decimal NumberStepper/Money syntax', () => {
    const integer = resolveDomainPattern(null, ERP_INTEGER_FINAL_PATTERN).regex;
    const number = resolveDomainPattern(null, ERP_NUMBER_FINAL_PATTERN).regex;
    const money = resolveDomainPattern(null, ERP_MONEY_FINAL_PATTERN).regex;

    expect(isDigitsOnlyDraft('')).toBe(true);
    expect(isDigitsOnlyDraft('125')).toBe(true);
    expect(isDigitsOnlyDraft('12.5')).toBe(false);
    expect(isDigitsOnlyDraft('-12')).toBe(false);
    expect(isProgressiveNumericDraft('-')).toBe(true);
    expect(isProgressiveNumericDraft('12.')).toBe(true);
    expect(isProgressiveNumericDraft('12a')).toBe(false);
    expect(parseFiniteDomainNumber('125', integer)).toBe(125);
    expect(parseFiniteDomainNumber('12.5', integer)).toBeNull();
    expect(parseFiniteDomainNumber('12.', number)).toBeNull();
    expect(parseFiniteDomainNumber('12.', money)).toBe(12);
  });

  it('accepts real domain URLs with optional HTTP(S) scheme and rejects incomplete hosts', () => {
    const pattern = resolveDomainPattern(null, ERP_URL_FINAL_PATTERN).regex;

    expect(isProgressiveHttpUrlDraft('h')).toBe(true);
    expect(isProgressiveHttpUrlDraft('example.com')).toBe(true);
    expect(isProgressiveHttpUrlDraft('https://example.com/path')).toBe(true);
    expect(isProgressiveHttpUrlDraft('plain text')).toBe(false);
    expect(isProgressiveHttpUrlDraft('ftp://example.com')).toBe(false);

    for (const value of [
      'http://www.example.com',
      'https://www.example.com',
      'www.example.com',
      'example.com',
      'http://example.com',
      'https://example.com',
      'example.org',
      'example.net',
      'example.ai',
      'https://sub.example.dev/path?x=1',
    ]) {
      expect(isHttpUrlDomainValue(value, pattern)).toBe(true);
    }

    expect(isHttpUrlDomainValue('http://www.s', pattern)).toBe(false);
    expect(isHttpUrlDomainValue('example.c', pattern)).toBe(false);
    expect(isHttpUrlDomainValue('localhost', pattern)).toBe(false);
    expect(isHttpUrlDomainValue('ftp://example.com', pattern)).toBe(false);
    expect(isHttpUrlDomainValue('https://', pattern)).toBe(false);
  });

  it('enforces telephone shape and detects alphabetic draft characters', () => {
    const pattern = resolveDomainPattern(null, ERP_TEL_FINAL_PATTERN).regex;

    expect(matchesDomainPattern('+201001234567', pattern)).toBe(true);
    expect(matchesDomainPattern('+20 100 123 4567', pattern)).toBe(false);
    expect(sanitizeTelephoneDraft('++20 A 100-123')).toBe('+20100123');
    expect(sanitizeTelephoneDraft('20 (100) 123')).toBe('20100123');
    expect(containsAlphabeticCharacter('+20 ABC')).toBe(true);
    expect(containsAlphabeticCharacter('+20100')).toBe(false);
  });

  it('provides the exact temporal final-value admission patterns', () => {
    const date = resolveDomainPattern(null, ERP_DATE_FINAL_PATTERN).regex;
    const time = resolveDomainPattern(null, ERP_TIME_FINAL_PATTERN).regex;
    const dateTime = resolveDomainPattern(
      null,
      ERP_DATE_TIME_FINAL_PATTERN,
    ).regex;

    expect(matchesDomainPattern('2026-05-04', date)).toBe(true);
    expect(matchesDomainPattern('04/05/2026', date)).toBe(false);
    expect(matchesDomainPattern('09:35', time)).toBe(true);
    expect(matchesDomainPattern('9:35', time)).toBe(false);
    expect(matchesDomainPattern('2026-05-04T09:35', dateTime)).toBe(true);
    expect(matchesDomainPattern('2026-05-04 09:35', dateTime)).toBe(false);
  });
});
