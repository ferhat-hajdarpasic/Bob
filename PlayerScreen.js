
import React, { Component } from 'react';
import {
	Alert,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
	Image,
	Slider
} from 'react-native';

import timer from 'react-native-timer';

import PlayerBackground from './screens/PlayerBackground'

import { NavigationActions } from 'react-navigation';
import Spotify from 'rn-spotify-sdk';
import SpotifyApi from './SpotifyApi';
let api = new SpotifyApi();

export default class PlayerScreen extends Component {
	static navigationOptions = {
		title: 'Player',
	};

	constructor(props) {
		super(props);

		//		let track = JSON.parse('{"album":{"album_type":"album","artists":[{"external_urls":{"spotify":"https://open.spotify.com/artist/00FQb4jTyendYWaN8pK0wa"},"href":"https://api.spotify.com/v1/artists/00FQb4jTyendYWaN8pK0wa","id":"00FQb4jTyendYWaN8pK0wa","name":"Lana Del Rey","type":"artist","uri":"spotify:artist:00FQb4jTyendYWaN8pK0wa"}],"available_markets":["AD","AR","AT","AU","BE","BG","BO","BR","CA","CH","CL","CO","CR","CY","CZ","DE","DK","DO","EC","EE","ES","FI","FR","GB","GR","GT","HK","HN","HU","ID","IE","IL","IS","IT","JP","LI","LT","LU","LV","MC","MT","MX","MY","NI","NL","NO","NZ","PA","PE","PH","PL","PT","PY","RO","SE","SG","SK","SV","TH","TR","TW","US","UY","VN","ZA"],"external_urls":{"spotify":"https://open.spotify.com/album/5VoeRuTrGhTbKelUfwymwu"},"href":"https://api.spotify.com/v1/albums/5VoeRuTrGhTbKelUfwymwu","id":"5VoeRuTrGhTbKelUfwymwu","images":[{"height":640,"url":"https://i.scdn.co/image/d0b1088e6172acbe186bd7cdb47b099d252261ff","width":640},{"height":300,"url":"https://i.scdn.co/image/b04e4dc5b10c8a25687e81439499cc0df7b5aed1","width":300},{"height":64,"url":"https://i.scdn.co/image/5f778444676eb87f367d21ec5f1711314d3b155f","width":64}],"name":"Born To Die - The Paradise Edition","release_date":"2012-01-01","release_date_precision":"day","type":"album","uri":"spotify:album:5VoeRuTrGhTbKelUfwymwu"},"artists":[{"external_urls":{"spotify":"https://open.spotify.com/artist/00FQb4jTyendYWaN8pK0wa"},"href":"https://api.spotify.com/v1/artists/00FQb4jTyendYWaN8pK0wa","id":"00FQb4jTyendYWaN8pK0wa","name":"Lana Del Rey","type":"artist","uri":"spotify:artist:00FQb4jTyendYWaN8pK0wa"}],"available_markets":["AD","AR","AT","AU","BE","BG","BO","BR","CA","CH","CL","CO","CR","CY","CZ","DE","DK","DO","EC","EE","ES","FI","FR","GB","GR","GT","HK","HN","HU","ID","IE","IL","IS","IT","JP","LI","LT","LU","LV","MC","MT","MX","MY","NI","NL","NO","NZ","PA","PE","PH","PL","PT","PY","RO","SE","SG","SK","SV","TH","TR","TW","US","UY","VN","ZA"],"disc_number":1,"duration_ms":281960,"explicit":false,"external_ids":{"isrc":"GBUM71111621"},"external_urls":{"spotify":"https://open.spotify.com/track/0fBSs3fRoh1yJcne77fdu9"},"href":"https://api.spotify.com/v1/tracks/0fBSs3fRoh1yJcne77fdu9","id":"0fBSs3fRoh1yJcne77fdu9","is_local":false,"name":"Video Games","popularity":70,"preview_url":"https://p.scdn.co/mp3-preview/efda1e4784e32ece2c4a6ceb77c76585408fa98b?cid=774b29d4f13844c495f206cafdad9c86","track_number":4,"type":"track","uri":"spotify:track:0fBSs3fRoh1yJcne77fdu9"}');
		const { params } = this.props.navigation.state;
		let track = params.track;
		let album = params.album;


		this.state = {
			spotifyUserName: null,
			duration: track.duration_ms / 1000,
			position: 0,
			track: track,
			album: album,
			pausedImage: require('./Resources/ICONS/PAUSE.png')
		};

		this.spotifyLogoutButtonWasPressed = this.spotifyLogoutButtonWasPressed.bind(this);
		//console.log('state=' + JSON.stringify(this.state));
	}

	componentWillUnmount() {
		this.mounted = false;
		console.log('Player will unmount. Clear timeout.');
		timer.clearTimeout(this);
	}

