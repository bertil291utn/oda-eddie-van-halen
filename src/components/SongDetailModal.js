import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import parse from 'html-react-parser';
import logicMethods from '../logic/logicMethods';
import BackgroundCover from '../assets/images/img-noise-1000x800.png';
import API from '../Api';
import './songdetail.css';

const SongDetailModal = props => {
  console.log(props);
  const track = props.location.state;
  // const { state } = location;
  // const { track } = state;
  const [trackgenius, setTrackDetail] = useState(null);
  const { id, album, name } = track;
  const iframeUrl = `https://open.spotify.com/embed/track/${id}`;

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
  const lectureFont = {
    fontFamily: 'Piazzolla, serif',
    fontSize: '1rem',
  };

  const descriptionStyle = {
    margin: '2rem 0',
  };

  const titleFont = {
    fontFamily: 'Squada One, cursive',
    fontSize: '2rem',
  };

  const iframeStyle = {
    width: '100%',
  };

  const footLecture = {
    fontFamily: 'Squada One, cursive',
    fontSize: '0.9rem',
  };

  const backgroundColor = {
    background: `url(${BackgroundCover})`,
    color: '#fff',
    marginTop: '2rem',
    padding: '2rem',
  };

  return (
    <Container fluid="md" style={backgroundColor}>
      <div>
        <div className="title" style={titleFont}>
          {album}
        </div>
      </div>
      <div style={lectureFont}>
        <div className="contenido">
          <div style={descriptionStyle}>
            {description}
          </div>
          <iframe title={id} src={iframeUrl} height="100" frameBorder="0" allowtransparency="true" allow="encrypted-media" style={iframeStyle} />
          <div style={footLecture}>
            {content}
          </div>
        </div>
      </div>
    </Container>
  );
};

SongDetailModal.propTypes = {
  id: PropTypes.string,
  album: PropTypes.string,
  name: PropTypes.string,
};

SongDetailModal.defaultProps = {
  id: '',
  album: '',
  name: '',

};

export default SongDetailModal;
