import React, { Component } from "react";
import { StyleSheet, Image, View, Text, FlatList, ActivityIndicator, TouchableHighlight } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

import BobFlatList from './BobFlatList';
import SpotifyApi from './SpotifyApi';
let api = new SpotifyApi();

export default class AlbumFlatList extends BobFlatList {
  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
    let tracks = []

    for(let i = 0; i < this.props.album.tracks.items.length; i++) {
      let track = this.props.album.tracks.items[i];
      let artists = [];

      for(let j = 0; j < track.artists.length; j++) {
        artists.push(track.artists[j].name);
      }
      let artistName = artists.join(' and ');
      tracks.push({
        artist: artistName,
        name: track.name,
        uri: track.uri
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
      <TouchableHighlight onPress={() => this.play(item.uri)}>
      <View style={{flex:1, width :'100%', flexDirection: 'row', alignContent:'space-between'}}>
        <Image source={{uri: item.url}} style={{width:50, height:50}}/>
        <View style={{flex:1, width :'100%', flexDirection: 'column', justifyContent:'space-around', paddingLeft:5}}>
          <Text style={styles.albumText}>{item.name} </Text>
          <Text style={styles.artistText}>{item.artist} </Text>
        </View>
        <Image source={require('./Resources/ICONS/PLAY.png')} style={styles.titleImage} />
      </View>
      </TouchableHighlight>
    );
    }

    play = (name: string) => {
      const code = this.props.code;
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