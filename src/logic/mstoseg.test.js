import miliToFormat from './mstoseg';

describe('Milisec to minutes and seconds', () => {
  it('returns a string formatted time from a milisec', () => {
    expect(miliToFormat(60999)).toMatch(/1:01/);
  });
});
