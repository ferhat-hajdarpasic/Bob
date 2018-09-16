const initialState = {
    spotifyUserName: null,
    volume: 30,
    tracks: [],
    playIndex: null,
    track: null,
    album: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_VOLUME':
            console.log("REDUX: setVolume=" + action.value)
            return { ...state, volume: action.value };
        case 'SET_TRACKS':
            console.log("REDUX: SET_TRACKS" );
            return { ...state, tracks: action.tracks };
        case 'PLAY_TRACK':
            console.log("REDUX: PLAY_TRACK at index = " + action.index );
            return { ...state, playIndex: 1*action.index, track: action.track, album: action.album };
        case 'PLAY_NEXT':
            nextIndex = 1*state.playIndex  + 1;
            if(nextIndex < state.tracks.length) {
                console.log('REDUX: track at position ' + JSON.stringify(state.tracks[nextIndex]));
                return { ...state, playIndex: nextIndex, track: state.tracks[nextIndex].track, album: state.tracks[nextIndex].album};
            } else {
                return state;
            }
        case 'PLAY_PREVIOUS':
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