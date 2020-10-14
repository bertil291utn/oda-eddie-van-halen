const logicMethods = (() => {
  const filterLimitedTracks = (array, top) => array.filter((_, index) => index < top);
  const miliToFormat = millis => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const sanitizeName = (trackName = 'van halen') => trackName
    .replace(/-.*/, '')
    .trim();

  const searchVanHalenBand = array => array.filter(data => data.result.primary_artist.name === 'Van Halen');
  return {
    filterLimitedTracks,
    miliToFormat,
    sanitizeName,
    searchVanHalenBand,
  };
})();

export default logicMethods;
