const initialState = {
    spotifyUserName: null,
    volume: 30,
    tracks: [],
    playIndex: null,
    track: null,
    album: null,
    provider: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_PROVIDER_SESSION':
            console.log("REDUX: SET_PROVIDER_SESSION=" + JSON.stringify(action.provider));
            return { ...state, provider: action.provider };
        case 'SET_TIDAL_OAUTH':
            console.log("REDUX: SET_TIDAL_OAUTH=" + JSON.stringify(action.oauth));
            return { ...state, tidalOauth: action.oauth };
        case 'SET_VOLUME':
            console.log("REDUX: setVolume=" + action.value)
            return { ...state, volume: action.value };
        case 'CLEAR_TRACKS':
            console.log("REDUX: CLEAR_TRACKS" );
            return { ...state, tracks: [], playIndex: null };
        case 'SET_TRACKS':
            console.log("REDUX: SET_TRACKS " + action.tracks.length );
            return { ...state, tracks: action.tracks };
        case 'PLAY_TRACK':
            console.log("REDUX: PLAY_TRACK at index = " + action.index );
            let newState = { ...state, playIndex: 1*action.index, track: action.track, album: action.album };
            console.log(`action.track=${JSON.stringify(action.track)}`);
            return newState;
        case 'PLAY_NEXT':
            console.log("REDUX: PLAY_NEXT" );
            if(state.tracks.length == 0) return state;
            nextIndex = 1*state.playIndex  + 1;
            if(nextIndex < state.tracks.length) {
                console.log('REDUX: track at position ' + JSON.stringify(state.tracks[nextIndex]));
                return { ...state, playIndex: nextIndex, track: state.tracks[nextIndex].track, album: state.tracks[nextIndex].album};
            } else {
                return state;
            }
        case 'PLAY_PREVIOUS':
            if(state.tracks.length == 0) return state;
            nextIndex = 1*state.playIndex  - 1;
            if(nextIndex >= 0) {
                console.log("REDUX: PLAY_PREVIOUS at index = " + nextIndex );
                console.log('REDUX: track at position ' + JSON.stringify(state.tracks[nextIndex]));
                return { ...state, playIndex: nextIndex, track: state.tracks[nextIndex].track, album: state.tracks[nextIndex].album};
            } else {
                return state;
            }
        default:
            return state;
    }
}