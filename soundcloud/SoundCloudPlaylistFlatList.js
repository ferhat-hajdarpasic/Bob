import React, { Component } from "react";
import SpotifyHelper from "../SpotifyHelper";
import { StyleSheet, Image, View, Text, FlatList, ActivityIndicator, TouchableHighlight } from "react-native"
import { connect } from "react-redux";
import styles from "../styles/styles"
let playIcon = require('../Resources/ICONS/PLAY.png');

class PlaylistItem extends Component {

  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return false;
  }

  render() {
    let item = this.props.item;
    console.log(`item = ${JSON.stringify(item)}`);
    return (
      <View style={{ flex: 1, width: '100%', flexDirection: 'row', alignContent: 'space-between' }}>
        <Image source={SpotifyHelper.uriImageSource(item.track.artwork_url)} style={{ width: 50, height: 50 }} />
        <View style={{ flex: 1, width: '100%', flexDirection: 'column', justifyContent: 'space-around', paddingLeft: 5 }}>
          <Text style={styles.albumText}>{item.track.label_name} </Text>
          <Text style={styles.artistText}>{item.title} </Text>
        </View>
        <Image source={playIcon} style={styles.titleImage} />
      </View>
    );
  }
}

class _SoundCloudPlaylistFlatList extends Component {
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
    //let sessionId = (await TidalApi.sessions(this.props.access_token)).sessionId;
    this.props.setProviderSession({name: 'soundcloud', access_token :this.props.access_token });
    await this.loadFirstPage();
  }

  loadFirstPage = async () => {
    console.log('SoundCloudPlaylistFlatList loadFirstPage()');
    this.setState({ data: [], offset: 0, limit: 50, totalNumberOfItems: 1000 }, async () => {
      await this.loadNextPage();
    });
  }

  loadNextPage = async () => {
    if (this.state.offset == 0 || this.state.offset < this.state.totalNumberOfItems) {
      this.setState({ loading: false });
      let playlist = this.props.playlist;
      const tracks = this.extractTracks(playlist);

      this.setState({
        offset: this.state.offset + this.state.limit,
        totalNumberOfItems: playlist.totalNumberOfItems,data: [...this.state.data, ...tracks],
        loading: false
      });

      this.props.setTracks([...this.props.tracks, ...tracks]);
    }
  }

  extractTracks = (playlist) => {
    let tracks = [];
    for(let i = 0; i < playlist.tracks.length; i++) {
      let track = playlist.tracks[i];
      if (this.state.duplicates.has(track.id)) {
        continue;
      }
      this.state.duplicates.add(track.id);
      //console.log('FRED track='+JSON.stringify(track));
      tracks.push({
        artist: track.label_name,
        track: track,
        title: track.title,
        streamUrl: track.stream_url,
        artwork: track.artwork_url,
        key: `A${track.id}`
      });
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
    this.props.playTrack(index, track, album);
    this.props.navigation.navigate('SoundCloudPlayerScreen', { });  
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

export default SoundCloudPlaylistFlatList = connect(mapStateToProps, mapDispatchToProps)(_SoundCloudPlaylistFlatList);