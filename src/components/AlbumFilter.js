import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import API from '../Api';

const AlbumFilter = ({ onChange }) => {
  const VanHalenId = '2cnMpRsOVqtPMfq7YiFE6K';
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    API.getAlbumsByArtist(VanHalenId).then(
      data => {
        setAlbums(data.items);
      },
      err => err,
    );
  }, []);

  return (
    <label htmlFor="albums">
      <select
        name="albums"
        id="albums"
        onChange={onChange}
      >
        <option value="All">Top Tracks</option>
        {albums.map(album => (
          <option key={album.id} value={album.id}>
            {album.name}
          </option>
        ))}
      </select>
    </label>
  );
};

AlbumFilter.propTypes = {
  onChange: PropTypes.func.isRequired,

};
export default AlbumFilter;
