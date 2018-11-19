import React, { Component } from "react";
import { StyleSheet, Image, View, Text, FlatList, ActivityIndicator, TouchableHighlight } from "react-native";

import { connect } from "react-redux";

import styles from "../styles/styles"

let playIcon = require('../Resources/ICONS/PLAY.png');

import rnfetchblob from 'react-native-fetch-blob';
import { GoogleSignin } from 'react-native-google-signin'
import YouTubeApi from './YouTubeApi';
import ReactNode from '../ReactNode';

let api = new YouTubeApi();
class PlaylistItem extends Component {

  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return false;
  }

  render() {
    let item = this.props.item;
    console.log(`item.track = ${JSON.stringify(item)}`);
    return (
      <View style={{ flex: 1, width: '100%', flexDirection: 'row', alignContent: 'space-between' }}>
        <Image source={{ uri: item.track.snippet.thumbnails.high.url }} style={{ width: 50, height: 50 }} />
        <View style={{ flex: 1, width: '100%', flexDirection: 'column', justifyContent: 'space-around', paddingLeft: 5 }}>
          <Text style={styles.albumText}>{item.track.snippet.title} </Text>
          <Text style={styles.artistText}>{item.artist} </Text>
        </View>
        <Image source={playIcon} style={styles.titleImage} />
      </View>
    );
  }
}


class _YouTubePlaylistFlatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      duplicates: new Set(),
      offset: 0,
      limit: 50
    };
  }

  async componentDidMount() {
    const user = await GoogleSignin.currentUserAsync()
    this.props.setProviderSession({ name: 'youtube', access_token: user.accessToken, sessionId: '' });
    await this.loadFirstPage();
  }

  loadFirstPage = async () => {
    console.log('YouTubePlaylistFlatList loadFirstPage()');
    this.setState({ data: [], offset: 0, limit: 50, totalNumberOfItems: 1000 }, async () => {
      await this.loadNextPage();
    });
  }

  loadNextPage = async () => {
    const user = await GoogleSignin.currentUserAsync()
    if (this.state.offset == 0 || this.state.offset < this.state.totalNumberOfItems) {
      this.setState({ loading: false });
      let page = await api.playlist(user.accessToken, this.props.playlistRef);
      const tracks = this.extractTracks(page);

      this.setState({
        offset: this.state.offset + this.state.limit,
        totalNumberOfItems: page.totalNumberOfItems, data: [...this.state.data, ...tracks],
        loading: false
      });

      this.props.setTracks([...this.props.tracks, ...tracks]);
    }
  }

  extractTracks = (page) => {
    let tracks = [];

    const index = this.state.data.length;
    for (let i = 0; i < page.items.length; i++) {
      let track = page.items[i];
      console.log('FRED track=' + JSON.stringify(track));
      if (this.state.duplicates.has(track.id)) {
        //console.log(`Ignoring duplicate track.album.id=${track.album.id}`);
        continue;
      }
      //console.log(`Adding track.album.id=${track.album.id}`);
      this.state.duplicates.add(track.id);

      let artistName = `${track.snippet.channelTitle}`;
      tracks.push({
        artist: artistName,
        track: track,
        key: `A${track.id}`
      });
      //console.log(`Adding track.album.id=${track.album.id}`);
    }
    return tracks;
  }

  handleRefresh = async () => {
    await this.loadFirstPage();
  };

  handleLoadMore = async () => {
    await this.loadNextPage();
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
      <TouchableHighlight onPress={() => this.play(index, item.track, item.album)}>
        <PlaylistItem item={item}></PlaylistItem>
      </TouchableHighlight>
    );
  }

  play = async (index, track, album) => {
    console.log(`track to play = ${JSON.stringify(track)}`);
    //console.log(`album to play = ${JSON.stringify(album)}`);

    const videoFile = `${rnfetchblob.fs.dirs.MusicDir}/${vitrack.snippet.resourceId.videoIddeoId}.flac`;
    console.log(`Checkig if file '${videoFile} exists`);
    //let exists = await rnfetchblob.fs.exists(videoFile);
    //if(exists) {
    //let videoUrl = `file:///${videoFile}`;
    let port = await ReactNode.getPortAsync();
    let videoUrl = `http://localhost:${port}/${vitrack.snippet.resourceId.videoIddeoId}`;
    console.log(`videoUrl=${videoUrl}`);
    this.props.navigation.navigate('YouTubePlayerScreen', {
      videoId: track.snippet.resourceId.videoId,
      videoUrl: videoUrl,
      artwork: track.snippet.thumbnails.high.url,
      title: track.snippet.title
    });
    //} else {
    // this.props.navigation.navigate('ReactNode', { videoId: videoId });
    //}
  };

  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={item => item.key}
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        onRefresh={this.handleRefresh}
        refreshing={this.state.refreshing}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={20}
      />
    );
  }
}

const mapStateToProps = state => ({
  tracks: state.tracks,
  sessionId: state.provider.sessionId
})

const mapDispatchToProps = (dispatch) => ({
  setProviderSession: (provider) => {
    dispatch({ type: 'SET_PROVIDER_SESSION', provider: provider });
  },
  playTrack: (index, track, album) => {
    dispatch({ type: 'PLAY_TRACK', index: index, track: track, album: album });
  },
  setTracks: (tracks) => {
    dispatch({ type: 'SET_TRACKS', tracks: tracks });
  }
})

export default YouTubePlaylistFlatList = connect(mapStateToProps, mapDispatchToProps)(_YouTubePlaylistFlatList);