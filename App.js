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
import LoginToSpotify from './LoginToSpotify'
import InitialScreen from './InitialScreen'

import ImportFromSpotify from './ImportFromSpotify'
import Playlists from './Playlists'
import RecentlyPlayed from './RecentlyPlayed'
import Albums from './Albums'
import PlayerScreen from "./PlayerScreen.js"
import Album from "./Album.js"

export default StackNavigator(
  {
    //Main: { screen: PlayerScreen },
    Main: { screen: BobLogin },
    LoginToSpotify: {screen: LoginToSpotify },
    InitialScreen: {screen: InitialScreen},        
    ImportFromSpotify: {screen: ImportFromSpotify},
    Playlists: {screen: Playlists},
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