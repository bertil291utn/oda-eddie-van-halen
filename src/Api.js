import SpotifyWebApi from 'spotify-web-api-js';

const API = (() => {
  const TOKEN_VAR = 'temp_token_spotify';

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

  const getArtist = async (token = localStorage.getItem(TOKEN_VAR)) => {
    const spotifyApi = new SpotifyWebApi();
    if (!token) {
      console.log('no existe');
      await setTokenLocalStorage();
      spotifyApi.setAccessToken(localStorage.getItem(TOKEN_VAR));
    } else { console.log('si existe'); spotifyApi.setAccessToken(token); }
    try {
      const data = await spotifyApi.searchTracks('Love');
      console.log('no esta caduco');
      console.log(data);
    } catch (error) {
      const response = JSON.parse(error.response);
      if (response.error.message === 'The access token expired' && response.error.status === 401) {
        console.log('caduco');
        await setTokenLocalStorage();
        getArtist();
      }
    }
  };



  const getSongDetail = async slug => {
    const { REACT_APP_GENIUS_KEY } = process.env;
    const resp = await fetch(`https://api.genius.com/search?q=${slug}&access_token=${REACT_APP_GENIUS_KEY}`);
    const data = await resp.json();
    console.log(data);
  };

  return { getArtist, getSongDetail };
})();

export default API;


