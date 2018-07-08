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

    console.log(`accessToken=${this.props.accessToken}`)
    this.state.playlists = await api.playlists(this.props.accessToken);

    let data = []

    for(let i = 0; i < this.state.playlists.length; i++) {
      let item = this.state.playlists[i];

      data.push({
        name: item.title,
        imageUrl: (item.tracks[0]) ? item.tracks[0].artwork_url : '',
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
        this.props.navigation.navigate('SoundCloudPlaylist', { playlist: item.playlist});
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