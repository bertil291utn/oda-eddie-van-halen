import API from '../Api';
import searchVanHalenBand from './searchVanHalenBand';

describe('band', () => {
  it('returns an array of Van Halens coincides tracks', async () => {
    const response = await API.getSearchSongRelated('Hot for Teacher')
    expect(Array.isArray(searchVanHalenBand(response.response.hits))).toBeTruthy()
  })
})

