import React, { Component } from 'react';

import { View, Text, TextInput, Image, ImageBackground } from 'react-native';

import { StyleSheet, WebView, Platform } from 'react-native';
import BKD from './BobBackground'
import accounting from 'accounting';

export default class BobLogin extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }
  render() {
    console.log('FRED=' + accounting.formatMoney(455678.678));
    let redirect_url = 'about:blank';
    let client_id = '6a878d3c8b854a1387d2bcbe4c665cea';
    return (
      <BKD title='bob'>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={styles.loginToBob}>login to bob</Text>
          <TextInput placeholder="Enter Your Username" underlineColorAndroid='transparent' style={styles.username} onChangeText={(username) => this.setState({ username })} value={this.state.username} />
          <TextInput placeholder="Enter Your Password" secureTextEntry={true} underlineColorAndroid='transparent' style={styles.password} onChangeText={(password) => this.setState({ password })} value={this.state.password} />
          <View style={{ flexDirection: 'row', marginBottom: '10%'  }}>
            <Image source={require('./Resources/3RD_PARTY_LOGOS/GOOGLE.png')} style={styles.google} />
            <Image source={require('./Resources/3RD_PARTY_LOGOS/FB.png')} style={styles.facebook} />
          </View>
          <Text style={styles.login} onPress={() => this.props.navigation.navigate('InitialScreen', { name: 'Jane' })}>login</Text>
          <Text style={styles.joinBob}>join bob</Text>
        </View>
      </BKD>
    );
  }
}

const styles = StyleSheet.create({
  username: {backgroundColor: 'white', color: '#393536', textAlign: 'center', fontSize:20, fontFamily: 'Bauhaus 93', width: '80%', borderRadius: 50, marginBottom: '10%' },
  password: {backgroundColor: 'white', color: '#393536', textAlign: 'center', fontSize:20, fontFamily: 'Bauhaus 93', width: '80%', borderRadius: 50, marginBottom: '10%' },
  loginToBob: {color: 'white', fontFamily: 'Bauhaus 93', fontSize:20, marginBottom: '10%'},
  login: {color: '#FCB415', fontFamily: 'Bauhaus 93', fontSize:20, marginBottom: '10%'},
  joinBob: {color: '#FCB415', fontFamily: 'Bauhaus 93', fontSize:20},
  google: {width: 40, height: 40*(1065/1045), marginRight: '10%'},
  facebook: {width: 40, height: 40 }
});