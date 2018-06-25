import React, { Component } from "react";
import { StyleSheet, Image, View, Text, FlatList, ActivityIndicator, TouchableHighlight } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

import rnfetchblob from 'react-native-fetch-blob';

import BobFlatList from '../BobFlatList';
import { GoogleSignin } from 'react-native-google-signin'
import YouTubeApi  from '../api/youtube/YouTubeApi';
let api = new YouTubeApi();

export default class YouTubePlaylistFlatList extends BobFlatList {
  constructor(props) {
    super(props);
    
  }

  async makeRemoteRequest() {
    const user = await GoogleSignin.currentUserAsync()
    let playlist = await api.playlist(user.accessToken, this.props.playlistId);
    let videos = [];

    for(let i = 0; i < playlist.items.length; i++) {
      let video = playlist.items[i];
      console.log('FRED track='+JSON.stringify(video));
      let artistName = `${video.snippet.resourceId.videoId}`;
      videos.push({
        artist: artistName,
        title: video.snippet.title,
        videoId: video.snippet.resourceId.videoId,
        artwork: video.snippet.thumbnails.high.url
      });
    }

    this.setState({
      data: videos,
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
      <TouchableHighlight onPress={() => this.play(item.videoId, item.artwork, item.title)}>
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

    play = async (videoId, artwork, title) => {
      const videoFile = `${rnfetchblob.fs.dirs.MusicDir}/${videoId}.flac`;
      console.log(`Checkig if file '${videoFile} exists`);
      let exists = await rnfetchblob.fs.exists(videoFile);
      if(exists) {
        let videoUrl = `file:///${videoFile}`;
        this.props.navigation.navigate('TrackPlayerScreen', { videoUrl: videoUrl, artwork: artwork, title: title });
      } else {
        this.props.navigation.navigate('ReactNode', { videoId: videoId });
      }
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