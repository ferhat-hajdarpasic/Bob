import React, { Component } from 'react';

import { View, Text, TextInput, Image, ImageBackground } from 'react-native';

import { StyleSheet, WebView, Platform } from 'react-native';
import BKD from './screens/BobBackground'
import PlaylistFlatList from './TidalPlaylistFlatList'

export default class TidalPlaylist extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { params } = this.props.navigation.state;
    let playlistHref = params.href;
    let playlistName = params.name

    return (
        <BKD title={playlistName}>
        <View style={{
          flex: 1,
          flexDirection: 'column',
        }}>
          <View style={{ flexDirection: 'row', backgroundColor: 'transparent', flex: 1.5,  justifyContent: 'flex-end', alignItems: 'center'}}>
            <Image source={require('./Resources/3RD_PARTY_LOGOS/SPOTIFY.png')} style={styles.tidal} />
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'transparent', flex: 7, marginLeft:'10%' }}>
            <PlaylistFlatList playlistHref={playlistHref} navigation={this.props.navigation}/>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'transparent', flex: 1, marginLeft:'10%', alignItems: 'center' }}>
            <Image source={require('./Resources/BOB_LOGOS/BOB_LOGO_ORANGE.png')} style={styles.titleImage} />
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
  tidal: { width: 40, height: 40 * (1065 / 1045), right: '10%'},
  titleImage: {
    width: 50,
    height: (214 / 241) * 50
  },
  titleText: {
    color: '#FCB415',
    fontFamily: 'Bauhaus 93',
    fontSize: 20,
    padding:5
  }
});