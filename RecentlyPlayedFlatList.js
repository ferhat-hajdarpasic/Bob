import React, { Component } from "react";
import { StyleSheet, Image, View, Text, FlatList, ActivityIndicator, TouchableHighlight } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

import BobFlatList from './BobFlatList'
import SpotifyApi from './SpotifyApi'
let api = new SpotifyApi();

export default class RecentlyPlayedFlatList extends BobFlatList {
  constructor(props) {
    super(props);
    
  }

  async componentDidMount() {
    super.componentDidMount();
    AppState.addEventListener('change', this._handleStateChange);
    console.log('setAccessToken() called !!!!');
}

  makeRemoteRequest = async () => {
    const code = this.props.code;

    this.setState({ loading: true });

    let recentlyPlayed = await api.recentlyPlayed(code);

    let data = []

    for(let i = 0; i < recentlyPlayed.items.length; i++) {
      let item = recentlyPlayed.items[i];
      console.log('RESENTLYPLAYED='+JSON.stringify(item))
      let artists = [];

      for(let j = 0; j < item.track.artists.length; j++) {
        artists.push(item.track.artists[j].name);
      }
      let name = artists.join(' and ');
      data.push({
        name: name,
        url: item.track.album.images[0].url,
        album: item.track.album.name
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
      <TouchableHighlight onPress={() => this.play(item.name)}>
      <View style={{flex:1, width :'100%', flexDirection: 'row', alignContent:'space-between'}}>
        <Image source={{uri: item.url}} style={{width:50, height:50}}/>
        <View style={{flex:1, width :'100%', flexDirection: 'column', justifyContent:'space-around', paddingLeft:5}}>
          <Text style={styles.albumText}>{item.album} </Text>
          <Text style={styles.artistText}>{item.name} </Text>
        </View>
        <Image source={require('./Resources/BOB_LOGOS/BOB_LOGO_ORANGE.png')} style={styles.titleImage} />
      </View>
      </TouchableHighlight>
    );
    }

    play = async (name: string) => {
      // if(Spotify.isLoggedIn()) {
      //   Spotify.playUri('spotify:track:3MRQn2RYo2VLYMoStnLRxu');
      // } else {
      //   console.log('Not logged in!');
      // }
      console.log('HABA');
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