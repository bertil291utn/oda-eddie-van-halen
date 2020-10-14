import React from 'react';
import { Container } from 'react-bootstrap';
import EddiePortrait from '../assets/images/eddie-portrait.jpg';
import cdCase2 from '../assets/images/cd-case-2.png';
import styles from './EddieBio.module.css';

const EddiesBio = () => {
  const {
    info, img, bottomRight, bio, caseCd, titleFont, bioStyle, coverCdLink,
  } = styles;

  return (
    <Container fluid="md" className={bioStyle}>
      <div className={bio}>

        <div className="image">
          <img src={EddiePortrait} className={img} alt="eddie van halen" />
        </div>
        <div className={info}>
          <p>
            Was an American musician, songwriter, producer, and inventor.
          </p>
          <p>
            He was the main songwriter and lead guitarist of the American rock band
            Van Halen,
            which he co-founded in 1972 with his brother, drummer Alex Van Halen
            , bassist Mark Stone, and singer David Lee Roth.
          </p>
          <p>
            {' '}
            He was well known for
            popularizing the tapping guitar solo technique,
            allowing rapid arpeggios to be played with two hands on the fretboard.
          </p>
          <div className={bottomRight}>
            <h1 className={titleFont}>Eddie Van Halen</h1>
            <p>January 26, 1955 – October 6, 2020</p>
          </div>
        </div>
        <a href="https://en.wikipedia.org/wiki/Van_Halen" target="_blank" rel="noreferrer" className={coverCdLink}>
          <img src={cdCase2} className={caseCd} alt="cd case" />
        </a>
      </div>
    </Container>
  );
};

export default EddiesBio;
