import React, { Component } from 'react';

import { View, Text, TextInput, Image, StyleSheet, TouchableHighlight, Slider, ActivityIndicator } from 'react-native';
import nodejs from 'nodejs-mobile-react-native';
import rnfetchblob from 'react-native-fetch-blob';
import BKD from './screens/BobBackground'

export default class ReactNode extends Component {
  static port;
  static getPortAsync = () => {
    return new Promise((resolve, reject) => {
      if(!ReactNode.port) {
        console.log('Starting nodejs...');
        nodejs.start('main.js');
        nodejs.channel.addListener(
          'message',
          (msg) => {
            const message = JSON.parse(msg);
            if(message.port) {
              console.log(`Got port ${message.port}`);
              ReactNode.port = message.port;
              resolve(ReactNode.port);
            }
          },
          this 
        );
      } else {
        console.log('Port already set ...');
        resolve(ReactNode.port);
      }
    });
  }
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {
      message: 'React NodeJs',
      videoId: params.videoId,
      title: params.title,
      percentage: 0,
      transferred: 0,
      speed: 0,
      downloading: false,
      image: require('./Resources/ICONS/DOWNLOAD_AVAILABLE.png')
    };
  }
  download() {
    if(this.state.downloading) {
      return;
    }
    console.log(`videoId=${this.state.videoId}`);
    this.setState({percentage: 0, downloading: true});
    nodejs.channel.send(JSON.stringify({folder: rnfetchblob.fs.dirs.MusicDir, video: this.state.videoId}));
    nodejs.channel.addListener(
      'message',
      (msg) => {
        console.log(`msg=${msg}`);
        const message = JSON.parse(msg);
        let percentage = Math.ceil(new Number(message.percentage));
        this.setState(
          {
            percentage: percentage,
            transferred: Math.ceil(new Number(message.transferred)/10000)/100,
            speed: Math.ceil(new Number(message.speed)/1000),
            image: percentage < 100 ? require('./Resources/ICONS/DOWNLOAD_AVAILABLE.png') : require('./Resources/ICONS/DOWNLOADED_LOCAL.png')
          }
        );
      },
      this 
    );
  }
  render() {
    return (
      <BKD title={'Downloading ' + this.state.title}>
      <View style={{ flexDirection: 'column', backgroundColor: 'transparent', flex: 1, marginTop:'40%', alignItems: 'center', alignContent: 'space-between' }}>
        <Image source={this.state.image} style={styles.titleImage} />
        <ActivityIndicator size="large" color="white" animating={this.state.percentage < 100} hidesWhenStopped={true}/>
        <Text style={styles.titleText}>Transfered so far {this.state.transferred} MB</Text>
        <Text style={styles.titleText}>Speed {this.state.speed} kB/s</Text>        
      </View>
      </BKD>
    );
  }
  componentWillMount()
  {
    this.download();
  }
}

const styles = StyleSheet.create({
  titleText: {color: '#FCB415',fontFamily: 'Bauhaus 93',fontSize: 20,padding:5},
  video: {textAlign: 'center', fontSize:20, fontFamily: 'Bauhaus 93', width: '80%', borderRadius: 50, marginBottom: '10%' },
    titleImage: {
      width: 80,
      height: (561 / 842) * 80,
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