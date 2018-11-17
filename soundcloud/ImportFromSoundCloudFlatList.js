import React, { Component } from "react";
import { StyleSheet, Image, View, Text, FlatList, ActivityIndicator, TouchableHighlight } from "react-native";

import BobFlatList from '../BobFlatList'
import { GoogleSignin } from 'react-native-google-signin'
import SoundCloudApi  from '../api/soundcloud/SoundCloudApi';

let api = new SoundCloudApi();

export default class ImportFromSoundCloudFlatList extends BobFlatList {
  constructor(props) {
    super(props);

  }

  makeRemoteRequest = async () => {
    this.setState({ loading: true });
    this.state.playlists = await api.playlists(this.props.accessToken);

    this.setState({
      data: [
        {
          url: this.state.playlists[0].tracks[0].artwork_url,
          name: 'playlists'
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
            <Image source={require('../Resources/BOB_LOGOS/BOB_LOGO_ORANGE.png')} style={styles.titleImage} />
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  goToNextScreen = (name: string) => {
    console.log('You touched:' + name);
    //this.props.navigation.navigate('player', {});

    console.log('this.props.accessToken:' + this.props.accessToken);
    const accessToken = this.props.accessToken;
    switch(name) {
      case 'playlists':
        this.props.navigation.navigate('SoundCloudPlaylists', { accessToken: accessToken, playlists: this.state.playlists });
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