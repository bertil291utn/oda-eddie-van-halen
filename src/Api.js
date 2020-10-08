import SpotifyWebApi from 'spotify-web-api-js';

const API = (() => {


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

  const getArtist = async () => {
    const spotifyApi = new SpotifyWebApi();
    const token = await getSpotifyToken();
    spotifyApi.setAccessToken(token.access_token);
    try {
      const data = await spotifyApi.searchTracks('Love');
      console.log(data);
    } catch (error) {
      console.log(error);
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
