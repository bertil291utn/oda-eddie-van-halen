import { useEffect, useReducer } from 'react';
import ACTIONS from '../actions';
import API from '../Api';
import trackReducer from '../reducers/trackReducer';


const addToObject = (objectArray = []) => {
  const responseArray = []

  objectArray.forEach(elem => {
    const response = {
      id: elem.id,
      name: elem.name,
      album: elem.album.name,
      year: new Date(elem.album.release_date).getFullYear(),
      cover: elem.album.images[1].url
    }
    responseArray.push(response)
  })
  return responseArray;
}

const GetTracksHook = () => {
  const store = {
    tracks: [],
    filter: 'All',
  };
  const [state, dispatch] = useReducer(trackReducer, store);

  useEffect(() => {
    API.getArtist('artist:Van Halen').then(data => {
      console.log(data.tracks.items);
      dispatch({
        type: ACTIONS.INITIALIZE,
        payload: addToObject(data.tracks.items)
      })
    });
  }, [])

  return state;
};

export default GetTracksHook;
