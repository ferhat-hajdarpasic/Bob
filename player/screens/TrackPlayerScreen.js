
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

import PlayerBackground from '../../screens/PlayerBackground'

import { NavigationActions } from 'react-navigation';
import TrackPlayer from 'react-native-track-player';
const ReactNativeVolumeController = NativeModules.ReactNativeVolumeController;
export default class TrackPlayerScreen extends Component {
	static navigationOptions = {
		title: 'Player',
	};

	constructor(props) {
		super(props);
		this.state = {
			playingUri: null,
			position: 0,
			pausedImage: require('../../Resources/ICONS/PAUSE.png')
		};
	}

	componentWillUnmount() {
		this.mounted = false;
		console.log('Player will unmount. Clear timeout.');
		timer.clearTimeout(this);
	}

	async componentDidMount() {
		this.mounted = true;
		console.log(`componentDidMount, this.props = ${JSON.stringify(this.props)}`);
		await TrackPlayer.setupPlayer();
		TrackPlayer.updateOptions({
			stopWithApp: true,
			capabilities: [
				TrackPlayer.CAPABILITY_PLAY,
				TrackPlayer.CAPABILITY_PAUSE,
				TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
				TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
			]
		});
		await this.playNewSong();

		this.props.setVolume(this.props.volume);
	}

	componentWillReceiveProps = async (nextProps) => {
		console.log(`componentWillReceiveProps = ${JSON.stringify(nextProps)}`);
		if (nextProps.track && nextProps.track.id && (nextProps.track.id != this.props.track.id)) {
			await this.playNewSong();
		}
	}

	async positionSlidingComplete(value) {
		console.log('Value=' + value);
		console.log('Duration=' + JSON.stringify(await TrackPlayer.getDuration()));

		TrackPlayer.seekTo(value);
	}

	async volumeSlidingComplete(value) {
		console.log('Value=' + value);
		this.props.setVolume(value);
	}

	volumeUp() {
		let newVolume = this.props.volume + 5;
		if (newVolume > 100) {
			newVolume = 100;
		}
		this.props.setVolume(newVolume);
	}

