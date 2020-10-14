import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import GetTracksHook from '../hooks';
import AlbumFilter from '../components/AlbumFilter';
import cdCase2 from '../assets/images/cd-case-2.png';
import './tracklist.css';
import styles from './trackList.module.css';
import logicMethods from '../logic/logicMethods';

const TrackList = () => {
  const [album, setAlbum] = useState('All');
  const [state, dispatch] = GetTracksHook(album);
  const { miliToFormat, filterLimitedTracks } = logicMethods;
  const {
    cdBackground,
    coverStyle,
    cdCaseStyle,
    durationStyle,
    fontWeight,
    container,
  } = styles;
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

  return (
    <Container fluid="md" className={container}>
      <div className="albums">
        <div className="cover-filter">
          <div className="cover-container">
            <div className="cover-content">
              <img src={cdCase2} alt="cd case" id="cd-1" className={cdCaseStyle} />
              {renderTracks.length !== 0 && (<img src={renderTracks[0].cover} alt="cover cd" className={coverStyle} />)}
              <div className={cdBackground} />
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
                          <div className={fontWeight}>{trackNumber}</div>
                          <div className={fontWeight}>{elem.name}</div>
                          <div className={durationStyle}>{miliToFormat(elem.duration)}</div>
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
