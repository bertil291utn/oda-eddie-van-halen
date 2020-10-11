import React, { useState } from 'react';
import SongDetailModal from '../components/SongDetailModal';
import Track from '../components/Track';
import GetTracksHook from '../hooks';
import AlbumFilter from '../components/AlbumFilter';

const TrackList = () => {
  const [album, setAlbum] = useState('All');
  const [track, setTrack] = useState({});
  const [modalShow, setModalShow] = useState(false);
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

  let renderTracks = tracks;
  if (album !== 'All') {
    renderTracks = filterTracks;
  }

  const sendDetailTrack = track => {
    setModalShow(true)
    setTrack(track)
  }

  return (
    <>
      <h3>Eddie Van Halen&#39;s bio</h3>

      <SongDetailModal
        onHide={() => setModalShow(false)}
        show={modalShow}
        track={track}
      />
      <AlbumFilter onChange={changeFilter} />
      {
        renderTracks.map(elem => (
          <div
            key={elem.id}
            onClick={() => sendDetailTrack(elem)}
            onKeyPress={() => { }}
            role="button"
            tabIndex="0"
          >
            <Track
              id={elem.id}
              cover={elem.cover}
              name={elem.name}
              year={elem.year}

            />
          </div>
        ))
      }
    </>
  );
};

export default TrackList;
