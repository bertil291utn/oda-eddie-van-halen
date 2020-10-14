import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import GetTracksHook from '../hooks';
import AlbumFilter from '../components/AlbumFilter';
import cdBackgroundImage from '../assets/images/cd2-backg.png';
import cdCase2 from '../assets/images/cd-case-2.png';
import './tracklist.css';
import styles from './trackList.module.css';
import logicMethods from '../logic/logicMethods';

const TrackList = () => {
  const [album, setAlbum] = useState('All');
  const [state, dispatch] = GetTracksHook(album);
  const { miliToFormat, filterLimitedTracks } = logicMethods;
  let trackNumber = 0;

  if (!state) return null;
  const { tracks, filterTracks } = state;

  const changeFilter = e => {
    setAlbum(e.target.value);
    dispatch({
      payload: e.target.value,
    });
  };

  let renderTracks = filterLimitedTracks(tracks, 10);
  if (album !== 'All') {
    renderTracks = filterLimitedTracks(filterTracks, 10);
  }

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
  };

  const fontWeight = {
    fontWeight: '500',
  };

  return (
    <Container fluid="md" className={styles.container}>
      <div className="albums">
        <div className="cover-filter">
          <div className="cover-container">
            <div className="cover-content">
              <img src={cdCase2} alt="cd case" id="cd-1" style={cdCaseStyle} />
              {renderTracks.length !== 0 && (<img src={renderTracks[0].cover} alt="cover cd" style={coverStyle} />)}
              <div className="background-cover" style={cdBackground} />
              <div className="tracks-detail">
                {
                  renderTracks.map(elem => {
                    trackNumber += 1;
                    return (
                      <Link
                        key={elem.id}
                        to={{
                          pathname: `/track/${elem.id}`,
                          state: { ...elem },
                        }}
                      >
                        <div className="track">
                          <div style={fontWeight}>{trackNumber}</div>
                          <div style={fontWeight}>{elem.name}</div>
                          <div style={durationStyle}>{miliToFormat(elem.duration)}</div>
                        </div>
                      </Link>
                    );
                  })
                }
              </div>
            </div>
          </div>
          <AlbumFilter onChange={changeFilter} />
        </div>
      </div>
    </Container>
  );
};

export default TrackList;
