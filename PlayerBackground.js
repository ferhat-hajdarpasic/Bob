import React, { Component } from 'react';

import { StyleSheet, View, Text, TextInput, Image, ImageBackground, Dimensions } from 'react-native';

class PlayerBackground_ extends Component {
  render() {
    let albumImageUri = (this.props.track.album) ? this.props.track.album.images[0].url : this.props.album.images[0].url;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', }}>
          <ImageBackground source={{ uri: albumImageUri }} style={styles.imageTop} />
          <View style={{ height: '50%', overflow:'hidden', borderColor:'transparent', borderWidth:0}}>
            <ImageBackground source={{ uri: albumImageUri }} style={styles.imageBottom} blurRadius={3}/>
          </View>
        </View>
        <View style={{flex: 1,backgroundColor: 'transparent',justifyContent: 'center'}}>
          {this.props.children}
        </View>
      </View>
    );
  }
}
export default class PlayerBackground extends Component {
  render() {
    return (
      <PlayerBackground_ track={this.props.track} album={this.props.album}>
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
  imageTop: {
    width: '100%',
    height: '50%'
  },
  imageBottom: {
    width: '100%',
    height: '100%',
    //crop: {left: 10, top: 50, width: 20, height: 40},
    transform: [
    //  { perspective: 850 },
      //{ translateY: 1.5*(Dimensions.get('window').height/2) - Dimensions.get('window').height/2 },
      { rotateX: '180deg'},
      { scaleX: 1.5},
      { scaleY: 1.5}
    ]
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