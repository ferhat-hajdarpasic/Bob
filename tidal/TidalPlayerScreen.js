import TrackPlayerScreen from '../player/screens/TrackPlayerScreen';
import { TidalApi } from './TidalApi'

class _TidalPlayerScreen extends TrackPlayerScreen {
	constructor(props) {
		super(props);
	} 

	static figureStreamUrl = async (track, sessionId) => {
		let streamUrl = (await TidalApi.streamUrl(track.trackId, sessionId)).url;
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

export default TidalPlayerScreen = TrackPlayerScreen.connect(_TidalPlayerScreen);

