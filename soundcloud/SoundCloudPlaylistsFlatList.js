import React, { Component } from "react";
import { StyleSheet, Image, View, Text, TouchableHighlight } from "react-native";
import BobFlatList from '../BobFlatList'
import SpotifyHelper from "../SpotifyHelper";
import SoundCloudPlaylistFlatList from './SoundCloudPlaylistFlatList'
import playlistStyles from "../styles/playlist"
import styles from "../styles/playlists"

import SoundCloudApi  from '../api/soundcloud/SoundCloudApi';

let api = new SoundCloudApi();

export default class PlaylistsFlatList extends BobFlatList {
  constructor(props) {
    super(props);
    
  }

  makeRemoteRequest = async () => {
    this.setState({ loading: true });

    console.log(`accessToken=${this.props.accessToken}`)
    this.state.playlists = await api.playlists(this.props.accessToken);

    let data = []

    for(let i = 0; i < this.state.playlists.length; i++) {
      let item = this.state.playlists[i];

      let trackWithImage = item.tracks.find(track => !(track.artwork_url === undefined) && track.artwork_url != null);
      console.log(`playlist image = ${JSON.stringify(trackWithImage)}`);
      let image = trackWithImage ? SpotifyHelper.uriImageSource(trackWithImage.artwork_url) : SpotifyHelper.emptyPlaylistImage();
      
      data.push({
        key: `${item.id}`,
        name: item.title,
        image: image,
        playlist: item
      });
    }

    this.setState({
      data: data,
      loading: false,
      refreshing: false
    });
  };

  renderSeparator = () => {
    return (
      <View
        style={styles.separatorStyle}
      />
    );
  };

  renderItem = ( {item, index} ) => {
      return (
        <TouchableHighlight onPress={() => this.play(item)}>
        <View style={{flex:1, width :'100%', flexDirection: 'row', alignContent:'space-between'}}>
          <Image source={item.image} style={{width:100, height:100}}/>
          <View style={{flex:1, width :'100%', flexDirection: 'column', justifyContent:'space-around', paddingLeft:20}}>
            <Text style={styles.albumText}>{item.name} </Text>
            <Text style={styles.artistText}>SoundCloud</Text>
            <Image source={require('../Resources/BOB_LOGOS/BOB_LOGO_ORANGE.png')} style={styles.titleImage} />
          </View>
        </View>
        </TouchableHighlight>
      );
      }
  
      play = (item) => {
        console.log('item=' + JSON.stringify(item));
        function FlatList(props) {
          return <SoundCloudPlaylistFlatList playlist={props.params.playlist} navigation={props.navigation}/>
        }
    
        let style = playlistStyles.soundcloud;
        let logoImage = require('../Resources/3RD_PARTY_LOGOS/SOUNDCLOUD.png');
    
        this.props.navigation.navigate('PlaylistScreen', { playlist: item.playlist, FlatList: FlatList, style:style, logoImage: logoImage });
      };
  }