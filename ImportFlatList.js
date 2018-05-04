import React, { Component } from "react";
import { StyleSheet, Image, View, Text, FlatList, ActivityIndicator } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import SpotifyApi from './SpotifyApi'
let api = new SpotifyApi();

class ImportFlatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = async () => {
    const code = this.props.code;
    console.log('CODE=' + code);

    this.setState({ loading: true });

    let playlists = await api.playlists(code);
    console.log('playlists');

    let recentlyPlayed = await api.recentlyPlayed(code);
    console.log('recentlyPlayed');

    let albums = await api.albums(code);
    console.log('albums = ' + JSON.stringify(albums));


    this.setState({
      data: [
        {
          url: recentlyPlayed.items[0].track.album.images[0].url,
          name: 'recently played'
        },
        {
          url: playlists.items[0].images[0].url,
          name: 'playlists'
        },
        {
          url: albums.items[0].album.images[0].url,
          name: 'albums'
        }
      ],
      loading: false,
      refreshing: false
    });
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 15,
          width: "86%",
          backgroundColor: "transparent",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,

        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={({ item }) => (
            <View style={{flex:1, width :'100%', flexDirection: 'row', alignContent:'space-between'}}>
              <Image source={{uri: item.url}} style={{width:100, height:100}}/>
              <View style={{flex:1, width :'100%', flexDirection: 'column', justifyContent:'space-around', paddingLeft:15}}>
                <Text style={styles.titleText}>{item.name} </Text>
                <Image source={require('./Resources/BOB_LOGOS/BOB_LOGO_ORANGE.png')} style={styles.titleImage} />
              </View>
            </View>
        )}
        keyExtractor={item => item.email}
        ItemSeparatorComponent={this.renderSeparator}
        //ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        onRefresh={this.handleRefresh}
        refreshing={this.state.refreshing}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={50}
      />
    );
  }
}

const styles = StyleSheet.create({
  titleImage: {
    width: 50,
    height: (214 / 241) * 50
  },
  titleText: {
    color: 'white',
    fontFamily: 'MyriadPro-Bold',
    
    fontSize: 16
  }
});

export default ImportFlatList;