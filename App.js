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
import ImportFromTidal from "./tidal/ImportFromTidal.js"

import LandingScreen from './player/screens/LandingScreen';
import TidalPlayerScreen from './tidal/TidalPlayerScreen';
import YouTubePlayerScreen from './youtube/YouTubePlayerScreen';
import SoundCloudPlayerScreen from './soundcloud/SoundCloudPlayerScreen';
import AddFavourites from './screens/AddFavourites';
import BobLogin from './screens/BobLogin';
import ImportFromYoutube from './youtube/ImportFromYoutube';
import ImportFromSoundCloud from './soundcloud/ImportFromSoundCloud';
import YouTubePlaylists from './youtube/YouTubePlaylists';
import SoundCloudPlaylists from './soundcloud/SoundCloudPlaylists';
import YouTubePlaylist from './youtube/YouTubePlaylist';
import PlaylistScreen from './screens/PlaylistScreen';
import JoinBob from './screens/JoinBob';
import TidalPlaylists from './tidal/TidalPlaylists';
import TidalPlaylist from './tidal/TidalPlaylist';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux'
import reducer from './store/reducer';

import { AccessToken } from 'react-native-fbsdk';

const store = createStore(reducer);
const routeConfigMap = {
    Main: { screen: BobLogin },
    TidalPlayerScreen: { screen: TidalPlayerScreen },
    AddFavourites: { screen: AddFavourites },
    YouTubePlayerScreen: { screen: YouTubePlayerScreen },
    SoundCloudPlayerScreen: { screen: SoundCloudPlayerScreen },
    ReactNode: { screen: ReactNode },
    JoinBob: { screen: JoinBob },
    LoginToYoutube: { screen: LoginToYoutube },
    //LoginToSpotify: {screen: LoginToSpotify },
    LoginToSoundCloud: { screen: LoginToSoundCloud },
    LoginToTidal: { screen: LoginToTidal },
    InitialScreen: { screen: InitialScreen },
    ImportFromSpotify: { screen: ImportFromSpotify },
    ImportFromTidal: { screen: ImportFromTidal },
    ImportFromYoutube: { screen: ImportFromYoutube },
    ImportFromSoundCloud: { screen: ImportFromSoundCloud },
    YouTubePlaylists: { screen: YouTubePlaylists },
    SoundCloudPlaylists: { screen: SoundCloudPlaylists },
    YouTubePlaylist: { screen: YouTubePlaylist },
    PlaylistScreen: { screen: PlaylistScreen },
    TidalPlaylists: { screen: TidalPlaylists },
    TidalPlaylist: { screen: TidalPlaylist },
    Playlists: { screen: Playlists },
    Playlist: { screen: Playlist },
    RecentlyPlayed: { screen: RecentlyPlayed },
    Albums: { screen: Albums },
    Album: { screen: Album },
    player: { screen: PlayerScreen }
};

const stackConfig = {
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
};

(async () => {
    let facebook = await AccessToken.getCurrentAccessToken();
    console.log('facebook=' + JSON.stringify(facebook));
    routeConfigMap.Main.screen = AddFavourites;
})();

const BobNavigator = StackNavigator(routeConfigMap, stackConfig);
export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <BobNavigator />
            </Provider>)
    }
}