
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

import PlayerBackground from '../../screens/PlayerBackground'

import { NavigationActions } from 'react-navigation';
import TrackPlayer, { ProgressComponent } from 'react-native-track-player';
import playlistData from '../data/playlist.json';
import TrackStore from '../stores/Track';

export default class TrackPlayerScreen extends Component {
	static navigationOptions = {
		title: 'Player',
	};

	constructor(props) {
		super(props);

		const { params } = this.props.navigation.state;
		//let track = params.track;
		//let album = params.album;


		this.state = {
			spotifyUserName: null,
			duration: 100000 / 1000,
			position: 0,
			//track: track,
			//album: album,
			videoId: params.videoId,
			videoUrl: params.videoUrl,
			title: params.title,
			artwork: params.artwork,
			pausedImage: require('../../Resources/ICONS/PAUSE.png')
		};

		//this.spotifyLogoutButtonWasPressed = this.spotifyLogoutButtonWasPressed.bind(this);
		console.log('state=' + JSON.stringify(this.state));
	}

	componentWillUnmount() {
		timer.clearTimeout(this);
	}

	async componentDidMount() {
		TrackPlayer.setupPlayer();
		TrackPlayer.updateOptions({
			stopWithApp: true,
			capabilities: [
			TrackPlayer.CAPABILITY_PLAY,
			TrackPlayer.CAPABILITY_PAUSE,
			TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
			TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
			]
		});
		const currentTrack = await TrackPlayer.getCurrentTrack();

		console.log(`Playing videoUrl=${this.state.videoUrl}`);

		let track = {
			id: this.state.videoId, 
			url: this.state.videoUrl,
			title: this.state.title,
			artist: this.state.videoId,
			artwork: this.state.artwork
		  }

		if (currentTrack == null) {
			TrackPlayer.reset();
			await TrackPlayer.add([track]);
			TrackPlayer.play();
		}


		TrackPlayer.registerEventHandler(async (data) => {
			console.log('event='+JSON.stringify(data));
		});
	}

	async positionSlidingComplete(value) {
		console.log('Value=' + value);
		console.log('Duration=' + JSON.stringify(await TrackPlayer.getDuration()));
		
		TrackPlayer.seekTo(value);
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
       this.props.navigation.navigate('ReactNode', { videoId: this.state.videoId});
	}

	render() {
		//let track = this.state.track;
		//let album = this.state.album;

		return (
			<PlayerBackground artwork={this.state.artwork}>
				<View style={{ flex: 1, flexDirection: 'column' }}>
					<View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
						<Image source={require('../../Resources/BOB_LOGOS/BOB_LOGO_WHITE.png')} style={styles.homeImage} />
					</View>
					<Slider step={1} maximumValue={this.state.duration} onSlidingComplete={this.positionSlidingComplete.bind(this)} value={this.state.position} style={{ width: '100%' }} thumbTintColor='white' maximumTrackTintColor='white' minimumTrackTintColor='white' />
					<View style={{ flex: 1 }}>
						<View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center', marginLeft: '10%', marginRight: '10%' }}>
							<Image source={require('../../Resources/3RD_PARTY_LOGOS/YOUTUBE.png')} style={styles.yuotube} />
							<View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
								<Text style={styles.trackName}>{this.state.title}</Text>
								<Text style={styles.artistName}>{this.state.videoId}</Text>
							</View>
							<Image source={require('../../Resources/ICONS/ACTION_MENU.png')} style={{ width: 20, height: (209 / 783) * 20 }} />
						</View>
						<View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center', marginLeft: '5%', marginRight: '5%' }}>
							<Image source={require('../../Resources/ICONS/SHUFFLE_UNSELECTED.png')} style={{ width: 30, height: (565 / 719) * 30 }} />
							<Image source={require('../../Resources/ICONS/BACK.png')} style={{ width: 40, height: (648 / 1068) * 40 }} />
							<TouchableHighlight onPress={() => this.pause()}>
								<Image source={this.state.pausedImage} style={{ width: 20, height: (643 / 546) * 20 }} />
							</TouchableHighlight>
							<Image source={require('../../Resources/ICONS/FORWARD.png')} style={{ width: 40, height: (648 / 1068) * 40 }} />
							<Image source={require('../../Resources/ICONS/REPEAT_UNSELECTED.png')} style={{ width: 30, height: (686 / 638) * 30 }} />
						</View>
						<View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center', marginLeft: '15%', marginRight: '15%' }}>
							<Image source={require('../../Resources/ICONS/VOLUME_DOWN.png')} style={{ width: 20, height: (1560 / 1058) * 20 }} />
							<Slider step={1} maximumValue={100} onValueChange={this.volumeSlidingComplete.bind(this)} value={30} style={{ width: '80%' }} thumbTintColor='white' maximumTrackTintColor='white' minimumTrackTintColor='white' />
							<Image source={require('../../Resources/ICONS/VOLUME_UP.png')} style={{ width: 20, height: (1550 / 1560) * 20 }} />
						</View>
						<View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center', marginLeft: '25%', marginRight: '25%', height: '10%' }}>
							<TouchableHighlight onPress={() => this.download()}>
								<Image source={require('../../Resources/ICONS/DOWNLOAD_AVAILABLE.png')} style={{ width: 30, height: (561 / 842) * 30 }} />
							</TouchableHighlight>
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
	yuotube: { width: 40, height: 40 * (1084 / 1583) },
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
