import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Easing,
  Animated,
  // Button,
  ScrollView
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import BobLogin from './BobLogin'
//import LoginToSpotify from './LoginToSpotify'
import InitialScreen from './InitialScreen'

import ImportFromSpotify from './ImportFromSpotify'
import Playlists from './Playlists'
import Playlist from './Playlist'
import RecentlyPlayed from './RecentlyPlayed'
import Albums from './Albums'
import PlayerScreen from "./PlayerScreen.js"
import Album from "./Album.js"
import ReactNode from "./ReactNode.js"
import LoginToYoutube from "./LoginToYoutube.js"
import LoginToSoundCloud from "./LoginToSoundCloud.js"
import LoginToTidal from "./tidal/LoginToTidal.js"

import LandingScreen from './player/screens/LandingScreen';
import TrackPlayerScreen from './player/screens/TrackPlayerScreen';
import AddFavourites from './screens/AddFavourites';
import ImportFromYoutube from './screens/ImportFromYoutube';
import ImportFromSoundCloud from './soundcloud/ImportFromSoundCloud';
import YouTubePlaylists from './screens/YouTubePlaylists';
import SoundCloudPlaylists from './soundcloud/SoundCloudPlaylists';
import YouTubePlaylist from './screens/YouTubePlaylist';
import SoundCloudPlaylist from './soundcloud/SoundCloudPlaylist';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux'
import reducer from './store/reducer';

const store = createStore(reducer);

const BobNavigator =  StackNavigator(
  {
    Main: { screen: AddFavourites },
    TrackPlayerScreen: { screen: TrackPlayerScreen },
    ReactNode: { screen: ReactNode },
    LoginToYoutube: {screen: LoginToYoutube },
    //LoginToSpotify: {screen: LoginToSpotify },
    LoginToSoundCloud: {screen: LoginToSoundCloud },
    LoginToTidal: {screen: LoginToTidal },
    InitialScreen: {screen: InitialScreen},        
    ImportFromSpotify: {screen: ImportFromSpotify},
    ImportFromYoutube: {screen: ImportFromYoutube},
    ImportFromSoundCloud: {screen: ImportFromSoundCloud},
    YouTubePlaylists: {screen: YouTubePlaylists},
    SoundCloudPlaylists: {screen: SoundCloudPlaylists},
    YouTubePlaylist: {screen: YouTubePlaylist},
    SoundCloudPlaylist: {screen: SoundCloudPlaylist},
    Playlists: {screen: Playlists},
    Playlist: {screen: Playlist},
    RecentlyPlayed: {screen: RecentlyPlayed},
    Albums: {screen: Albums},
    Album: {screen: Album},
  	player: { screen:PlayerScreen }
},
  {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),
  }
);

export default class App extends React.Component {
  render() {
    return (
    <Provider store={store}>
      <BobNavigator />
    </Provider>)
  }
}