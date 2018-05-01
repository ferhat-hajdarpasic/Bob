import React, { Component } from 'react';

import { View, TextInput, Image, ImageBackground } from 'react-native';

import { StyleSheet, WebView, Platform} from 'react-native';
 
export default class LoginToSpotify extends Component {
  constructor(props) {
    super(props);
    this.state = { code: '' };
  }
  render() {
    let redirect_url = 'https://example.com/callback';
    let client_id='6a878d3c8b854a1387d2bcbe4c665cea';        
    return (     
      <WebView 
        style={styles.WebViewStyle} 
        source={{uri: `https://accounts.spotify.com/authorize/?client_id=${client_id}&response_type=code&redirect_uri=${redirect_url}&scope=user-read-private user-read-email&state=34fFs29kd09`}} 
        javaScriptEnabled={true}
        domStorageEnabled={true}  
        onNavigationStateChange={(state) => {
          if(state.url.startsWith(redirect_url)) {
            var rx = /code=([^&]*)/g;
            const code = rx.exec(state.url)[1];
            console.log('User authorisation code is' + code);
            this.setState({ code })
            this.props.navigation.navigate('ImportFromSpotify', { code: code })
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