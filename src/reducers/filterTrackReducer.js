import ACTIONS from '../actions';

export default (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.FILTER_TRACKS:
      return payload;
    case ACTIONS.INITIALIZE:
      return { ...state, tracks: payload };

    default:
      return state;
  }
};
