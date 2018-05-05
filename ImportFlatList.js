import React, { Component } from "react";
import { StyleSheet, Image, View, Text, FlatList, ActivityIndicator } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

import BobFlatList from './BobFlatList'
import SpotifyApi from './SpotifyApi'
let api = new SpotifyApi();

export default class ImportFlatList extends BobFlatList {
  constructor(props) {
    super(props);
  }

  makeRemoteRequest = async () => {
    const code = this.props.code;
    console.log('CODE=' + code);

    this.setState({ loading: true });

    let playlists = await api.playlists(code);
    let recentlyPlayed = await api.recentlyPlayed(code);
    let albums = await api.albums(code);

    //console.log('playlists' + playlists.items[0].images[0].url);
    //console.log('recentlyPlayed' + recentlyPlayed.items[0].track.album.images[0].url);
    //console.log('albums = ' + albums.items[0].album.images[0].url);

    this.setState({
      data: [
        {
          url: recentlyPlayed.items[0].track.album.images[0].url,
          name: 'recently played'
        },
        {
          url: playlists.items[0].images[0].url,
          name: 'playlists'
        },
        {
          url: albums.items[0].album.images[0].url,
          name: 'albums'
        }
      ],
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
      <View style={{flex:1, width :'100%', flexDirection: 'row', alignContent:'space-between'}}>
        <Image source={{uri: item.url}} style={{width:100, height:100}}/>
        <View style={{flex:1, width :'100%', flexDirection: 'column', justifyContent:'space-around', paddingLeft:15}}>
          <Text style={styles.titleText}>{item.name} </Text>
          <Image source={require('./Resources/BOB_LOGOS/BOB_LOGO_ORANGE.png')} style={styles.titleImage} />
        </View>
      </View>
    );
    }
}

const styles = StyleSheet.create({
  titleImage: {
    width: 50,
    height: (214 / 241) * 50
  },
  titleText: {
    color: 'white',
    fontFamily: 'MyriadPro-Bold',
    
    fontSize: 16
  },
  separatorStyle: {
    height: 15,
    width: "86%",
    backgroundColor: "transparent",
    marginLeft: "14%"
  }
});