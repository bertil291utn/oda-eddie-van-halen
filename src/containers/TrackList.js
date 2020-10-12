import React, { useState } from 'react';
import { Col, Container, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import SongDetailModal from '../components/SongDetailModal';
import Track from '../components/Track';
import EddiesBio from '../components/EddiesBio';
import GetTracksHook from '../hooks';
import AlbumFilter from '../components/AlbumFilter';
import BackgroundImage from '../assets/images/background.jpg';
import cdCase from '../assets/images/cd-case-1.png';
import './tracklist.css';
import styles from './trackList.module.css';

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
    height: '100vh',

  };


  return (
    <div style={stylesTrackList}>
      <Container fluid="md" className={styles.container}>

        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="nav-bar">
          <Tab eventKey="home" title="Bio">
            <EddiesBio />
          </Tab>
          <Tab eventKey="profile" title="Albums">
            <div className="albums">
              <AlbumFilter onChange={changeFilter} />
              <div className="cover-container">
                <div className="cover-content">
                  <img src={cdCase} alt="cd case" />
                </div>
              </div>
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
            </div>
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default TrackList;
