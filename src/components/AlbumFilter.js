import React, { useEffect, useState } from 'react';
import API from '../Api';

const AlbumFilter = () => {
  const VanHalenId = '2cnMpRsOVqtPMfq7YiFE6K'
  const [albums, setAlbums] = useState([])
  useEffect(() => {
    API.getAlbumsByArtist(VanHalenId).then(
      data => {
        setAlbums(data.items)
      },
      err => {
        console.error(err);
      }
    );
  }, [])

  // const albums2 = ['album1', 'album2'];
  return (
    <label htmlFor="albums">
      Albums
      <select
        name="albums"
        id="albums"
      >
        {albums.map(album => (
          <option key={album.id} value={album.name}>
            {album.name}
          </option>
        ))}
      </select>
    </label>
  );
}

export default AlbumFilter;