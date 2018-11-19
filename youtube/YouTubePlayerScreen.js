import TrackPlayerScreen from '../player/screens/TrackPlayerScreen';
import { connect } from "react-redux";
import { NativeModules } from 'react-native';
import SpotifyHelper from '../SpotifyHelper';
import ReactNode from '../ReactNode';

const ReactNativeVolumeController = NativeModules.ReactNativeVolumeController;
class _YouTubePlayerScreen extends TrackPlayerScreen {
	constructor(props) {
		super(props);
	} 

	static figureStreamUrl = async (track) => {
		let port = await ReactNode.getPortAsync();
		let streamUrl = `http://localhost:${port}/${track.snippet.resourceId.videoId}`;
        console.log(`streamUrl=${streamUrl}`);
		return streamUrl;
	}

	static figureImageUrl = (state) => {
		return SpotifyHelper.uriImageSource(state.track.snippet.thumbnails.high.url).uri;
	}
	
	static figureTrackName = (state) => {
		return state.track.snippet.title;
	}
	
	static figureTrackId = (state) => {
		return state.track.id;
	}
	
	static figureArtistName = (state) => {
		return state.track.snippet.channelTitle;
	}
	
	static figureDuration = (state) => {
		return state.track.duration;
	}
}

const mapStateToProps = state => ({
	logo: {url:require('../Resources/3RD_PARTY_LOGOS/YOUTUBE.png'),  width: 40, height: 40 * (1084 / 1583)},
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
