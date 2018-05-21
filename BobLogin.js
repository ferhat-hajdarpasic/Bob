import React, { Component } from 'react';

import { View, Text, TextInput, Image, ImageBackground } from 'react-native';

import { StyleSheet, WebView, Platform } from 'react-native';
import BKD from './BobBackground'
import accounting from 'accounting';
import { NavigationActions } from 'react-navigation';
import Spotify from 'rn-spotify-sdk';

export default class BobLogin extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', spotifyInitialized: false };
    this.spotifyLoginButtonWasPressed = this.spotifyLoginButtonWasPressed.bind(this);
  }
  componentDidMount()
	{
		// initialize Spotify if it hasn't been initialized yet
		if(!Spotify.isInitialized())
		{
			var spotifyOptions = {
				"clientID":"6a878d3c8b854a1387d2bcbe4c665cea",
				"sessionUserDefaultsKey":"SpotifySession",
				"redirectURL":"testschema://callback",
				"scopes":["user-read-private", "user-read-email", "playlist-read-private", "user-library-read", "user-read-recently-played", "streaming"],
			};
			Spotify.initialize(spotifyOptions).then((loggedIn) => {
				this.setState({spotifyInitialized: true});
				if(loggedIn) {
					console.log("Spotify logged in.");
				}
			}).catch((error) => {
				console.log("Error", error);
			});
		}
		else
		{
			// update UI state
			this.setState((state) => {
				state.spotifyInitialized = true;
				return state;
			});
		}
  }
  spotifyLoginButtonWasPressed()
	{
		Spotify.login().then((loggedIn) => {
			if(loggedIn)
			{
				this.props.navigation.navigate('ImportFromSpotify', { });
			}
			else
			{
				console.log("Spotify not logged in.");
			}
		}).catch((error) => {
			// error
			console.log("Error", error);
		});
	}

  render() {
    console.log('FRED=' + accounting.formatMoney(455678.678));
    let redirect_url = 'about:blank';
    let client_id = '6a878d3c8b854a1387d2bcbe4c665cea';
    return (
      <BKD title='bob'>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={styles.loginToBob}>login to bob</Text>
          <TextInput placeholder="Enter Your Username" underlineColorAndroid='transparent' style={styles.username} onChangeText={(username) => this.setState({ username })} value={this.state.username} />
          <TextInput placeholder="Enter Your Password" secureTextEntry={true} underlineColorAndroid='transparent' style={styles.password} onChangeText={(password) => this.setState({ password })} value={this.state.password} />
          <View style={{ flexDirection: 'row', marginBottom: '10%'  }}>
            <Image source={require('./Resources/3RD_PARTY_LOGOS/GOOGLE.png')} style={styles.google} />
            <Image source={require('./Resources/3RD_PARTY_LOGOS/FB.png')} style={styles.facebook} />
          </View>
          <Text style={styles.login} onPress={this.spotifyLoginButtonWasPressed}>login</Text>
          <Text style={styles.joinBob}>join bob</Text>
        </View>
      </BKD>
    );
  }
}

const styles = StyleSheet.create({
  username: {backgroundColor: 'white', color: '#393536', textAlign: 'center', fontSize:20, fontFamily: 'Bauhaus 93', width: '80%', borderRadius: 50, marginBottom: '10%' },
  password: {backgroundColor: 'white', color: '#393536', textAlign: 'center', fontSize:20, fontFamily: 'Bauhaus 93', width: '80%', borderRadius: 50, marginBottom: '10%' },
  loginToBob: {color: 'white', fontFamily: 'Bauhaus 93', fontSize:20, marginBottom: '10%'},
  login: {color: '#FCB415', fontFamily: 'Bauhaus 93', fontSize:20, marginBottom: '10%'},
  joinBob: {color: '#FCB415', fontFamily: 'Bauhaus 93', fontSize:20},
  google: {width: 40, height: 40*(1065/1045), marginRight: '10%'},
  facebook: {width: 40, height: 40 }
});