	volumeDown() {
		let newVolume = this.props.volume - 5;
		if (newVolume < 0) {
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

	logoutButtonWasPressed = () => {
		//Spotify.logout().finally(() => {
		//		this.goToInitialScreen();
		//	});
	}

	playNewSong = async () => {
		const currentTrack = await TrackPlayer.getCurrentTrack();
		console.log(`this.props.track = ${JSON.stringify(this.props.track)}`);
		let streamUrl = await this.props.figureStreamUrl(this.props.track, this.props.sessionId);
		let track = {
			id: this.props.trackId,
			url: streamUrl,
			title: this.props.trackName,
			artist: this.props.artistName,
			artwork: this.props.albumImageUri
		}

		console.log(`Playing URL=${this.props.trackName}`);

        TrackPlayer.stop();
        TrackPlayer.reset();
        await TrackPlayer.add([track]);
        TrackPlayer.play();

        timer.setInterval(
			this, 'updateProgress', async () => {
				if (this.mounted) {
					let data = {
						position: await TrackPlayer.getPosition(),
						bufferedPosition: await TrackPlayer.getBufferedPosition(),
						duration: await TrackPlayer.getDuration()
					};
					console.log(`Progress = ${JSON.stringify(data)}`);
					this.setState({ position: data.position });
				}
			}, 1000
		);
	}

	async pause() {
		let playbackState = await TrackPlayer.getState();
		console.log('playbackState=' + playbackState);
		console.log('TrackPlayer.STATE_PLAYING=' + TrackPlayer.STATE_PLAYING);
		console.log('TrackPlayer.getDuration()=' + await TrackPlayer.getDuration());
		if (playbackState == TrackPlayer.STATE_PLAYING) {
			TrackPlayer.pause();
			this.setState({
				pausedImage: require('../../Resources/ICONS/PLAY.png')
			});
		} else {
			TrackPlayer.play();
			this.setState({
				pausedImage: require('../../Resources/ICONS/PAUSE.png')
			});
		}
	}

	async download() {
		this.props.navigation.navigate('ReactNode', { videoId: this.state.videoId, title: this.state.title });
	}

	render() {
		console.log(`albumImageUri = ${this.props.albumImageUri}`);
		console.log(JSON.stringify(this.props.trackName));
		return (
			<PlayerBackground artwork={this.props.albumImageUri}>
				<View style={{ flex: 1, flexDirection: 'column' }}>
					<View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
						<Image source={require('../../Resources/BOB_LOGOS/BOB_LOGO_WHITE.png')} style={styles.homeImage} />
					</View>
					<Slider step={1} maximumValue={this.props.duration} onSlidingComplete={this.positionSlidingComplete.bind(this)} value={this.state.position} style={{ width: '100%' }} thumbTintColor='white' maximumTrackTintColor='white' minimumTrackTintColor='white' />
					<View style={{ flex: 1 }}>
						<View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center', marginLeft: '10%', marginRight: '10%' }}>
							<Image source={this.props.logo.url} style={{ width: this.props.logo.width, height: this.props.logo.height }} />
							<View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
								<Text style={styles.trackName}>{this.props.trackName}</Text>
								<Text style={styles.artistName}>{this.props.artistName}</Text>
							</View>
							<Image source={require('../../Resources/ICONS/ACTION_MENU.png')} style={{ width: 20, height: (209 / 783) * 20 }} />
						</View>
						<View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center', marginLeft: '5%', marginRight: '5%' }}>
							<Image source={require('../../Resources/ICONS/SHUFFLE_UNSELECTED.png')} style={{ width: 30, height: (565 / 719) * 30 }} />
							<TouchableHighlight onPress={() => this.props.playPrevious()}>
								<Image source={require('../../Resources/ICONS/BACK.png')} style={{ width: 40, height: (648 / 1068) * 40 }} />
							</TouchableHighlight>
							<TouchableHighlight onPress={() => this.pause()}>
								<Image source={this.state.pausedImage} style={{ width: 20, height: (643 / 546) * 20 }} />
							</TouchableHighlight>
							<TouchableHighlight onPress={() => this.props.playNext()}>
								<Image source={require('../../Resources/ICONS/FORWARD.png')} style={{ width: 40, height: (648 / 1068) * 40 }} />
							</TouchableHighlight>
							<Image source={require('../../Resources/ICONS/REPEAT_UNSELECTED.png')} style={{ width: 30, height: (686 / 638) * 30 }} />
						</View>
						<View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center', marginLeft: '15%', marginRight: '15%' }}>
							<TouchableHighlight onPress={() => this.volumeDown()}>
								<Image source={require('../../Resources/ICONS/VOLUME_DOWN.png')} style={{ width: 20, height: (1560 / 1058) * 20 }} />
							</TouchableHighlight>
							<Slider step={1} maximumValue={100} onValueChange={this.volumeSlidingComplete.bind(this)} value={this.props.volume} style={{ width: '80%' }} thumbTintColor='white' maximumTrackTintColor='white' minimumTrackTintColor='white' />
							<TouchableHighlight onPress={() => this.volumeUp()}>
								<Image source={require('../../Resources/ICONS/VOLUME_UP.png')} style={{ width: 20, height: (1550 / 1560) * 20 }} />
							</TouchableHighlight>
						</View>
						<View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center', marginLeft: '25%', marginRight: '25%', height: '10%' }}>
							<Image source={require('../../Resources/ICONS/DOWNLOAD_AVAILABLE.png')} style={{ width: 30, height: (561 / 842) * 30 }} />
							<Image source={require('../../Resources/ICONS/FAVOURITE_UNSELECTED.png')} style={{ width: 30, height: (687 / 649) * 30 }} />
							<Image source={require('../../Resources/ICONS/QUEUE.png')} style={{ width: 30, height: (652 / 908) * 30 }} />
						</View>
					</View>
				</View>
			</PlayerBackground>
		);
	}
}

const styles = StyleSheet.create({
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
