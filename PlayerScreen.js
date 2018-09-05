
import React, { Component } from 'react';
import {
	Alert,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
	Image,
	Slider,
	NativeModules
} from 'react-native';

import timer from 'react-native-timer';

import PlayerBackground from './screens/PlayerBackground'

import { NavigationActions } from 'react-navigation';
import Spotify from 'rn-spotify-sdk';
import SpotifyApi from './SpotifyApi';

import { connect } from "react-redux";

let api = new SpotifyApi();
const ReactNativeVolumeController = NativeModules.ReactNativeVolumeController;

class _PlayerScreen extends Component {
	static navigationOptions = {
		title: 'Player',
	};

	constructor(props) {
		super(props);

		const { params } = this.props.navigation.state;
		let track = params.track;
		let album = params.album;

		this.state = {
			duration: track.duration_ms / 1000,
			position: 0,
			track: track,
			album: album,
			pausedImage: require('./Resources/ICONS/PAUSE.png'),
			albumImageUri: (track.album) ? track.album.images[0].url : album.images[0].url
		};
		console.log(`albumImageUri = ${this.state.albumImageUri}`);

		this.spotifyLogoutButtonWasPressed = this.spotifyLogoutButtonWasPressed.bind(this);
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
		this.props.setVolume(this.props.volume);
	}

	async positionSlidingComplete(value) {
		console.log('Value=' + value);
		await Spotify.seek(value);
	}

	async volumeSlidingComplete(value) {
		this.props.setVolume(value);
	}

	volumeUp() {
		let newVolume = this.props.volume + 5;
		if(newVolume > 100) {
			newVolume = 100;
		}
		this.props.setVolume(newVolume);
	}

	volumeDown() {
		let newVolume = this.props.volume - 5;
		if(newVolume < 0) {
			newVolume = 0;
		}
		this.props.setVolume(newVolume);
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

	playNext() {
		let albumImageSample1 = 'https://i.scdn.co/image/c5484d389b17edbf5ff51751e63ee87801270b97';
		this.setState({albumImageUri: albumImageSample1});
	}

	playPrevious() {
		let albumImageSample2 = 'https://i.scdn.co/image/22bcdcc2c2e514e475abc4d4af336d8b2073be93';
		this.setState({albumImageUri: albumImageSample2});
	}

	render() {
		return (
			<PlayerBackground artwork={this.state.albumImageUri}>
				<View style={{ flex: 1, flexDirection: 'column' }}>
					<View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
						<Image source={require('./Resources/BOB_LOGOS/BOB_LOGO_WHITE.png')} style={styles.homeImage} />
					</View>
					<Slider step={1} maximumValue={this.state.duration} onSlidingComplete={this.positionSlidingComplete.bind(this)} value={this.state.position} style={{ width: '100%' }} thumbTintColor='white' maximumTrackTintColor='white' minimumTrackTintColor='white' />
					<View style={{ flex: 1 }}>
						<View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center', marginLeft: '10%', marginRight: '10%' }}>
							<Image source={require('./Resources/3RD_PARTY_LOGOS/SPOTIFY.png')} style={styles.spotify} />
							<View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
								<Text style={styles.trackName}>{this.state.track.name}</Text>
								<Text style={styles.artistName}>{this.state.track.artists[0].name}</Text>
							</View>
							<Image source={require('./Resources/ICONS/ACTION_MENU.png')} style={{ width: 20, height: (209 / 783) * 20 }} />
						</View>
						<View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center', marginLeft: '5%', marginRight: '5%' }}>
							<Image source={require('./Resources/ICONS/SHUFFLE_UNSELECTED.png')} style={{ width: 30, height: (565 / 719) * 30 }} />
							<TouchableHighlight onPress={() => this.playPrevious()}>
								<Image source={require('./Resources/ICONS/BACK.png')} style={{ width: 40, height: (648 / 1068) * 40 }} />
							</TouchableHighlight>
							<TouchableHighlight onPress={() => this.pause()}>
								<Image source={this.state.pausedImage} style={{ width: 20, height: (643 / 546) * 20 }} />
							</TouchableHighlight>
							<TouchableHighlight onPress={() => this.playNext()}>
								<Image source={require('./Resources/ICONS/FORWARD.png')} style={{ width: 40, height: (648 / 1068) * 40 }} />
							</TouchableHighlight>
							<Image source={require('./Resources/ICONS/REPEAT_UNSELECTED.png')} style={{ width: 30, height: (686 / 638) * 30 }} />
						</View>
						<View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center', marginLeft: '15%', marginRight: '15%' }}>
							<TouchableHighlight onPress={() => this.volumeDown()}>
								<Image source={require('./Resources/ICONS/VOLUME_DOWN.png')} style={{ width: 20, height: (1560 / 1058) * 20 }} />
							</TouchableHighlight>
							<Slider step={1} maximumValue={100} onValueChange={this.volumeSlidingComplete.bind(this)} value={this.props.volume} style={{ width: '80%' }} thumbTintColor='white' maximumTrackTintColor='white' minimumTrackTintColor='white' />
							<TouchableHighlight onPress={() => this.volumeUp()}>
								<Image source={require('./Resources/ICONS/VOLUME_UP.png')} style={{ width: 20, height: (1550 / 1560) * 20 }} />
							</TouchableHighlight>
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
	}
}

const mapStateToProps = state => ({
	volume: state.volume
})

const mapDispatchToProps = (dispatch) => ({
	setVolume: (value) => { 
		ReactNativeVolumeController.change(value/100);
		ReactNativeVolumeController.update();
		dispatch({ type: 'SET_VOLUME', value: value });
	}
})

export default PlayerScreen = connect(mapStateToProps, mapDispatchToProps)(_PlayerScreen);

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
