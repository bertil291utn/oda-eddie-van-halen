import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import searchVanHalenBand from '../logic/searchVanHalenBand';
import sanitizeName from '../logic/sanitizeTrackName';
import API from '../Api';
import './songdetail.css';

const SongDetailModal = props => {
  console.log(props);
  console.log(props.location.state);
  const track  = props.location.state;
  const { id, album, name } = track;
  const [trackgenius, setTrackDetail] = useState(null);
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

  return (
    <div>
      <div>
        <div className="title" style={titleFont}>
          {album}
        </div>
      </div>
      <div className="contenedor" style={lectureFont}>
        <div className="contenido">
          {description}
          <iframe title={id} src={iframeUrl} height="100" frameBorder="0" allowtransparency="true" allow="encrypted-media" style={iframeStyle} />
          <div style={footLecture}>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

// SongDetailModal.propTypes = {
//   track: PropTypes.shape({
//     id: PropTypes.string,
//     album: PropTypes.string,
//     name: PropTypes.string,
//     year: PropTypes.number,
//     cover: PropTypes.string,
//   }).isRequired,
// };

export default SongDetailModal;
