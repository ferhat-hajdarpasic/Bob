import React, { Component } from 'react';

import { View, TextInput, Image, ImageBackground } from 'react-native';

import { StyleSheet, WebView, Platform} from 'react-native';
 
export default class LoginToSoundCloud extends Component {
  constructor(props) {
    super(props);
    this.state = { access_token: '' };
  }
  
  render() {
    let redirect_url = 'http://developers.soundcloud.com/callback.html';
    let client_id='z8LRYFPM4UK5MMLaBe9vixfph5kqNA25';
    return (     
      <WebView 
        style={styles.WebViewStyle} 
        source={{uri: `https://soundcloud.com/connect?client_id=z8LRYFPM4UK5MMLaBe9vixfph5kqNA25&redirect_uri=http://developers.soundcloud.com/callback.html&response_type=code_and_token&scope=non-expiring`}} 
        javaScriptEnabled={true}
        domStorageEnabled={true}  
        onNavigationStateChange={(state) => {
          //https://developers.soundcloud.com/callback.html?code=2bbd50a2013ff91fdb95bb4fa0838da9#access_token=1-178930-450627837-740f6f923d451&scope=non-expiring
          if(state.url.startsWith(redirect_url)) {
            //const code = (/code=([^&]*)/g).exec(state.url)[1];
            //console.log('User authorisation code is' + code);
            let rx = /access_token=([^&]*)/g;
            const access_token = rx.exec(state.url)[1];
            console.log('User access token is' + access_token);
            this.setState({ access_token: access_token })
            this.props.navigation.navigate('ImportFromSoundCloud', { access_token: access_token })
          }
        }}
      />    
    );
  }
}
 
const styles = StyleSheet.create({
 WebViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    marginTop: (Platform.OS) === 'ios' ? 20 : 0
 }});