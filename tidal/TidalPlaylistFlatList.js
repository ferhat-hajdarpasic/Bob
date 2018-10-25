import React, { Component, PureComponent } from "react";
import { StyleSheet, Image, View, Text, FlatList, ActivityIndicator, TouchableHighlight } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

import { TidalApi } from './TidalApi'
import SpotifyHelper from "../SpotifyHelper";
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
    return (
      <View style={{flex:1, width :'100%', flexDirection: 'row', alignContent:'space-between'}}>
        <Image source={SpotifyHelper.albumImageSource(item.album)} style={{width:50, height:50}}/>
        <View style={{flex:1, width :'100%', flexDirection: 'column', justifyContent:'space-around', paddingLeft:5}}>
          <Text style={styles.albumText}>{item.track.name} </Text>
          <Text style={styles.artistText}>{item.artist} </Text>
        </View>
        <Image source={playIcon} style={styles.titleImage} />
      </View>
    );
  }
}

class _TidalPlaylistFlatList extends Component {
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
    await this.loadFirstPage();
  }

  loadFirstPage = async () => {
    console.log('TidalPlaylistFlatList loadFirstPage()');
    this.setState({ data: [], offset: 0, limit: 50}, async () => {
      await this.loadNextPage();  
    });
  }

  loadNextPage = async () => {
    let next = `${TidalApi.api_url}/playlists/${this.props.playlistHref}/items?offset=${this.state.offset}&limit=${this.state.limit}&order=INDEX&orderDirection=ASC&countryCode=AU`;
    console.log(`next playlist = ${next}`);
    if(this.state.next) {
      this.setState({loading: false});
      let page = await TidalApi.next(this.props.access_token, next);
      const tracks = this.extractTracks(page);

      this.setState({
        offset: this.state.offset + this.state.limit,
        data: [...this.state.data, ...tracks],
        loading: false
      });

      this.props.setTracks([...this.props.tracks, ...tracks]);
    }
  }

  extractTracks = (playlist) => {
    let tracks = [];

    const index = this.state.data.length;
    for(let i = 0; i < playlist.items.length; i++) {
      let track = playlist.items[i].track;
      if(this.state.duplicates.has(track.album.id)) {
        //console.log(`Ignoring duplicate track.album.id=${track.album.id}`);
        continue;
      }
      //console.log(`Adding track.album.id=${track.album.id}`);
      this.state.duplicates.add(track.album.id);
      let artists = [];

      for(let j = 0; j < track.artists.length; j++) {
        artists.push(track.artists[j].name);
      }
      let artistName = artists.join(' and ');

      tracks.push({
        artist: `${index + i}` + artistName,
        track: track,
        album: track.album,
        key: track.album.id
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

  renderItem = ( {item, index} ) => {
    return (
      <TouchableHighlight onPress={() => this.play(index, item.track, item.album)}>
        <PlaylistItem item={item}></PlaylistItem>
      </TouchableHighlight>
    );
  }

  play = (index, track, album) => {
    this.props.playTrack(index, track, album);
    this.props.navigation.navigate('player', { });
  };

  render() {
    return (
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.album.id}
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
  tracks: state.tracks
})

const mapDispatchToProps = (dispatch) => ({
	playTrack: (index, track, album) => { 
	  dispatch({ type: 'PLAY_TRACK', index: index, track: track, album: album });
	},
	setTracks: (tracks) => { 
	  dispatch({ type: 'SET_TRACKS', tracks: tracks });
	}
})

export default TidalPlaylistFlatList = connect(mapStateToProps, mapDispatchToProps)(_TidalPlaylistFlatList);