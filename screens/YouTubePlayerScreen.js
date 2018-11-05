import TrackPlayerScreen from '../player/screens/TrackPlayerScreen';

class _YouTubePlayerScreen extends TrackPlayerScreen {
	constructor(props) {
		super(props);
	} 

	static figureStreamUrl = async (track, sessionId) => {
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

export default YouTubePlayerScreen = TrackPlayerScreen.connect(_YouTubePlayerScreen);

