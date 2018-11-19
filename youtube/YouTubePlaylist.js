import React, { Component } from 'react';

import { View, Text, Image } from 'react-native';

import BKD from '../screens/BobBackground'
import PlaylistFlatList from './YouTubePlaylistFlatList'
import styles from "../styles/playlist"

export default class YouTubePlaylist extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { params } = this.props.navigation.state;
    let playlistRef = params.playlistId;
    let playlistName = params.name
    let access_token = params.access_token;
    return (
        <BKD title={playlistName}>
        <View style={{
          flex: 1,
          flexDirection: 'column',
        }}>
          <View style={{ flexDirection: 'row', backgroundColor: 'transparent', flex: 1.5,  justifyContent: 'flex-end', alignItems: 'center'}}>
            <Image source={require('../Resources/3RD_PARTY_LOGOS/YOUTUBE.png')} style={styles.youtube} access_token = {access_token}/>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'transparent', flex: 7, marginLeft:'10%' }}>
            <PlaylistFlatList playlistRef={playlistRef} navigation={this.props.navigation}/>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'transparent', flex: 1, marginLeft:'10%', alignItems: 'center' }}>
            <Image source={require('../Resources/BOB_LOGOS/BOB_LOGO_ORANGE.png')} style={styles.titleImage} />
            <Text style={styles.titleText}>import all to bob</Text>
          </View>
        </View>
      </BKD>
    );
  }
}