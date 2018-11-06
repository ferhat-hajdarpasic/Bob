import TrackPlayerScreen from '../player/screens/TrackPlayerScreen';
import { connect } from "react-redux";
import { NativeModules } from 'react-native';

const ReactNativeVolumeController = NativeModules.ReactNativeVolumeController;
class _YouTubePlayerScreen extends TrackPlayerScreen {
	constructor(props) {
		super(props);
	} 

	static figureStreamUrl = async (track) => {
		let streamUrl = `${track.stream_url}?client_id=z8LRYFPM4UK5MMLaBe9vixfph5kqNA25&oauth_token=1-178930-450627837-740f6f923d451`;
        console.log(`streamUrl=${streamUrl}`);
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
	volume: state.volume,
	track: state.track,
	album: state.album,
	albumImageUri: _YouTubePlayerScreen.figureImageUrl(state),
	trackId: _YouTubePlayerScreen.figureTrackId(state),
	trackName: _YouTubePlayerScreen.figureTrackName(state),
	artistName: _YouTubePlayerScreen.figureArtistName(state),
	sessionId: state.provider.sessionId,
	duration: _YouTubePlayerScreen.figureDuration(state)
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
	figureStreamUrl: async (track) => {
		return await _YouTubePlayerScreen.figureStreamUrl(track);
	}
});

export default YouTubePlayerScreen = connect(mapStateToProps, mapDispatchToProps)(_YouTubePlayerScreen);
