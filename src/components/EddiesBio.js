import React from 'react';
import BackgroundCover from '../assets/images/img-noise-1000x800.png'
import EddiePortrait from '../assets/images/eddie-portrait.jpg'
import styles from './EddieBio.module.css'

const EddiesBio = () => {
  const backGround = {
    background: `url(${BackgroundCover})`,

  }
  const { info, img, bottomRight, bio, verticalLine } = styles;

  return (
    <div style={backGround} className={bio}>
      <div className={verticalLine} />
      <div className="image">
        <img src={EddiePortrait} className={img} alt="eddie van halen" />
      </div>
      <div className={info}>
        <p>
          Was an American musician, songwriter, producer, and inventor.</p><p>
          He was the main songwriter and lead guitarist of the American rock band
      <a href="https://en.wikipedia.org/wiki/Van_Halen" target="_blank" rel="noreferrer"> Van Halen</a>,
      which he co-founded in 1972 with his brother, drummer Alex Van Halen
      , bassist Mark Stone, and singer David Lee Roth.</p><p> He was well known for
        popularizing the tapping guitar solo technique,
        allowing rapid arpeggios to be played with two hands on the fretboard.
      </p>
        <div className={bottomRight}><h3>Eddie Van Halen</h3>
          <p>January 26, 1955 – October 6, 2020</p></div>
      </div>

    </ div>

  )
};

export default EddiesBio;
