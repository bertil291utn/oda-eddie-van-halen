import API from '../Api';

const { useEffect, useState } = require('react');

const GetTracksHook = artistName => {
  const [track, setTrack] = useState([])
  // useEffect(() => {
  API.getArtist(artistName).then(data => {
    setTrack(data.tracks);
  });
  // }, []);


  return track;
};

export default GetTracksHook;