	async componentDidMount() {
		this.mounted = true;
		let loggedIn = await api.login();
		if (!loggedIn) {
			console.log("Strange Spotify not logged in. Not trying to play");
		} else {
			console.log("Playing: " + this.state.track.uri);
			await Spotify.playURI(this.state.track.uri, 0, 0);
			timer.setInterval(
				this, 'updateProgress', () => {
					if(this.mounted) {
						let playbackState = Spotify.getPlaybackState();
						this.setState({position: playbackState.position});
					}
				}, 1000
			);
		}


		// const { params } = this.props.navigation.state;
		// let track = params.track;

		// console.log('send api request to get user info');
		// Spotify.getMe().then((result) => {
		// 	console.log("GETTING freaking *****result=" + JSON.stringify(result));
		// 	try {
		// 		let auth = Spotify.getAuth();
		// 		let access_code = JSON.stringify(auth)
		// 		console.log("FREDDY : access_token=" + access_code);
		// 	} catch (e) {
		// 		console.log("Error", e.message);
		// 	}
		// 	this.setState({ spotifyUserName: result.display_name });
		// 	return Spotify.playURI(track.uri, 0, 0);
		// }).then(() => {
		// 	console.log('Started playing track: ' + JSON.stringify(track));
		// }).catch((error) => {
		// 	console.log('Failed to play track: ' + JSON.stringify(track));
		// 	console.log("Error", error.message);
		// });
	}

	async positionSlidingComplete(value) {
		console.log('Value=' + value);
		await Spotify.seek(value);
	}

	async volumeSlidingComplete(value) {
		console.log('Value=' + value);
	}

