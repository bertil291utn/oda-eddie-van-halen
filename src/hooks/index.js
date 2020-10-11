import { useEffect, useReducer } from 'react';
import ACTIONS from '../actions';
import API from '../Api';
import trackReducer from '../reducers/trackReducer';

const DEFAULT_ALBUM_ID = '1y4BZLtyURo81rC6yGLRAu';

const addToObject = (objectArray = []) => {
  const responseArray = [];

  objectArray.forEach(elem => {
    const response = {
      id: elem.id,
      name: elem.name,
      album: elem.album.name,
      year: new Date(elem.album.release_date).getFullYear(),
      cover: elem.album.images[1].url,
    };
    responseArray.push(response);
  });
  return responseArray;
};

const GetTracksHook = album => {
  const store = {
    filterTracks: [],
    tracks: [],
  };
  const [state, dispatch] = useReducer(trackReducer, store);

  useEffect(() => {
    API.getArtist('artist:Van Halen').then(data => {
      dispatch({
        type: ACTIONS.INITIALIZE,
        payload: addToObject(data.tracks.items),
      });
    });
  }, []);

  useEffect(() => {
    let newAbumName = album;
    if (album === 'All') { newAbumName = DEFAULT_ALBUM_ID; }
    API.getTracksByAlbum(newAbumName).then(data => {
      dispatch({
        type: ACTIONS.FILTER_TRACKS,
        payload: addToObject(data.tracks),
      });
    });
  }, [album]);

  return [state, dispatch];
};

export default GetTracksHook;
