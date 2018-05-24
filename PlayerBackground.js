import React, { Component } from 'react';

import { StyleSheet, View, Text, TextInput, Image, ImageBackground } from 'react-native';
import { BlurView } from 'react-native-blur';

class PlayerBackground_ extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', }}>
            <ImageBackground source={{ uri: this.props.track.album.images[0].url }} style={styles.titleImage} />
        </View>

        <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center' }}>
           {this.props.children}
        </View>
      </View>
    );
  }
}
export default class PlayerBackground extends Component {
  render() {
    return (
      <PlayerBackground_ track={this.props.track}>
        {this.props.children}
      </PlayerBackground_>
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
    width: '100%',
    opacity:0.99
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
    width: '100%',
    height: '50%',
    //position: 'absolute',
    //top: '5%',
    //left: '10%'
  },
  titleText: {
    color: 'white',
    fontFamily: 'Bauhaus 93',
    fontSize: 20,
    position: 'absolute',
    top: '7%',
    left: '26%'
  }


});