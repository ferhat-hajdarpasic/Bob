import React, { Component } from "react";
import { StyleSheet, Image, View, Text, FlatList, ActivityIndicator, TouchableHighlight } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

import SpotifyHelper from "./SpotifyHelper";
import { connect } from "react-redux";

class TidalPlaylistsItem extends Component {

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
        <Image source={item.image} style={{width:100, height:100}}/>
        <View style={{flex:1, width :'100%', flexDirection: 'column', justifyContent:'space-around', paddingLeft:20}}>
          <Text style={styles.albumText}>{item.name} </Text>
          <Text style={styles.artistText}>spotify</Text>
          <Image source={require('./Resources/BOB_LOGOS/BOB_LOGO_ORANGE.png')} style={styles.titleImage} />
        </View>
      </View>
    );
  }
}


class _TidalPlaylistsFlatList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      duplicates: new Set(),
      next: null
    };
  }

  async componentDidMount() {
    await this.loadFirstPage();
  }

  loadFirstPage = async () => {
    console.log('TidalPlaylistsFlatList loadFirstPage()');
    this.setState({ data: [], next: 'https://api.spotify.com/v1/me/playlists'}, async () => {
      await this.loadNextPage();  
    });
  }

  loadNextPage = async () => {
    if(this.state.next) {
      console.log(`this.state.next = ${this.state.next}`);
      this.setState({loading: false});
      let page = await api.next(this.props.userId, this.props.access_token, this.state.next);
      const playlists = this.extractPlaylists(page);

      this.setState({
        next: page.next,
        data: [...this.state.data, ...playlists],
        loading: false
      });
    }
  } 
  
  extractPlaylists = (page) => {
    let playlists = [];

    const index = this.state.data.length;
    for(let i = 0; i < page.items.length; i++) {
      let item = page.items[i];
      if(this.state.duplicates.has(item.id)) {
        console.log(`Ignoring duplicate playlist id = ${item.id}`);
        continue;
      }
      this.state.duplicates.add(item.id);
      console.log(`Added playlist id = ${item.id}`);

      playlists.push({
        id: item.id,
        name: item.name,
        image: item.images.length > 0 ? SpotifyHelper.uriImageSource(item.images[0].url) : SpotifyHelper.emptyPlaylistImage(),
        playlistHref: item.href
      });
    }
    return playlists;
  }

  handleRefresh = async () => {
    console.log('handleRefresh()');
    await this.loadFirstPage();
  };

  handleLoadMore = async () => {
    console.log('handleLoadMore()');
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
      <TouchableHighlight onPress={() => this.play(item)}>
        <TidalPlaylistsItem item={item}></TidalPlaylistsItem>
      </TouchableHighlight>
    );
  }

  play = (item) => {
    console.log('item=' + JSON.stringify(item));
    this.props.clearTracks();
    this.props.navigation.navigate('Playlist', { href: item.playlistHref, name: item.name });
  }

  render() {
    return (
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
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
})
  
const mapDispatchToProps = (dispatch) => ({
  clearTracks: () => { 
    dispatch({ type: 'CLEAR_TRACKS' });
  }
})
  
export default TidalPlaylistsFlatList = connect(mapStateToProps, mapDispatchToProps)(_TidalPlaylistsFlatList);
  
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