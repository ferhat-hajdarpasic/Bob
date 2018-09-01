import React, { Component } from "react";
import { StyleSheet, Image, View, Text, FlatList, ActivityIndicator, TouchableHighlight } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

import BobFlatList from './BobFlatList'
import SpotifyApi from './SpotifyApi'
import Spotify from 'rn-spotify-sdk';
import SpotifyHelper from "./SpotifyHelper";
let api = new SpotifyApi();

export default class AlbumsFlatList extends BobFlatList {
  constructor(props) {
    super(props);
    
  }

  makeRemoteRequest = async () => {
    let auth = Spotify.getAuth();

    this.setState({ loading: true });

    let albums = await api.albums(auth.accessToken);
    //console.log('albums=' + JSON.stringify(albums));

    let data = []

    for(let i = 0; i < albums.items.length; i++) {
      let item = albums.items[i];
      let artists = [];

      for(let j = 0; j < item.album.artists.length; j++) {
        artists.push(item.album.artists[j].name);
      }
      let name = artists.join(' and ');
      data.push({
        album: item.album,
        artistName: name,
        image: SpotifyHelper.albumImageSource(item.album),
        albumName: item.album.name,
        albumId: item.album.id,
        key: item.album.id
      });
    }
    //console.log('data=' + JSON.stringify(data));

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
      <TouchableHighlight onPress={() =>  this.props.navigation.navigate('Album', { album: item.album })}>
      <View style={{flex:1, width :'100%', flexDirection: 'row', alignContent:'space-between'}}>
        <Image source={item.image} style={{width:50, height:50}}/>
        <View style={{flex:1, width :'100%', flexDirection: 'column', justifyContent:'space-around', paddingLeft:5}}>
          <Text style={styles.albumText}>{item.albumName} </Text>
          <Text style={styles.artistText}>{item.artistName} </Text>
        </View>
        <Image source={require('./Resources/BOB_LOGOS/BOB_LOGO_ORANGE.png')} style={styles.titleImage} />
      </View>
      </TouchableHighlight>
    );
  }
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