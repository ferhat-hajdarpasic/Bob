import React, { Component } from "react";
import { StyleSheet, Image, View, Text, FlatList, ActivityIndicator, TouchableHighlight } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

import BobFlatList from './BobFlatList'
import SpotifyApi from './SpotifyApi'
import Spotify from 'rn-spotify-sdk';

let api = new SpotifyApi();

export default class ImportFlatList extends BobFlatList {
  constructor(props) {
    super(props);

  }
  async componentDidMount() {
  }
  makeRemoteRequest = async () => {
    let result = await Spotify.getMe();
    console.log("GETTING freaking *****result=" + JSON.stringify(result));
    let auth = Spotify.getAuth();

    console.log("FREDDY : auth=" + JSON.stringify(auth));
    console.log("FREDDY : auth.accessToken=" + auth.accessToken);
    this.setState({ spotifyUserName: result.display_name });

    this.setState({ loading: true });

    this.state.accessToken = auth.accessToken;
    this.state.playlists = await api.playlists(auth.accessToken);
    this.state.recentlyPlayed = await api.recentlyPlayed(auth.accessToken);
    this.state.albums = await api.albums(auth.accessToken);

    this.setState({
      data: [
        {
          url: this.state.recentlyPlayed.items[0].track.album.images[0].url,
          name: 'recently played'
        },
        {
          url: this.state.playlists.items[0].images[0].url,
          name: 'playlists'
        },
        {
          url: this.state.albums.items[0].album.images[0].url,
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

  renderItem = ({ item, index }) => {
    return (
      <TouchableHighlight onPress={() => this.goToNextScreen(item.name)}>
        <View style={{ flex: 1, width : '100%', flexDirection: 'row', alignContent: 'space-between' }}>
          <Image source={{ uri: item.url }} style={{ width: 100, height: 100 }} />
          <View style={{ flex: 1, width : '100%', flexDirection: 'column', justifyContent: 'space-around', paddingLeft: 15 }}>
            <Text style={styles.titleText}>{item.name} </Text>
            <Image source={require('./Resources/BOB_LOGOS/BOB_LOGO_ORANGE.png')} style={styles.titleImage} />
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  goToNextScreen = (name: string) => {
    console.log('You touched:' + name);
    //this.props.navigation.navigate('player', {});

    console.log('this.state.accessToken:' + this.state.accessToken);
    const accessToken = this.state.accessToken;
    switch(name) {
      case 'albums':
        this.props.navigation.navigate('Albums', { accessToken: accessToken, albums: this.state.albums });
        break;
      case 'playlists':
        this.props.navigation.navigate('Playlists', { accessToken: accessToken, playlists: this.state.playlists });
        break;
      case 'recently played':
        this.props.navigation.navigate('RecentlyPlayed', { accessToken: accessToken, recentlyPlayed: this.state.recentlyPlayed });
        break;
    }
  };
}

const styles = StyleSheet.create({
  titleImage: {
    width: 50,
    height: (214 / 241) * 50
  },
  titleText: {
    color: 'white',
    fontFamily: 'Myriad Pro Bold',

    fontSize: 16
  },
  separatorStyle: {
    height: 15,
    width: "86%",
    backgroundColor: "transparent",
    marginLeft: "14%"
  }
});