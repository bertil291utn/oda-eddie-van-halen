import sanitizeName from './sanitizeTrackName';

describe('return sanitized track name', () => {
  it('returns a string without - match', () => {
    expect(sanitizeName('Mean Street - 2015 Remaster')).toMatch(/Mean Street/);
  })
  it('returns the same string', () => {
    expect(sanitizeName('Mean Street')).toMatch(/Mean Street/);
  })
})
