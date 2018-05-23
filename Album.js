import React, { Component } from 'react';

import { View, Text, TextInput, Image, ImageBackground } from 'react-native';

import { StyleSheet, WebView, Platform } from 'react-native';
import AlbumBackground from './AlbumBackground'
import AlbumFlatList from './AlbumFlatList'
import SpotifyApi from './SpotifyApi'
import Spotify from 'rn-spotify-sdk';

export default class Album extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { params } = this.props.navigation.state;
    let album = params.album;
    console.log('album' + JSON.stringify(album));

    return (
        <AlbumBackground album={album}>
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
            <Text style={styles.albumName}>{album.name}</Text>
            <Text style={styles.artistName}>{album.artists[0].name}</Text>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'transparent', flex: 2.5, marginLeft:'10%' }}>
            <AlbumFlatList album={album} navigation={this.props.navigation}/>
          </View>
        </View>
      </AlbumBackground>
    );
  }
  async componentDidMount() {
  }
}

const styles = StyleSheet.create({
  spotify: { width: 40, height: 40 * (1065 / 1045) },
  titleImage: {
    width: 50,
    height: (214 / 241) * 50
  },
  albumName: {
    color: 'white',
    fontFamily: 'Myriad Pro Bold',
    fontSize: 20,
    padding:5
  },
  artistName: {
    color: 'white',
    fontFamily: 'Myriad Pro Regular',
    fontSize: 20,
    padding:5
  }
});