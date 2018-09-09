const initialState = {

}

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_VOLUME':
        return { ...state, loading: true };
      case 'PLAY_TRACK':
        return { ...state, loading: false };
      default:
        return state;
    }
  }