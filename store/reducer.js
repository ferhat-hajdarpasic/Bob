const initialState = {
    spotifyUserName: null,
    volume: 30,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_VOLUME':
        console.log("REDUX: setVolume=" + action.value)
        return { ...state, volume: action.value };
      case 'PLAY_TRACK':
        return { ...state, loading: false };
      default:
        return state;
    }
  }