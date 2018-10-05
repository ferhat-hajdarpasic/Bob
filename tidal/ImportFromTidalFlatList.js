import React, { Component } from "react";
import { StyleSheet, Image, View, Text, FlatList, ActivityIndicator, TouchableHighlight } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

import BobFlatList from '../BobFlatList';
import { TidalApi } from './TidalApi'

export default class ImportFromTidalFlatList extends BobFlatList {
  constructor(props) {
    super(props);

  }

  makeRemoteRequest = async () => {
    this.setState({ loading: true });

    let playlists = await TidalApi.playlists(this.props.userId, this.props.access_token);
    let albums = await TidalApi.albums(this.props.userId, this.props.access_token);
    let tracks = await TidalApi.tracks(this.props.userId, this.props.access_token);
    let artists = await TidalApi.artists(this.props.userId, this.props.access_token);
    //this.state.recentlyPlayed = await api.recentlyPlayed(auth.accessToken);
    //this.state.albums = await api.albums(auth.accessToken);

    this.setState({
      data: [
        {
          image: { uri: `https://resources.tidal.com/images/${playlists.items[0].image.replace(/-/gi, '/')}/160x107.jpg` },
          name: 'playlists'
        },
        {
          image: { uri: `https://resources.tidal.com/images/${albums.items[0].item.cover.replace(/-/gi, '/')}/160x160.jpg` },
          name: 'albums'
        },
        {
          image: { uri: `https://resources.tidal.com/images/${tracks.items[0].item.album.cover.replace(/-/gi, '/')}/160x160.jpg` },
          name: 'tracks'

        },
        {
          image: { uri: `https://resources.tidal.com/images/${artists.items[0].item.picture.replace(/-/gi, '/')}/160x160.jpg` },
          name: 'artists'
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
          <Image source={item.image} style={{ width: 100, height: 100 }} />
          <View style={{ flex: 1, width : '100%', flexDirection: 'column', justifyContent: 'space-around', paddingLeft: 15 }}>
            <Text style={styles.titleText}>{item.name} </Text>
            <Image source={require('../Resources/BOB_LOGOS/BOB_LOGO_ORANGE.png')} style={styles.titleImage} />
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
    switch (name) {
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