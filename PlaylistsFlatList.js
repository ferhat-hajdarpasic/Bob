import React, { Component } from "react";
import { StyleSheet, Image, View, Text, FlatList, ActivityIndicator, TouchableHighlight } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

import BobFlatList from './BobFlatList'
import SpotifyApi from './SpotifyApi'
import Spotify from 'rn-spotify-sdk';
import SpotifyHelper from "./SpotifyHelper";
import { connect } from "react-redux";

let api = new SpotifyApi();

class _PlaylistsFlatList extends BobFlatList {
  constructor(props) {
    super(props);
    
  }

  makeRemoteRequest = async () => {
    this.setState({ loading: true });

    //let auth = Spotify.getAuth();
    //let playlists = await api.playlists(auth.accessToken);
    let playlists = this.props.playlists;

    let data = []

    for(let i = 0; i < playlists.items.length; i++) {
      let item = playlists.items[i];

      data.push({
        name: item.name,
        image: item.images.length > 0 ? SpotifyHelper.uriImageSource(item.images[0].url) : SpotifyHelper.emptyPlaylistImage(),
        playlistHref: item.href
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
          <Image source={item.image} style={{width:100, height:100}}/>
          <View style={{flex:1, width :'100%', flexDirection: 'column', justifyContent:'space-around', paddingLeft:20}}>
            <Text style={styles.albumText}>{item.name} </Text>
            <Text style={styles.artistText}>spotify</Text>
            <Image source={require('./Resources/BOB_LOGOS/BOB_LOGO_ORANGE.png')} style={styles.titleImage} />
          </View>
        </View>
        </TouchableHighlight>
      );
      }
  
      play = (item) => {
        console.log('item=' + JSON.stringify(item));
        this.props.clearTracks();
        this.props.navigation.navigate('Playlist', { href: item.playlistHref, name: item.name });
      };
  }
  
  const mapStateToProps = state => ({
  })
  
  const mapDispatchToProps = (dispatch) => ({
    clearTracks: () => { 
      dispatch({ type: 'CLEAR_TRACKS' });
    }
  })
  
  export default PlaylistsFlatList = connect(mapStateToProps, mapDispatchToProps)(_PlaylistsFlatList);
  
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