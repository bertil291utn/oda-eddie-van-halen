/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import SongDetailModal from '../components/SongDetailModal';
import EddiesBio from '../components/EddiesBio';
import GetTracksHook from '../hooks';
import AlbumFilter from '../components/AlbumFilter';
import BackgroundImage from '../assets/images/background.jpg';
import cdBackgroundImage from '../assets/images/cd2-backg.png';
import cdCase2 from '../assets/images/cd-case-2.png';
import './tracklist.css';
import styles from './trackList.module.css';
import miliToFormat from '../logic/mstoseg';

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

  const cdBackground = {
    background: `url(${cdBackgroundImage})`,
  };

  const coverStyle = {
    position: 'absolute',
    left: '0',
    height: '100%',
  };

  const cdCaseStyle = {
    height: '110%',
    left: '0',
    marginLeft: '-1.5vw',
    marginTop: '-1.6vw',
    position: 'absolute',
    top: '0',
    width: '66vw',
    maxWidth: '1100px',
  };

  const durationStyle = {
    color: 'var(--secondary-color)',
  }

  const fontWeight = {
    fontWeight: '500',
  }

  return (
    <div style={stylesTrackList}>
      <Container fluid="md" className={styles.container}>

        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="nav-bar">
          <Tab eventKey="home" title="Bio">
            <EddiesBio />
          </Tab>
          <Tab eventKey="profile" title="Albums">
            <div className="albums">
              <div className="cover-filter">
                <div className="cover-container">
                  <div className="cover-content" >
                    <img src={cdCase2} alt="cd case" id="cd-1" style={cdCaseStyle} />
                    {renderTracks.length !== 0 && (<img src={renderTracks[0].cover} alt="cover cd" style={coverStyle} />)}
                    <div className="background-cover" style={cdBackground} />
                    <div className="tracks-detail">
                      {
                        renderTracks.map((elem, index) => (
                          <div
                            key={elem.id}
                            onClick={() => sendDetailTrack(elem)}
                            onKeyPress={() => { }}
                            role="button"
                            tabIndex="0"
                          >
                            <div className="track">
                              <div style={fontWeight}>{index += 1}</div>
                              <div style={fontWeight}>{elem.name}</div>
                              <div style={durationStyle}>{miliToFormat(elem.duration)}</div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
                <AlbumFilter onChange={changeFilter} />
              </div>
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
