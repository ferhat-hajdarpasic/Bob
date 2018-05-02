import React, { Component } from 'react';

import { View, Text, TextInput, Image, ImageBackground } from 'react-native';

import { StyleSheet, WebView, Platform } from 'react-native';
import BKD from './BobBackground'
import SpotifyApi from './SpotifyApi'

let api = new SpotifyApi();

export default class ImportFromSpotify extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }
  render() {
    let redirect_url = 'about:blank';
    let client_id = '6a878d3c8b854a1387d2bcbe4c665cea';
    return (
      <BKD title='spotify import'>
        <View style={{
          flex: 1,
          flexDirection: 'column',
        }}>
          <View style={{ flexDirection: 'row', backgroundColor: 'transparent', flex: 2 }}>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'powderblue', flex: 1, alignItems: 'center' }}>
            <Image source={require('./Resources/3RD_PARTY_LOGOS/SPOTIFY.png')} style={styles.spotify} />
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'skyblue', flex: 6, alignItems: 'center' }}>
            <Image source={require('./Resources/3RD_PARTY_LOGOS/GOOGLE.png')} style={styles.spotify} />
            <Image source={require('./Resources/3RD_PARTY_LOGOS/FB.png')} style={styles.facebook} />
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'steelblue', flex: 1, alignItems: 'center' }}>
            <Image source={require('./Resources/BOB_LOGOS/BOB_LOGO_ORANGE.png')} style={styles.titleImage} />
            <Text style={styles.titleText}>import all to bob</Text>
          </View>
        </View>
      </BKD>
    );
  }
  componentDidMount() {
    const { params } = this.props.navigation.state;
    const code = params ? params.code : null;
    console.log('CODE=' + code);
    let r = api.playlists(code);
    console.log(JSON.stringify(r));
  }
}



const styles = StyleSheet.create({
  loginToBob: { color: 'white', fontFamily: 'Bauhaus 93', fontSize: 20, marginBottom: '10%' },
  login: { color: '#FCB415', fontFamily: 'Bauhaus 93', fontSize: 20, marginBottom: '10%' },
  import: { color: '#FCB415', fontFamily: 'Bauhaus 93', fontSize: 20 },
  spotify: { width: 40, height: 40 * (1065 / 1045) },
  facebook: { width: 40, height: 40 },
  titleImage: {
    width: 50,
    height: (214 / 241) * 50,
  },
  titleText: {
    color: '#FCB415',
    fontFamily: 'Bauhaus 93',
    fontSize: 20,
  }
});