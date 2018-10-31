import React, { Component } from "react";
import { StyleSheet, Image, View, Text, FlatList, ActivityIndicator, TouchableHighlight } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

import rnfetchblob from 'react-native-fetch-blob';

import BobFlatList from '../BobFlatList';
import { GoogleSignin } from 'react-native-google-signin'
import SoundCloudApi  from '../api/soundcloud/SoundCloudApi';
import ReactNode from '../ReactNode';

let api = new SoundCloudApi();

export default class SoundCloudPlaylistFlatList extends BobFlatList {
  constructor(props) {
    super(props);
    
  }

  makeRemoteRequest() {
    let playlist = this.props.playlist;
    let tracks = [];

    console.log('FREDdy track=');
    console.log('FREDdy track='+JSON.stringify(playlist));
    console.log('FREDdy track=');
    for(let i = 0; i < playlist.tracks.length; i++) {
      let track = playlist.tracks[i];
      //console.log('FRED track='+JSON.stringify(track));
      tracks.push({
        artist: track.label_name,
        title: track.title,
        streamUrl: track.stream_url,
        artwork: track.artwork_url
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
      <TouchableHighlight onPress={() => this.play(item.streamUrl, item.artwork, item.title)}>
      <View style={{flex:1, width :'100%', flexDirection: 'row', alignContent:'space-between'}}>
        <Image source={{uri: item.artwork}} style={{width:50, height:50}}/>
        <View style={{flex:1, width :'100%', flexDirection: 'column', justifyContent:'space-around', paddingLeft:5}}>
          <Text style={styles.albumText}>{item.title} </Text>
          <Text style={styles.artistText}>{item.artist} </Text>
        </View>
        <Image source={require('../Resources/ICONS/PLAY.png')} style={styles.titleImage} />
      </View>
      </TouchableHighlight>
    );
    }

    play = async (streamUrl, artwork, title) => {
        console.log(`streamUrl=${streamUrl}`);
        this.props.navigation.navigate('TrackPlayerScreen', { 
          streamUrl: `${streamUrl}?client_id=z8LRYFPM4UK5MMLaBe9vixfph5kqNA25&oauth_token=1-178930-450627837-740f6f923d451`, 
          artwork: artwork, 
          title: title
        });
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