const initState = () => {
  const store = {
    tracks: [
      {
        id: 1,
        name: 'And the cradle-will rock',
        album: 'Woman&children first',
        year: '1980',
      },
      {
        id: 2,
        name: 'And the cradle-will rock2',
        album: 'Woman&children first2',
        year: '1980',
      },
      {
        id: 3,
        name: 'And the cradle-will rock3',
        album: 'Woman&children first3',
        year: '1980',
      },
    ],
    filter: 'All',
  }
  return store;
};

export default initState;
