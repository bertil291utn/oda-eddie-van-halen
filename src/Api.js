import SpotifyWebApi from 'spotify-web-api-js';

const TOKEN_VAR = 'temp_token_spotify';
const GENIUS_BASE_URL = 'https://api.genius.com/';

const API = (() => {
  const spotifyApi = new SpotifyWebApi();
  // private Spotify token methods
  const getSpotifyToken = async () => {
    const myHeaders = new Headers();
    const basic = `Basic ${btoa(`${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`)}`;
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    myHeaders.append('Authorization', basic);

    const urlencoded = new URLSearchParams();
    urlencoded.append('grant_type', 'client_credentials');

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    };

    const baseURL = 'https://accounts.spotify.com/api/token';
    const response = await fetch(baseURL, requestOptions);

    return response.json();
  };

  const setTokenLocalStorage = async () => {
    const token = await getSpotifyToken();
    localStorage.setItem(TOKEN_VAR, token.access_token);
  };

  const checkSpotifyToken = async (token = localStorage.getItem(TOKEN_VAR)) => {
    let response = false;
    if (!token) await setTokenLocalStorage();
    spotifyApi.setAccessToken(localStorage.getItem(TOKEN_VAR));

    try {
      await spotifyApi.searchTracks('test');
      response = true;
    } catch (error) {
      const response = JSON.parse(error.response);
      if (response.error.message === 'The access token expired' && response.error.status === 401) {
        await setTokenLocalStorage();
        checkSpotifyToken();
      }
    }
    return response;
  };

  // SPOTIFY METHODS

  const getArtist = async artistName => {
    let data;
    if (await checkSpotifyToken()) {
      try {
        data = await spotifyApi.searchTracks(artistName, { limit: 6 });
      } catch (error) {
        return error;
      }
    }
    return data;
  };

  const getAlbumsByArtist = async artistId => {
    let data;

    if (await checkSpotifyToken()) {
      try {
        data = await spotifyApi.getArtistAlbums(artistId);
      } catch (error) {
        return error;
      }
    }
    return data;
  };

  const getTracksByAlbum = async albumId => {
    let data;

    if (await checkSpotifyToken()) {
      try {
        const tracksId = await spotifyApi.getAlbum(albumId);
        const tracksIdArray = tracksId.tracks.items.map(t => t.id);
        data = await spotifyApi.getTracks(tracksIdArray);
      } catch (error) {
        return error;
      }
    }
    return data;
  };

  // GENIUS API METHODS
  const getSearchSongRelated = async slug => {
    const { REACT_APP_GENIUS_KEY } = process.env;
    const resp = await fetch(`${GENIUS_BASE_URL}search?q=${slug}&access_token=${REACT_APP_GENIUS_KEY}`);
    return resp.json();
  };

  const songDetails = async songId => {
    const { REACT_APP_GENIUS_KEY } = process.env;
    const resp = await fetch(`${GENIUS_BASE_URL}songs/${songId}?text_format=html&access_token=${REACT_APP_GENIUS_KEY}`);
    return resp.json();
  };

  return {
    getArtist,
    getSearchSongRelated,
    getAlbumsByArtist,
    getTracksByAlbum,
    checkSpotifyToken,
    getSpotifyToken,
    songDetails,
  };
})();

export default API;
