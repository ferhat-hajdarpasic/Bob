import React, { Component } from "react";
import { StyleSheet, Image, View, Text, FlatList, ActivityIndicator, TouchableHighlight } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

import BobFlatList from './BobFlatList'
import SpotifyApi from './SpotifyApi'
let api = new SpotifyApi();

export default class AlbumsFlatList extends BobFlatList {
  constructor(props) {
    super(props);
    
  }

  makeRemoteRequest = async () => {
    const code = this.props.code;

    this.setState({ loading: true });

    let albums = await api.albums(code);

    let data = []

    for(let i = 0; i < albums.items.length; i++) {
      let item = albums.items[i];
      let artists = [];

      for(let j = 0; j < item.album.artists.length; j++) {
        artists.push(item.album.artists[j].name);
      }
      let name = artists.join(' and ');
      data.push({
        name: name,
        url: item.album.images[0].url,
        album: item.album.name
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

    play = (name: string) => {
      const code = this.props.code;
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
    fontFamily: 'MyriadPro-Regular',
    fontSize: 12
  },
  albumText: {
    color: 'white',
    fontFamily: 'MyriadPro-Bold',
    fontSize: 12
  },
  separatorStyle: {
    height: 15,
    width: "86%",
    backgroundColor: "transparent",
    marginLeft: "14%"
  }
});