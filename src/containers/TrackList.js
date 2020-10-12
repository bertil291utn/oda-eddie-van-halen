import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import SongDetailModal from '../components/SongDetailModal';
import Track from '../components/Track';
import EddiesBio from '../components/EddiesBio';
import GetTracksHook from '../hooks';
import AlbumFilter from '../components/AlbumFilter';
import BackgroundImage from '../assets/images/background.jpg'
import './trackList.css'

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
    setModalShow(true);
    setTrack(track);
  };

  const stylesTrackList = {
    background: `url(${BackgroundImage})`,
    
  }


  return (
    <div style={stylesTrackList}>
      <Container fluid="md">

        <EddiesBio />

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

        <SongDetailModal
          onHide={() => setModalShow(false)}
          show={modalShow}
          track={track}
        />
      </Container>
    </div>
  );
};

export default TrackList;
