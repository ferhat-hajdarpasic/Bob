import React, { Component } from 'react';

import { View, Text, TextInput, Image, ImageBackground, TouchableHighlight } from 'react-native';

import { StyleSheet, WebView, Platform } from 'react-native';
import BKD from './BobBackground'
import { NavigationActions } from 'react-navigation';
import Spotify from 'rn-spotify-sdk';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'
import { connect } from "react-redux";

class _BobLogin extends Component {
	constructor(props) {
		super(props);
		this.state = { username: '', password: '', spotifyInitialized: false };
		this.spotifyButtonPressed = this.spotifyButtonPressed.bind(this);
		this.youtubeButtonPressed = this.youtubeButtonPressed.bind(this);
		this.soundcloudButtonPressed = this.soundcloudButtonPressed.bind(this);
	}
	componentDidMount() {
		// initialize Spotify if it hasn't been initialized yet
		if (!Spotify.isInitialized()) {
			var spotifyOptions = {
				"clientID": "6a878d3c8b854a1387d2bcbe4c665cea",
				"sessionUserDefaultsKey": "SpotifySession",
				"redirectURL": "testschema://callback",
				"scopes": ["user-read-private", "user-read-email", "playlist-read-private", "user-library-read", "user-read-recently-played", "streaming"],
			};
			Spotify.initialize(spotifyOptions).then((loggedIn) => {
				this.setState({ spotifyInitialized: true });
				if (loggedIn) {
					console.log("Spotify logged in.");
				}
			}).catch((error) => {
				console.log("Error", error);
			});
		}
		else {
			// update UI state
			this.setState((state) => {
				state.spotifyInitialized = true;
				return state;
			});
		}
	}
	spotifyButtonPressed() {
		Spotify.login().then((loggedIn) => {
			if (loggedIn) {
				this.props.navigation.navigate('ImportFromSpotify', {});
			}
			else {
				console.log("Spotify not logged in.");
			}
		}).catch((error) => {
			// error
			console.log("Error", error);
		});
	}

	soundcloudButtonPressed() {
		this.props.navigation.navigate('LoginToSoundCloud', {});
	}

	tidalButtonPressed = () => {
        if(this.props.tidalOauth) {
            this.props.navigation.navigate('ImportFromTidal', {});
        } else {
            this.props.navigation.navigate('LoginToTidal', {});
        }
	}

	async youtubeButtonPressed() {
		try {
			await GoogleSignin.hasPlayServices({ autoResolve: true })

			await GoogleSignin.configure({
				scopes: ["https://www.googleapis.com/auth/youtube.readonly"], // what API you want to access on behalf of the user, default is email and profile
				offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
				hostedDomain: '', // specifies a hosted domain restriction
				forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
				accountName: '' // [Android] specifies an account name on the device that should be used
			})

			const user = await GoogleSignin.currentUserAsync()
			if (!user) {
				try {
					let user = await GoogleSignin.signIn();
					console.log(user);
					this.setState({ user: user });
				} catch(err) {
						console.warn(err)
				};
			}
			console.log(user)

		} catch (err) {
			console.warn('Google signin error', err.code, err.message)
		}
		this.props.navigation.navigate('ImportFromYoutube', {});
	}

	render() {
		let redirect_url = 'about:blank';
		let client_id = '6a878d3c8b854a1387d2bcbe4c665cea';
		return (
			<BKD title='bob'>
				<View style={{ flex: 1, flexDirection: 'column', marginLeft: '5%', marginTop: '30%', marginRight: '10%' }}>
					<View style={{ flex: 1 }}>
						<Text style={styles.text}>lets add your favourites!</Text>
					</View>
					<View style={{ flex: 9, flexDirection: 'row', justifyContent: 'space-between' }}>
						<View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
							<TouchableHighlight onPress={this.soundcloudButtonPressed}>
								<Image source={require('../Resources/3RD_PARTY_LOGOS/SOUNDCLOUD.png')} style={styles.soundcloud} />
							</TouchableHighlight>
							<TouchableHighlight onPress={this.spotifyButtonPressed}>
								<Image source={require('../Resources/3RD_PARTY_LOGOS/SPOTIFY.png')} style={styles.spotify} />
							</TouchableHighlight>
							<TouchableHighlight onPress={this.tidalButtonPressed}>
								<Image source={require('../Resources/3RD_PARTY_LOGOS/TIDAL.png')} style={styles.tidal} />
							</TouchableHighlight>
						</View>
						<View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
							<TouchableHighlight>
								<Image source={require('../Resources/3RD_PARTY_LOGOS/PLAY_MUSIC.png')} style={styles.play_music} />
							</TouchableHighlight>
							<TouchableHighlight onPress={this.youtubeButtonPressed}>
								<Image source={require('../Resources/3RD_PARTY_LOGOS/YOUTUBE.png')} style={styles.youtube} />
							</TouchableHighlight>
							<TouchableHighlight>
								<Image source={require('../Resources/3RD_PARTY_LOGOS/DEEZER.png')} style={styles.deezer} />
							</TouchableHighlight>
						</View>
					</View>
				</View>
			</BKD>
		);
	}
}

const styles = StyleSheet.create({
	text: { color: 'white', fontFamily: 'Bauhaus 93', fontSize: 20, marginBottom: '10%' },
	soundcloud: { width: 80, height: 80 * (1039 / 2394) },
	spotify: { width: 80, height: 80 * (1079 / 1079) },
	tidal: { width: 80, height: 80 * (1041 / 2140) },
	play_music: { width: 80, height: 80 * (1066 / 932) },
	youtube: { width: 80, height: 80 * (1084 / 1543) },
	deezer: { width: 80, height: 80 * (1063 / 1750) }
});

const mapStateToProps = state => ({
    tidalOauth: state.tidalOauth,
});

export default BobLogin = connect(mapStateToProps, null)(_BobLogin);
