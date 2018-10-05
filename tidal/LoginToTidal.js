import React, { Component } from 'react';

import { Linking, View, TextInput, Image, ImageBackground } from 'react-native';

import { StyleSheet, WebView, Platform} from 'react-native';
import {TidalApi, redirect_url} from './TidalApi'

export default class LoginToTidal extends Component {
  constructor(props) {
    super(props);
    this.state = { access_token: '' };
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleLoginCallback);
    console.log('Added event listener');
  }
  componentWillUnmount() {
    console.log('Removed event listener');
    Linking.removeEventListener('url', this.handleLoginCallback);
  }
  handleLoginCallback = async (event) => {
    console.log('bobmusic://callback=' + event.url);
    const code = TidalApi.getCodeFromCallbackUrl(event);
    if(code) {
      console.log('User code is: ' + code);
      const oauth = await TidalApi.oauth(code);
      console.log(`access_token is: ${oauth.access_token}`);
      console.log(`userid is: ${oauth.user.userId}`)
      this.props.navigation.navigate('ImportFromTidal', { oauth: oauth })
    }
}
  render() {
    const uri = TidalApi.loginUrl();
    return (     
      <WebView 
        style={styles.WebViewStyle} 
        source={{uri: uri}} 
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onNavigationStateChange={async (state) => {
          console.log('Navigation state changed event:' + JSON.stringify(state));
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