	goToInitialScreen() {
		const navAction = NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({ routeName: 'initial' })
			]
		});
		this.props.navigation.dispatch(navAction);
	}

	spotifyLogoutButtonWasPressed() {
		Spotify.logout().finally(() => {
			this.goToInitialScreen();
		});
	}

	pause() {
		let playbackState = Spotify.getPlaybackState();
		console.log('playbackState=' + JSON.stringify(playbackState));
		let playing = playbackState.position > 0 && playbackState.playing
		if (playing) {
			Spotify.setPlaying(false);
			this.setState({
				pausedImage: require('./Resources/ICONS/PLAY.png')
			});
		} else {
			Spotify.setPlaying(true);
			this.setState({
				pausedImage: require('./Resources/ICONS/PAUSE.png')
			});
		}
	}

	render() {
		let track_json = '{"album":{"album_type":"album","artists":[{"external_urls":{"spotify":"https://open.spotify.com/artist/00FQb4jTyendYWaN8pK0wa"},"href":"https://api.spotify.com/v1/artists/00FQb4jTyendYWaN8pK0wa","id":"00FQb4jTyendYWaN8pK0wa","name":"Lana Del Rey","type":"artist","uri":"spotify:artist:00FQb4jTyendYWaN8pK0wa"}],"available_markets":["AD","AR","AT","AU","BE","BG","BO","BR","CA","CH","CL","CO","CR","CY","CZ","DE","DK","DO","EC","EE","ES","FI","FR","GB","GR","GT","HK","HN","HU","ID","IE","IL","IS","IT","JP","LI","LT","LU","LV","MC","MT","MX","MY","NI","NL","NO","NZ","PA","PE","PH","PL","PT","PY","RO","SE","SG","SK","SV","TH","TR","TW","US","UY","VN","ZA"],"external_urls":{"spotify":"https://open.spotify.com/album/5VoeRuTrGhTbKelUfwymwu"},"href":"https://api.spotify.com/v1/albums/5VoeRuTrGhTbKelUfwymwu","id":"5VoeRuTrGhTbKelUfwymwu","images":[{"height":640,"url":"https://i.scdn.co/image/d0b1088e6172acbe186bd7cdb47b099d252261ff","width":640},{"height":300,"url":"https://i.scdn.co/image/b04e4dc5b10c8a25687e81439499cc0df7b5aed1","width":300},{"height":64,"url":"https://i.scdn.co/image/5f778444676eb87f367d21ec5f1711314d3b155f","width":64}],"name":"Born To Die - The Paradise Edition","release_date":"2012-01-01","release_date_precision":"day","type":"album","uri":"spotify:album:5VoeRuTrGhTbKelUfwymwu"},"artists":[{"external_urls":{"spotify":"https://open.spotify.com/artist/00FQb4jTyendYWaN8pK0wa"},"href":"https://api.spotify.com/v1/artists/00FQb4jTyendYWaN8pK0wa","id":"00FQb4jTyendYWaN8pK0wa","name":"Lana Del Rey","type":"artist","uri":"spotify:artist:00FQb4jTyendYWaN8pK0wa"}],"available_markets":["AD","AR","AT","AU","BE","BG","BO","BR","CA","CH","CL","CO","CR","CY","CZ","DE","DK","DO","EC","EE","ES","FI","FR","GB","GR","GT","HK","HN","HU","ID","IE","IL","IS","IT","JP","LI","LT","LU","LV","MC","MT","MX","MY","NI","NL","NO","NZ","PA","PE","PH","PL","PT","PY","RO","SE","SG","SK","SV","TH","TR","TW","US","UY","VN","ZA"],"disc_number":1,"duration_ms":281960,"explicit":false,"external_ids":{"isrc":"GBUM71111621"},"external_urls":{"spotify":"https://open.spotify.com/track/0fBSs3fRoh1yJcne77fdu9"},"href":"https://api.spotify.com/v1/tracks/0fBSs3fRoh1yJcne77fdu9","id":"0fBSs3fRoh1yJcne77fdu9","is_local":false,"name":"Video Games","popularity":70,"preview_url":"https://p.scdn.co/mp3-preview/efda1e4784e32ece2c4a6ceb77c76585408fa98b?cid=774b29d4f13844c495f206cafdad9c86","track_number":4,"type":"track","uri":"spotify:track:0fBSs3fRoh1yJcne77fdu9"}';
		let track = this.state.track;
		let album = this.state.album;
		let albumImageUri = (track.album) ? track.album.images[0].url : album.images[0].url;

		return (
			<PlayerBackground artwork={albumImageUri}>
				<View style={{ flex: 1, flexDirection: 'column' }}>
					<View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
						<Image source={require('./Resources/BOB_LOGOS/BOB_LOGO_WHITE.png')} style={styles.homeImage} />
					</View>
					<Slider step={1} maximumValue={this.state.duration} onSlidingComplete={this.positionSlidingComplete.bind(this)} value={this.state.position} style={{ width: '100%' }} thumbTintColor='white' maximumTrackTintColor='white' minimumTrackTintColor='white' />
					<View style={{ flex: 1 }}>
						<View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center', marginLeft: '10%', marginRight: '10%' }}>
							<Image source={require('./Resources/3RD_PARTY_LOGOS/SPOTIFY.png')} style={styles.spotify} />
							<View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
								<Text style={styles.trackName}>{track.name}</Text>
								<Text style={styles.artistName}>{track.artists[0].name}</Text>
							</View>
							<Image source={require('./Resources/ICONS/ACTION_MENU.png')} style={{ width: 20, height: (209 / 783) * 20 }} />
						</View>
						<View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center', marginLeft: '5%', marginRight: '5%' }}>
							<Image source={require('./Resources/ICONS/SHUFFLE_UNSELECTED.png')} style={{ width: 30, height: (565 / 719) * 30 }} />
							<Image source={require('./Resources/ICONS/BACK.png')} style={{ width: 40, height: (648 / 1068) * 40 }} />
							<TouchableHighlight onPress={() => this.pause()}>
								<Image source={this.state.pausedImage} style={{ width: 20, height: (643 / 546) * 20 }} />
							</TouchableHighlight>
							<Image source={require('./Resources/ICONS/FORWARD.png')} style={{ width: 40, height: (648 / 1068) * 40 }} />
							<Image source={require('./Resources/ICONS/REPEAT_UNSELECTED.png')} style={{ width: 30, height: (686 / 638) * 30 }} />
						</View>
						<View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center', marginLeft: '15%', marginRight: '15%' }}>
							<Image source={require('./Resources/ICONS/VOLUME_DOWN.png')} style={{ width: 20, height: (1560 / 1058) * 20 }} />
							<Slider step={1} maximumValue={100} onValueChange={this.volumeSlidingComplete.bind(this)} value={30} style={{ width: '80%' }} thumbTintColor='white' maximumTrackTintColor='white' minimumTrackTintColor='white' />
							<Image source={require('./Resources/ICONS/VOLUME_UP.png')} style={{ width: 20, height: (1550 / 1560) * 20 }} />
						</View>
						<View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center', marginLeft: '25%', marginRight: '25%', height: '10%' }}>
							<Image source={require('./Resources/ICONS/DOWNLOAD_AVAILABLE.png')} style={{ width: 30, height: (561 / 842) * 30 }} />
							<Image source={require('./Resources/ICONS/FAVOURITE_UNSELECTED.png')} style={{ width: 30, height: (687 / 649) * 30 }} />
							<Image source={require('./Resources/ICONS/QUEUE.png')} style={{ width: 30, height: (652 / 908) * 30 }} />
						</View>
					</View>
				</View>
			</PlayerBackground>
		);

		// return (
		// 	<View style={styles.container}>
		// 		{this.state.spotifyUserName != null ? (
		// 			<Text style={styles.greeting}>
		// 				You are logged in as {this.state.spotifyUserName}
		// 			</Text>
		// 		) : (
		// 				<Text style={styles.greeting}>
		// 					Getting user info...
		// 			</Text>
		// 			)}
		// 		<TouchableHighlight onPress={this.spotifyLogoutButtonWasPressed}>
		// 			<Text>Logout</Text>
		// 		</TouchableHighlight>
		// 	</View>
		// );
	}
}

const styles = StyleSheet.create({
	spotify: { width: 40, height: 40 * (1065 / 1045) },
	homeImage: {
		width: 50,
		height: (214 / 241) * 50,
		position: 'absolute',
		top: '5%',
		left: '10%'
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	greeting: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	artistName: {
		color: 'white',
		fontFamily: 'Myriad Pro Regular',
		fontSize: 20,
		padding: 5
	},
	trackName: {
		color: 'white',
		fontFamily: 'Myriad Pro Bold',
		fontSize: 20,
		padding: 5
	}

});
