import React, { Component } from 'react';

import { StyleSheet, View, Text, TextInput, Image, ImageBackground } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { ImageColorPicker } from 'react-native-image-color-picker';

//40":0,"_65":2,"_55
/*
rgba(136,112,56,1)
rgba(176,176,144,1)
rgba(200,176,104,1)
rgba(232,208,152,1)
rgba(160,144,88,1)
rgba(216,200,136,1)
rgba(248,232,192,1)
rgba(104,88,48,1)
rgba(128,136,136,1)
rgba(64,48,8,1)
rgba(80,80,48,1)
rgba(48,56,40,1)
rgba(120,120,112,1)
rgba(112,128,136,1)
*/
class AlbumBackground_ extends Component {
  state = {
    palettes: [],
    loadingPalettes: true,
    dominantColor: 'blue'
  };
  pickerCallback = message => {
    console.log('FRED=' + message);
    if (message && (message.nativeEvent && message.nativeEvent.data || message.promise)) {
      let messageData = JSON.parse(message.nativeEvent && message.nativeEvent.data || message.promise);
      if (messageData.message === 'imageColorPicker' && messageData.payload) {
        const palettes = messageData.payload;
        this.setState({ palettes, loadingPalettes: false, dominantColor: `rgba(${Object.values(palettes[4])})`});
        palettes.map(palette => {
          console.log(`backgroundColor: rgba(${Object.values(palette).join(',')})`);
        });        
      }
    }
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', }}>
        <ImageBackground source={{ uri: 'https://i.scdn.co/image/4862a7168866cfd07a288e110f034381a2258035' }} style={styles.titleImage} />
          <ImageColorPicker
            imageUrl="https://i.scdn.co/image/4862a7168866cfd07a288e110f034381a2258035"
            imageWidth="25"
            imageHeight="25"
            pickerCallback={this.pickerCallback}
          />
        </View>

        <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center' }}>
        <LinearGradient
            start={{ x: 0.5, y: 0.0 }} end={{ x: 0.5, y: 0.5 }}
            locations={[0.0, 1.0]}
            colors={['transparent', this.state.dominantColor]} style={styles.LinearGradientStyle} >
             {this.props.children}
          </LinearGradient>
        </View>
      </View>
    );
  }
}
export default class BobBackgAlbumBackground extends Component {
  render() {
    return (
      <AlbumBackground_ title={this.props.title}>
        {this.props.children}
      </AlbumBackground_>
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