import React from 'react';
import AlbumFilter from '../components/AlbumFilter';
import Track from '../components/Track';
import GetTracksHook from '../hooks';



const TrackList = () => {
  const state = GetTracksHook();
  if (!state) return null;
  console.log(state);
  return (
    <>
      <h3>Eddie Van halens bio</h3>
      <AlbumFilter />
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
