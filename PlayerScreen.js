
import React, { Component } from 'react';
import {
	Alert,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Spotify from 'rn-spotify-sdk';

export default class PlayerScreen extends Component {
	static navigationOptions = {
		title: 'Player',
	};

	constructor() {
		super();

		this.state = { spotifyUserName: null };

		this.spotifyLogoutButtonWasPressed = this.spotifyLogoutButtonWasPressed.bind(this);
	}

	componentDidMount() {
		const { params } = this.props.navigation.state;
		let track = params.track;
		console.log('send api request to get user info');
		Spotify.getMe().then((result) => {
			console.log("GETTING freaking *****result=" + JSON.stringify(result));
			try {
				let auth = Spotify.getAuth();
				let access_code = JSON.stringify(auth)
				console.log("FREDDY : access_token=" + access_code);
			} catch (e) {
				console.log("Error", e.message);
			}
			this.setState({ spotifyUserName: result.display_name });
			// play song
			return Spotify.playURI(track.uri, 0, 0);
		}).then(() => {
			console.log('Started playing track: ' + JSON.stringify(track));
		}).catch((error) => {
			console.log('Failed to play track: ' + JSON.stringify(track));
			console.log("Error", error.message);
		});
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

	render() {
		return (
			<View style={styles.container}>
				{this.state.spotifyUserName != null ? (
					<Text style={styles.greeting}>
						You are logged in as {this.state.spotifyUserName}
					</Text>
				) : (
						<Text style={styles.greeting}>
							Getting user info...
					</Text>
					)}
				<TouchableHighlight onPress={this.spotifyLogoutButtonWasPressed}>
					<Text>Logout</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

const styles = StyleSheet.create({
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
});
