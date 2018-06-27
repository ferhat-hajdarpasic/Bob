import React, { Component } from 'react';

import { View, Text, TextInput, Image, StyleSheet, TouchableHighlight, Slider } from 'react-native';
import nodejs from 'nodejs-mobile-react-native';
import rnfetchblob from 'react-native-fetch-blob';
export default class ReactNode extends Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {
      message: 'React NodeJs',
      videoId: params.videoId,
      percentage: 0
    };
  }
  render() {
    return (
      <View style={{ flexDirection: 'column', backgroundColor: 'transparent', flex: 1, marginLeft:'10%', alignItems: 'center' }}>
        <TextInput placeholder="Enter Video Name" underlineColorAndroid='transparent' style={styles.video} 
          onChangeText={(videoId) => this.setState({ videoId: videoId })} value={this.state.videoId} />
          <TouchableHighlight onPress={() => {
              console.log(`videoId=${this.state.videoId}`);
              this.setState({percentage: 0});
              nodejs.channel.send(JSON.stringify({folder: rnfetchblob.fs.dirs.MusicDir, video: this.state.videoId}))
            }} >
            <Image source={require('./Resources/ICONS/DOWNLOAD_AVAILABLE.png')} style={styles.titleImage} />
          </TouchableHighlight>
        <Text style={styles.titleText}>{this.state.message}</Text>
        <Slider step={1} maximumValue={100}  
          value={this.state.percentage} style={{ width: '100%' }} thumbTintColor='orange' 
          maximumTrackTintColor='orange' minimumTrackTintColor='orange' />
      </View>
    );
  }
  componentWillMount()
  {
    console.log(`Downloading music into ${rnfetchblob.fs.dirs.MusicDir}`);
    //nodejs.start('main.js');
    nodejs.channel.addListener(
      'message',
      (msg) => {
        console.log(`msg=${msg}`);
        const message = JSON.parse(msg);
        if(message.transferred) {
          this.setState({message: `Transfered: ${message.transferred}, ${message.percentage} %`, percentage: message.percentage});
        } else if(message.message) {
          this.setState({message: message.message});
        } else {
          this.setState({message: 'UNKNOWN MESSAGE' + msg});
        }
      },
      this 
    );
  }
}

const styles = StyleSheet.create({
  titleText: {color: '#FCB415',fontFamily: 'Bauhaus 93',fontSize: 20,padding:5},
  video: {textAlign: 'center', fontSize:20, fontFamily: 'Bauhaus 93', width: '80%', borderRadius: 50, marginBottom: '10%' },
    titleImage: {
      width: 80,
      height: (561 / 842) * 80,
      marginRight:20
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