import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import parse from 'html-react-parser';
import searchVanHalenBand from '../logic/searchVanHalenBand';
import sanitizeName from '../logic/sanitizeTrackName';
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
    API.getSearchSongRelated(sanitizeName(name)).then(data => {
      if (searchVanHalenBand(data.response.hits).length !== 0) {
        const songId = searchVanHalenBand(data.response.hits)[0].result.id;
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
    fontFamily: 'Playfair Display, serif',
    fontSize: '0.75rem',
  };

  const titleFont = {
    fontFamily: 'Squada One, cursive',
  };

  const iframeStyle = {
    width: '100%',
  };

  const footLecture = {
    fontFamily: 'Squada One, cursive',
    fontSize: '0.9rem',
  };

  const backgroundColor = {
    backgroundColor: '#fff',
    marginTop:'2rem',
    padding:'2rem',
  }

  return (
    <Container fluid="md" style={backgroundColor}>
      <div>
        <div className="title" style={titleFont}>
          {album}
        </div>
      </div>
      <div style={lectureFont}>
        <div className="contenido">
          {description}
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
  track: PropTypes.shape({
    id: PropTypes.string,
    album: PropTypes.string,
    name: PropTypes.string,
    year: PropTypes.number,
    cover: PropTypes.string,
  }).isRequired,
};

export default SongDetailModal;
