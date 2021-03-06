import React, { Component } from "react";
import { StyleSheet, Image, View, Text, FlatList, ActivityIndicator, TouchableHighlight } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

import BobFlatList from './BobFlatList'
import SpotifyApi from './SpotifyApi'
import Spotify from 'rn-spotify-sdk';

let api = new SpotifyApi();

export default class RecentlyPlayedFlatList extends BobFlatList {
  constructor(props) {
    super(props);
    
  }

  makeRemoteRequest = async () => {
    this.setState({ loading: true });

    let auth = Spotify.getAuth();
    let recentlyPlayed = await api.recentlyPlayed(auth.accessToken);

    let data = []

    let trackNames = [];
    for(let i = 0; i < recentlyPlayed.items.length; i++) {
      let item = recentlyPlayed.items[i];
      //console.log('RESENTLYPLAYED='+JSON.stringify(item))
      let artists = [];

      for(let j = 0; j < item.track.artists.length; j++) {
        artists.push(item.track.artists[j].name);
      }
      let name = artists.join(' and ');
      if(!trackNames.includes(name)) {
        data.push({
          name: name,
          track: item.track
        });
        trackNames.push(name);
      }
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
      <TouchableHighlight onPress={() => this.play(item.track)}>
      <View style={{flex:1, width :'100%', flexDirection: 'row', alignContent:'space-between'}}>
        <Image source={{uri: item.track.album.images[0].url}} style={{width:50, height:50}}/>
        <View style={{flex:1, width :'100%', flexDirection: 'column', justifyContent:'space-around', paddingLeft:5}}>
          <Text style={styles.albumText}>{item.track.album.name} </Text>
          <Text style={styles.artistText}>{item.name} </Text>
        </View>
        <Image source={require('./Resources/BOB_LOGOS/BOB_LOGO_ORANGE.png')} style={styles.titleImage} />
      </View>
      </TouchableHighlight>
    );
    }

    play = async (track) => {
      //console.log('track:' + JSON.stringify(track));
      this.props.navigation.navigate('player', { track: track });
    };
}

const styles = StyleSheet.create({
  titleImage: {
    width: 50,
    height: (214 / 241) * 50,
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