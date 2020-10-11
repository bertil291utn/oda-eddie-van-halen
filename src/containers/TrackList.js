import React, { useEffect, useState } from 'react';
import ACTIONS from '../actions';
import AlbumFilter from '../components/AlbumFilter';
import Track from '../components/Track';
import GetTracksHook from '../hooks';
import API from '../Api'


const TrackList = () => {
  const [state, dispatch] = GetTracksHook();
  if (!state) return null;
  const { tracks, filter } = state;
  console.log(state);

  const changeFilter = e => {
    const album = e.target.value
    dispatch({
      type: ACTIONS.FILTER_TRACKS,
      payload: album
    })
  }

  useEffect(() => {
    
  }, [])

  return (
    <>
      <h3>Eddie Van Halen's bio</h3>
      <AlbumFilter onChange={changeFilter} />
      {
        tracks.map(elem => (
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
