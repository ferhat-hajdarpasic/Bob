import React, { Component } from 'react';

import { View, Text, TextInput, Image, ImageBackground } from 'react-native';

import { StyleSheet, WebView, Platform } from 'react-native';
import BKD from './BobBackground'
import RecentlyPlayedFlatList from './RecentlyPlayedFlatList'

export default class RecentlyPlayed extends Component {
  constructor(props) {
    super(props);
    this.state = { accessToken: '' };
  }
  render() {
    console.log('props:'+JSON.stringify(this.props));
    const { params } = this.props.navigation.state;
    console.log('params.accessToken:'+params.accessToken);
    this.state.recentlyPlayed = params.recentlyPlayed;
    this.state.accessToken = params.accessToken;
    return (
        <BKD title='recently played'>
        <View style={{
          flex: 1,
          flexDirection: 'column',
        }}>
          <View style={{ flexDirection: 'row', backgroundColor: 'transparent', flex: 1.5 }}>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'transparent', flex: 6, marginLeft:'10%' }}>
            <RecentlyPlayedFlatList accessToken={this.state.accessToken} recentlyPlayed={this.state.recentlyPlayed} navigation={this.props.navigation}/>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'transparent', flex: 1, marginLeft:'10%', alignItems: 'center' }}>
            <Image source={require('./Resources/BOB_LOGOS/BOB_LOGO_ORANGE.png')} style={styles.titleImage} />
            <Text style={styles.titleText}>import all to bob</Text>
          </View>
        </View>
      </BKD>
    );
  }
  componentDidMount() {
  }
}

const styles = StyleSheet.create({
  titleImage: {
    width: 50,
    height: (214 / 241) * 50
  },
  titleText: {
    color: '#FCB415',
    fontFamily: 'Bauhaus 93',
    fontSize: 20,
    padding:5
  }
});