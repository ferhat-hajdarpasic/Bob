import React, { Component } from "react";
import { StyleSheet, Image, View, Text, FlatList, ActivityIndicator, TouchableHighlight } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

import BobFlatList from './BobFlatList';
import Spotify from 'rn-spotify-sdk';
import SpotifyApi from './SpotifyApi';
import SpotifyHelper from "./SpotifyHelper";
let api = new SpotifyApi();

export default class PlaylistFlatList extends BobFlatList {
  constructor(props) {
    super(props);
    console.log('PlaylistFlatList constructor()');    
  }

  async makeRemoteRequest() {
    console.log('PlaylistFlatList makeRemoteRequest()');
    let auth = Spotify.getAuth();
    let playlist = await api.playlist(auth.accessToken, this.props.playlistHref);
    let tracks = [];

    for(let i = 0; i < playlist.tracks.items.length; i++) {
      let track = playlist.tracks.items[i].track;
      console.log('FRED track='+JSON.stringify(track));
      let artists = [];

      for(let j = 0; j < track.artists.length; j++) {
        artists.push(track.artists[j].name);
      }
      let artistName = artists.join(' and ');
      tracks.push({
        artist: `${i}` + artistName,
        track: track,
        album: track.album,
        key: track.album.id
      });
    }

    this.setState({
      data: tracks,
      loading: false,
      refreshing: false
    });

  }

  renderSeparator = () => {
    return (
      <View
        style={styles.separatorStyle}
      />
    );
  };

  renderItem = ( {item, index} ) => {
    return (
      <TouchableHighlight onPress={() => this.play(item.track, item.album)}>
      <View style={{flex:1, width :'100%', flexDirection: 'row', alignContent:'space-between'}}>
        <Image source={SpotifyHelper.albumImageSource(item.album)} style={{width:50, height:50}}/>
        <View style={{flex:1, width :'100%', flexDirection: 'column', justifyContent:'space-around', paddingLeft:5}}>
          <Text style={styles.albumText}>{item.track.name} </Text>
          <Text style={styles.artistText}>{item.artist} </Text>
        </View>
        <Image source={require('./Resources/ICONS/PLAY.png')} style={styles.titleImage} />
      </View>
      </TouchableHighlight>
    );
    }

    play = (track, album) => {
      this.props.navigation.navigate('player', { track: track, album: album });
    };
}

const styles = StyleSheet.create({
  titleImage: {
    width: 20,
    height: (648 / 550) * 20,
    marginRight:20
  },
  artistText: {
    color: 'white',
    fontFamily: 'Myriad Pro Regular',
    fontSize: 12
  },
  albumText: {
    color: 'white',
    fontFamily: 'Myriad Pro Bold',
    fontSize: 12
  },
  separatorStyle: {
    height: 15,
    width: "86%",
    backgroundColor: "transparent",
    marginLeft: "14%"
  }
});