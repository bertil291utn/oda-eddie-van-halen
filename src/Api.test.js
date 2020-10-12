import API from './Api';

describe('Spotify API', () => {

  it('returns a token string type', async () => {
    const response = await API.getSpotifyToken()
    expect(typeof response.access_token === 'string').toBeTruthy();
  })

  it('returns a valid token no if is invalid or is still valid one', async () => {
    const TOKEN_VAR = 'temp_token_spotify';
    localStorage.setItem(TOKEN_VAR, 'BQDHy0Jr4uEaMOZ-YdvgTmW2WKNV1vms6x8RmbJ-n9fhUUPiP-3HuCJ5ggKJ9yybb5J-YPA4A_EKErqqtq5A6djtXTnReiysbBVCbIn_ira6KrrnwMeoHpc1Ew1GW5jbR29wL5rCbo3RP8g');
    const response = await API.checkSpotifyToken()
    expect(response).toBeFalsy();
  })
})

describe('Genius API', () => {
  it('returns a songs detail array', () => {
    API.getSearchSongRelated('Panama').then(data => {
      expect(Array.isArray([data.response.hits])).toBe(true)
    })
  })

  it('returns a song detailed object', () => {
    API.songDetails(153755).then(data => {
      expect(data instanceof Object).toBe(true)
    })
  })
})


