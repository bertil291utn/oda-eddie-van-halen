import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SongDetailModal = props => {
  const { show, onHide, track } = props;
  const iframeUrl = `https://open.spotify.com/embed/track/${track.id}`;
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
