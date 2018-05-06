import React, { Component } from "react";
import { StyleSheet, Image, View, Text, FlatList, ActivityIndicator, TouchableHighlight } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

import BobFlatList from './BobFlatList'
import SpotifyApi from './SpotifyApi'
let api = new SpotifyApi();

export default class PlaylistsFlatList extends BobFlatList {
  constructor(props) {
    super(props);
    
  }

  makeRemoteRequest = async () => {
    const code = this.props.code;

    this.setState({ loading: true });

    let playlists = await api.playlists(code);

    let data = []

    for(let i = 0; i < playlists.items.length; i++) {
      let item = playlists.items[i];
      console.log('FRED ITEM='+JSON.stringify(item.images));

      data.push({
        name: item.name,
        url: item.images.length > 0 ? item.images[0].url : ''
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
          <Image source={{uri: item.url}} style={{width:100, height:100}}/>
          <View style={{flex:1, width :'100%', flexDirection: 'column', justifyContent:'space-around', paddingLeft:20}}>
            <Text style={styles.albumText}>{item.name} </Text>
            <Text style={styles.artistText}>spotify</Text>
            <Image source={require('./Resources/BOB_LOGOS/BOB_LOGO_ORANGE.png')} style={styles.titleImage} />
          </View>
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