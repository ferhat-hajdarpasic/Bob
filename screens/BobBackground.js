import React, { Component } from 'react';

import { StyleSheet, View, Text, TextInput, Image, ImageBackground } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

class Background extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', }}>
          <LinearGradient
            start={{ x: 0.5, y: 0.0 }} end={{ x: 0.5, y: 0.2 }}
            locations={[0.0, 1.0]}
            colors={['#656263', '#393536']} style={styles.LinearGradientStyle} >
            <Text style={styles.titleText}>{this.props.title}</Text>
            <ImageBackground source={require('../Resources/BOB_LOGOS/BOB_LOGO_ORANGE.png')} style={styles.titleImage} />
            <ImageBackground source={require('../Resources/BOB_LOGOS/BOB_LOGO_K50.png')} style={styles.image} />
          </LinearGradient>
        </View>
        <View style={{flex: 1,backgroundColor: 'transparent',justifyContent: 'center'}}>
          {this.props.children}
        </View>
      </View>
    );
  }
}
export default class BobBackground extends Component {
  render() {
    return (
      <Background title={this.props.title}>
        {this.props.children}
      </Background>
    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'

  },

  LinearGradientStyle: {
    borderRadius: 0,
    height: '100%',
    width: '100%'
  },

  ChildViewStyle: {

    borderWidth: 0,
    borderColor: '#028b53',
    width: '100%',
    height: 50,
    borderRadius: 10,

  },

  TextInputStyleClass: {

    textAlign: 'center',
    height: 50,
    width: '90%'

  },
  image: {
    width: 220,
    height: (214 / 241) * 220,
    position: 'absolute',
    bottom: '15%',
    left: '55%',
    //borderColor:'black',
    //borderWidth:1
  },
  titleImage: {
    width: 50,
    height: (214 / 241) * 50,
    position: 'absolute',
    top: '5%',
    left: '10%'
  },
  titleText: {
    color: 'white',
    fontFamily: 'Bauhaus 93',
    fontSize:20,
    position: 'absolute',
    top: '7%',
    left: '26%'
  }
  

});