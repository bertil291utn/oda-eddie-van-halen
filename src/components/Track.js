import React from 'react';
import PropTypes from 'prop-types';

const track = ({
  id, cover, name, year,
}) => (
  <>
    <p>{id}</p>
    <img src={cover} loading="lazy" alt={name} />
    <p>{name}</p>
    <p>{year}</p>

  </>
);

track.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  cover: PropTypes.string.isRequired,
};

export default track;
