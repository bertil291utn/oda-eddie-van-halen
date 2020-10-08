import SpotifyWebApi from 'spotify-web-api-js';

const API = (() => {
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(process.env.REACT_APP_SPOTIFY_KEY);

  const getArtist = async () => {
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
