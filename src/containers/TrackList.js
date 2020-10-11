import React, { useState } from 'react';
import AlbumFilter from '../components/AlbumFilter';
import Track from '../components/Track';
import GetTracksHook from '../hooks';

const TrackList = () => {
  const [album, setAlbum] = useState('All');
  const [state, dispatch] = GetTracksHook(album);
  if (!state) return null;
  const { tracks, filterTracks } = state;
  console.log(state);

  const changeFilter = e => {
    setAlbum(e.target.value);
    dispatch({
      payload: e.target.value,
    });
  };

  let tracksRender = tracks;
  if (album !== 'All') {
    tracksRender = filterTracks;
  }

  return (
    <>
      <h3>Eddie Van Halen&#39;s bio</h3>
      <AlbumFilter onChange={changeFilter} />
      {
        tracksRender.map(elem => (
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
