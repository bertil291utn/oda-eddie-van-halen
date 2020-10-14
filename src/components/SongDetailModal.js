import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import parse from 'html-react-parser';
import logicMethods from '../logic/logicMethods';
import API from '../Api';
import './songdetail.css';
import styles from './songDetail.module.css';

const SongDetailModal = props => {
  const { location } = props;
  const { state } = location;
  const track = state;
  const [trackgenius, setTrackDetail] = useState(null);
  const { id, album, name } = track;
  const iframeUrl = `https://open.spotify.com/embed/track/${id}`;
  const {
    lectureFont,
    descriptionStyle,
    titleFont,
    iframeStyle,
    footLecture, backgroundColor,
  } = styles;

  useEffect(() => {
    API.getSearchSongRelated(logicMethods.sanitizeName(name)).then(data => {
      if (logicMethods.searchVanHalenBand(data.response.hits).length !== 0) {
        const songId = logicMethods.searchVanHalenBand(data.response.hits)[0].result.id;
        API.songDetails(songId).then(data => {
          setTrackDetail(data.response.song);
        });
      }
    });
  }, [id]);
  let content = '';
  let description = '';
  if (trackgenius) {
    content = parse(trackgenius.embed_content);
    if (trackgenius.description.html !== '<p>?</p>') { description = parse(trackgenius.description.html); }
  }

  return (
    <Container fluid="md" className={backgroundColor}>
      <div>
        <div className={titleFont}>
          {album}
        </div>
      </div>
      <div className={lectureFont}>
        <div className="contenido">
          <div className={descriptionStyle}>
            {description}
          </div>
          <iframe title={id} src={iframeUrl} height="100" frameBorder="0" allowtransparency="true" allow="encrypted-media" className={iframeStyle} />
          <div className={footLecture}>
            {content}
          </div>
        </div>
      </div>
    </Container>
  );
};

SongDetailModal.propTypes = {
  location: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default SongDetailModal;
