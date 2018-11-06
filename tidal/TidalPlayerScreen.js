import TrackPlayerScreen from '../player/screens/TrackPlayerScreen';
import { TidalApi } from './TidalApi'
import { connect } from "react-redux";
import SpotifyHelper from '../SpotifyHelper';
import { NativeModules } from 'react-native';
const ReactNativeVolumeController = NativeModules.ReactNativeVolumeController;
class _TidalPlayerScreen extends TrackPlayerScreen {
	constructor(props) {
		super(props)
	}

	static figureStreamUrl = async (track, sessionId) => {
		let streamUrl = (await TidalApi.streamUrl(track.id, sessionId)).url;
		return streamUrl;
	}

	static figureImageUrl = (state) => {
		return SpotifyHelper.tidalAlbumImageLarge(state.album.cover).uri;
	}

	static figureTrackName = (state) => {
		return state.track.name || state.track.title;
	}

	static figureTrackId = (state) => {
		return state.track.id;
	}

	static figureArtistName = (state) => {
		return state.track.artists[0].name;
	}

	static figureDuration = (state) => {
		return state.track.duration;
	}
}

const mapStateToProps = state => ({
	logo: {url:require('../Resources/3RD_PARTY_LOGOS/TIDAL.png'),  width: 40, height: 40 * (1041 / 2140)},
	volume: state.volume,
	track: state.track,
	album: state.album,
	albumImageUri: _TidalPlayerScreen.figureImageUrl(state),
	trackId: _TidalPlayerScreen.figureTrackId(state),
	trackName: _TidalPlayerScreen.figureTrackName(state),
	artistName: _TidalPlayerScreen.figureArtistName(state),
	sessionId: state.provider.sessionId,
	duration: _TidalPlayerScreen.figureDuration(state)
});

const mapDispatchToProps = (dispatch) => ({
	setVolume: (value) => {
		ReactNativeVolumeController.change(value / 100);
		ReactNativeVolumeController.update();
		dispatch({ type: 'SET_VOLUME', value: value });
	},
	playNext: () => {
		dispatch({ type: 'PLAY_NEXT' });
	},
	playPrevious: () => {
		dispatch({ type: 'PLAY_PREVIOUS' });
	},
	figureStreamUrl: async (track, sessionId) => {
		return await _TidalPlayerScreen.figureStreamUrl(track, sessionId);
	}
});

export default TidalPlayerScreen = connect(mapStateToProps, mapDispatchToProps)(_TidalPlayerScreen);
