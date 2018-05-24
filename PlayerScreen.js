
import React, { Component } from 'react';
import {
	Alert,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
	Image
} from 'react-native';

import PlayerBackground from './PlayerBackground'

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
		let track_json = '{"album":{"album_type":"album","artists":[{"external_urls":{"spotify":"https://open.spotify.com/artist/00FQb4jTyendYWaN8pK0wa"},"href":"https://api.spotify.com/v1/artists/00FQb4jTyendYWaN8pK0wa","id":"00FQb4jTyendYWaN8pK0wa","name":"Lana Del Rey","type":"artist","uri":"spotify:artist:00FQb4jTyendYWaN8pK0wa"}],"available_markets":["AD","AR","AT","AU","BE","BG","BO","BR","CA","CH","CL","CO","CR","CY","CZ","DE","DK","DO","EC","EE","ES","FI","FR","GB","GR","GT","HK","HN","HU","ID","IE","IL","IS","IT","JP","LI","LT","LU","LV","MC","MT","MX","MY","NI","NL","NO","NZ","PA","PE","PH","PL","PT","PY","RO","SE","SG","SK","SV","TH","TR","TW","US","UY","VN","ZA"],"external_urls":{"spotify":"https://open.spotify.com/album/5VoeRuTrGhTbKelUfwymwu"},"href":"https://api.spotify.com/v1/albums/5VoeRuTrGhTbKelUfwymwu","id":"5VoeRuTrGhTbKelUfwymwu","images":[{"height":640,"url":"https://i.scdn.co/image/d0b1088e6172acbe186bd7cdb47b099d252261ff","width":640},{"height":300,"url":"https://i.scdn.co/image/b04e4dc5b10c8a25687e81439499cc0df7b5aed1","width":300},{"height":64,"url":"https://i.scdn.co/image/5f778444676eb87f367d21ec5f1711314d3b155f","width":64}],"name":"Born To Die - The Paradise Edition","release_date":"2012-01-01","release_date_precision":"day","type":"album","uri":"spotify:album:5VoeRuTrGhTbKelUfwymwu"},"artists":[{"external_urls":{"spotify":"https://open.spotify.com/artist/00FQb4jTyendYWaN8pK0wa"},"href":"https://api.spotify.com/v1/artists/00FQb4jTyendYWaN8pK0wa","id":"00FQb4jTyendYWaN8pK0wa","name":"Lana Del Rey","type":"artist","uri":"spotify:artist:00FQb4jTyendYWaN8pK0wa"}],"available_markets":["AD","AR","AT","AU","BE","BG","BO","BR","CA","CH","CL","CO","CR","CY","CZ","DE","DK","DO","EC","EE","ES","FI","FR","GB","GR","GT","HK","HN","HU","ID","IE","IL","IS","IT","JP","LI","LT","LU","LV","MC","MT","MX","MY","NI","NL","NO","NZ","PA","PE","PH","PL","PT","PY","RO","SE","SG","SK","SV","TH","TR","TW","US","UY","VN","ZA"],"disc_number":1,"duration_ms":281960,"explicit":false,"external_ids":{"isrc":"GBUM71111621"},"external_urls":{"spotify":"https://open.spotify.com/track/0fBSs3fRoh1yJcne77fdu9"},"href":"https://api.spotify.com/v1/tracks/0fBSs3fRoh1yJcne77fdu9","id":"0fBSs3fRoh1yJcne77fdu9","is_local":false,"name":"Video Games","popularity":70,"preview_url":"https://p.scdn.co/mp3-preview/efda1e4784e32ece2c4a6ceb77c76585408fa98b?cid=774b29d4f13844c495f206cafdad9c86","track_number":4,"type":"track","uri":"spotify:track:0fBSs3fRoh1yJcne77fdu9"}';
		let track = JSON.parse(track_json);

		return (
			<PlayerBackground track={track}>
			<View style={{
			  flex: 1,
			  flexDirection: 'column',
			}}>
			  <View style={{ flexDirection: 'row', backgroundColor: 'transparent', flex: 1.5 }}>
			  </View>
			  <View style={{ flexDirection: 'row', backgroundColor: 'transparent', flex: 1, marginLeft:'10%', alignItems: 'center', justifyContent: 'space-between' }}>
				<Image source={require('./Resources/BOB_LOGOS/BOB_LOGO_WHITE.png')} style={styles.titleImage} />
				<Image source={require('./Resources/3RD_PARTY_LOGOS/SPOTIFY.png')} style={styles.spotify} />
			  </View>
			  <View style={{ flexDirection: 'column', backgroundColor: 'transparent', flex: 1, marginLeft:'10%', alignItems: 'center' }}>
				<Text style={styles.albumName}>{track.name}</Text>
				<Text style={styles.artistName}>{track.artists[0].name}</Text>
			  </View>
			  <View style={{ flexDirection: 'row', backgroundColor: 'transparent', flex: 2.5, marginLeft:'10%' }}>

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
