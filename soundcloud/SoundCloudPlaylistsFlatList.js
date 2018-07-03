import React, { Component } from "react";
import { StyleSheet, Image, View, Text, FlatList, ActivityIndicator, TouchableHighlight } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import BobFlatList from '../BobFlatList'

import { GoogleSignin } from 'react-native-google-signin'
import SoundCloudApi  from '../api/soundcloud/SoundCloudApi';

let api = new SoundCloudApi();

export default class PlaylistsFlatList extends BobFlatList {
  constructor(props) {
    super(props);
    
  }

  makeRemoteRequest = async () => {
    this.setState({ loading: true });
    const user = await GoogleSignin.currentUserAsync()

    let playlists = await api.playlists(user.accessToken);

    let data = []

    for(let i = 0; i < playlists.items.length; i++) {
      let item = playlists.items[i];

      data.push({
        name: item.snippet.title,
        imageUrl: item.snippet.thumbnails.high.url,
        playlistId: item.id
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
          <Image source={{uri: item.imageUrl}} style={{width:100, height:100}}/>
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
        this.props.navigation.navigate('SoundCloudPlaylist', { playlistId: item.playlistId, name: item.name });
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