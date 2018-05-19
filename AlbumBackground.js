import React, { Component } from 'react';

import { StyleSheet, View, Text, TextInput, Image, ImageBackground } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { ImageColorPicker } from 'react-native-image-color-picker';

//40":0,"_65":2,"_55
class AlbumBackground_ extends Component {
  state = {
    palettes: [],
    loadingPalettes: true
  };
  pickerCallback = message => {
    console.log('FRED='+message);
    if (message && (message.nativeEvent && message.nativeEvent.data || message.promise)) {
      let messageData = JSON.parse(message.nativeEvent && message.nativeEvent.data || message.promise);
      if (messageData.message === 'imageColorPicker' && messageData.payload) {
        const palettes = messageData.payload;
        this.setState({ palettes, loadingPalettes: false });
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
          <LinearGradient
            start={{ x: 0.5, y: 0.0 }} end={{ x: 0.5, y: 0.2 }}
            locations={[0.0, 1.0]}
            colors={['#656263', '#393536']} style={styles.LinearGradientStyle} >
            <ImageBackground source={{uri:'https://i.scdn.co/image/d0b1088e6172acbe186bd7cdb47b099d252261ff'}} style={styles.titleImage} />
          </LinearGradient>
        </View>
        
        <View style={{flex: 1,backgroundColor: 'transparent',justifyContent: 'center'}}>
        <ImageColorPicker
          imageUrl="https://i.scdn.co/image/d0b1088e6172acbe186bd7cdb47b099d252261ff"
          imageWidth="25"
          imageHeight="25"
          pickerCallback={this.pickerCallback}
        />
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
    width: '100%',
    height: '50%',
    //position: 'absolute',
    //top: '5%',
    //left: '10%'
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