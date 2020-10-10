import React, { useEffect, useReducer } from 'react';
import Track from '../components/Track';
import filterTrackReducer from '../reducers/filterTrackReducer';
import ACTIONS from '../actions';
import API from '../Api';

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


const TrackList = () => {

  const store = {
    tracks: [],
    filter: 'All',
  };
  const [state, dispatch] = useReducer(filterTrackReducer, store);

  useEffect(() => {
    API.getArtist('Van Halen').then(data => {
      dispatch({
        type: ACTIONS.INITIALIZE,
        payload: addToObject(data.tracks.items)
      })
    });
  }, [])

  if (!state) return null;
  console.log(state);
  return (
    <>
      {
        state.tracks.map(elem => (
          <Track
            key={elem.id}
            id={elem.id}
            cover={elem.cover}
            name={elem.name}
            year={elem.year}
          />
        ))
      }
    </>
  );
};

export default TrackList;
