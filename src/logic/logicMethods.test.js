import logicMethods from './logicMethods';
import API from '../Api';

const {
  filterLimitedTracks,
  miliToFormat,
  sanitizeName,
  searchVanHalenBand,
} = logicMethods;

describe('Filter tracks only ten method', () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  it('returns an array with limited tracks ', () => {
    expect(filterLimitedTracks(array, 10)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});

describe('Milisec to minutes and seconds', () => {
  it('returns a string formatted time from a milisec', () => {
    expect(miliToFormat(60999)).toMatch(/1:01/);
  });
});

describe('return sanitized track name', () => {
  it('returns a string without - match', () => {
    expect(sanitizeName('Mean Street - 2015 Remaster')).toMatch(/Mean Street/);
  });
  it('returns the same string', () => {
    expect(sanitizeName('Mean Street')).toMatch(/Mean Street/);
  });
});

describe('band', () => {
  it('returns an array of Van Halens coincides tracks', async () => {
    const response = await API.getSearchSongRelated('Hot for Teacher');
    expect(Array.isArray(searchVanHalenBand(response.response.hits))).toBeTruthy();
  });
});
