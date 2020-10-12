const sanitizeName = (trackName = 'van halen') => trackName
  .replace(/-.*/, '')
  .trim()

export default sanitizeName;
