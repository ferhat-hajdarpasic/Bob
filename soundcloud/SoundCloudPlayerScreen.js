import { NativeModules } from 'react-native';
import { connect } from "react-redux";
import TrackPlayerScreen from '../player/screens/TrackPlayerScreen';
import SpotifyHelper from '../SpotifyHelper';

const ReactNativeVolumeController = NativeModules.ReactNativeVolumeController;

class _SoundCloudPlayerScreen extends TrackPlayerScreen {
	constructor(props) {
		super(props);
	} 

	static figureStreamUrl = async (track) => {
		let streamUrl = `${track.stream_url}?client_id=z8LRYFPM4UK5MMLaBe9vixfph5kqNA25&oauth_token=1-178930-450627837-740f6f923d451`;
        console.log(`streamUrl=${streamUrl}`);
		return streamUrl;
	}

	static figureImageUrl = (state) => {
		return state.track.artwork_url;
	}
	
	static figureTrackName = (state) => {
		return state.track.title;
	}
	
	static figureTrackId = (state) => {
		return state.track.id;
	}
	static figureArtistName = (state) => {
		return state.track.label_name;
	}
	
	static figureDuration = (state) => {
		return state.track.duration;
	}
}


const mapStateToProps = state => ({
	logo: {url:require('../Resources/3RD_PARTY_LOGOS/SOUNDCLOUD.png'),  width: 40, height: 40 * (1039 / 2394)},
	volume: state.volume,
	track: state.track,
	album: state.album,
	albumImageUri: _SoundCloudPlayerScreen.figureImageUrl(state),
	trackId: _SoundCloudPlayerScreen.figureTrackId(state),
	trackName: _SoundCloudPlayerScreen.figureTrackName(state),
	artistName: _SoundCloudPlayerScreen.figureArtistName(state),
	sessionId: state.provider.sessionId,
	duration: _SoundCloudPlayerScreen.figureDuration(state)
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
		return await _SoundCloudPlayerScreen.figureStreamUrl(track);
	}
});

export default SoundCloudPlayerScreen = connect(mapStateToProps, mapDispatchToProps)(_SoundCloudPlayerScreen);
