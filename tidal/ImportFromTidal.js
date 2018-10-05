import React, { Component } from 'react';

import { View, Text, TextInput, Image, ImageBackground } from 'react-native';

import { StyleSheet, WebView, Platform } from 'react-native';
import BKD from '../screens/BobBackground'
import ImportFlatList from './ImportFromTidalFlatList'

export default class ImportFromTidal extends Component {
  constructor(props) {
    super(props);
    this.state = { access_token: '', userId: '' };
  }
  
  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.setState({access_token: params.oauth.access_token, userId: params.oauth.user.userId});
    console.log('params=' + JSON.stringify(params));
  }
  
  render() {
      return (
        <BKD title='spotify import'>
        <View style={{
          flex: 1,
          flexDirection: 'column',
        }}>
          <View style={{ flexDirection: 'row', backgroundColor: 'transparent', flex: 1.5 }}>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'transparent', flex: 1, alignItems: 'center' }}>
            <Image source={require('../Resources/3RD_PARTY_LOGOS/SPOTIFY.png')} style={styles.spotify} />
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'transparent', flex: 6, marginLeft:'10%' }}>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'transparent', flex: 1, marginLeft:'10%', alignItems: 'center' }}>
            <Image source={require('../Resources/BOB_LOGOS/BOB_LOGO_ORANGE.png')} style={styles.titleImage} />
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
  loginToBob: { color: 'white', fontFamily: 'Bauhaus 93', fontSize: 20, marginBottom: '10%' },
  login: { color: '#FCB415', fontFamily: 'Bauhaus 93', fontSize: 20, marginBottom: '10%' },
  import: { color: '#FCB415', fontFamily: 'Bauhaus 93', fontSize: 20 },
  spotify: { width: 40, height: 40 * (1065 / 1045), marginLeft:'17%' },
  facebook: { width: 40, height: 40 },
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