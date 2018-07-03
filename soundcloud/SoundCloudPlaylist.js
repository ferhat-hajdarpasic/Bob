import React, { Component } from 'react';

import { View, Text, TextInput, Image, ImageBackground } from 'react-native';

import { StyleSheet, WebView, Platform } from 'react-native';
import BKD from './BobBackground'
import SoundCloudPlaylistFlatList from './SoundCloudPlaylistFlatList'

export default class SoundCloudPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { params } = this.props.navigation.state;
    let playlistId = params.playlistId;
    let playlistName = params.name
    return (
        <BKD title={playlistName}>
        <View style={{
          flex: 1,
          flexDirection: 'column',
        }}>
          <View style={{ flexDirection: 'row', backgroundColor: 'transparent', flex: 1.5,  justifyContent: 'flex-end', alignItems: 'center'}}>
            <Image source={require('../Resources/3RD_PARTY_LOGOS/SOUNDCLOUD.png')} style={styles.soundcloud} />
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'transparent', flex: 7, marginLeft:'10%' }}>
            <SoundCloudPlaylistFlatList playlistId={playlistId} navigation={this.props.navigation}/>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'transparent', flex: 1, marginLeft:'10%', alignItems: 'center' }}>
            <Image source={require('../Resources/BOB_LOGOS/BOB_LOGO_ORANGE.png')} style={styles.titleImage} />
            <Text style={styles.titleText}>import all to bob</Text>
          </View>
        </View>
      </BKD>
    );
  }
  async componentDidMount() {
  }
}

const styles = StyleSheet.create({
  soundcloud: { width: 40, height: 40 * (1084 / 1543), right: '10%'},
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
  },
  titleText: {
    color: '#FCB415',
    fontFamily: 'Bauhaus 93',
    fontSize: 20,
    padding:5
  }
});