import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SongDetailModal = props => {
  const { show, onHide, track } = props;
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
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          {JSON.stringify(track)}
        </p>
      </Modal.Body>
    </Modal>
  );
};

SongDetailModal.propTypes = {
  show: PropTypes.bool.isRequired,
  track: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    year: PropTypes.number,
    cover: PropTypes.string,
  }).isRequired,
  onHide: PropTypes.func.isRequired,
};

export default SongDetailModal;
