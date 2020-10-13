import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import searchVanHalenBand from '../logic/searchVanHalenBand';
import sanitizeName from '../logic/sanitizeTrackName';
import API from '../Api';
import './songdetail.css';

const SongDetailModal = props => {
  const { show, onHide, track } = props;
  const [trackgenius, setTrackDetail] = useState(null);
  const iframeUrl = `https://open.spotify.com/embed/track/${track.id}`;

  useEffect(() => {
    API.getSearchSongRelated(sanitizeName(track.name)).then(data => {
      if (searchVanHalenBand(data.response.hits).length !== 0) {
        const songId = searchVanHalenBand(data.response.hits)[0].result.id;
        API.songDetails(songId).then(data => {
          setTrackDetail(data.response.song);
        });
      }
    });
  }, [track.id]);
  let content = '';
  let description = '';
  if (trackgenius) {
    content = parse(trackgenius.embed_content);
    if (trackgenius.description.html !== '<p>?</p>') { description = parse(trackgenius.description.html); }
  }
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {track.album}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="contenido">
          {content}
          {description}
        </div>
        <img src={track.cover} loading="lazy" alt={track.name} />
        <p>{track.name}</p>
        <p>{track.year}</p>
        <iframe title={track.id} src={iframeUrl} width="500" height="100" frameBorder="0" allowtransparency="true" allow="encrypted-media" />
      </Modal.Body>
    </Modal>
  );
};

SongDetailModal.propTypes = {
  show: PropTypes.bool.isRequired,
  track: PropTypes.shape({
    id: PropTypes.string,
    album: PropTypes.string,
    name: PropTypes.string,
    year: PropTypes.number,
    cover: PropTypes.string,
  }).isRequired,
  onHide: PropTypes.func.isRequired,
};

export default SongDetailModal;
