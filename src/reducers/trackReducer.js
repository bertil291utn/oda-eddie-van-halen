import ACTIONS from '../actions';

export default (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.FILTER_TRACKS:
      return { ...state, filterTracks: payload };
    case ACTIONS.INITIALIZE:
      return { ...state, tracks: payload };

    default:
      return state;
  }
};
