import React, { Component } from 'react';

import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import nodejs from 'nodejs-mobile-react-native';
import rnfetchblob from 'react-native-fetch-blob';
export default class ReactNode extends Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {
      message: 'React NodeJs',
      videoId: params.videoId
    };
  }
  render() {
    return (
      <View style={{ flexDirection: 'column', backgroundColor: 'transparent', flex: 1, marginLeft:'10%', alignItems: 'center' }}>
        <TextInput placeholder="Enter Video Name" underlineColorAndroid='transparent' style={styles.video} 
          onChangeText={(videoId) => this.setState({ videoId: videoId })} value={this.state.videoId} />
        <Button title="Download" onPress={() => nodejs.channel.send(JSON.stringify({folder: rnfetchblob.fs.dirs.MusicDir, video: this.state.videoId}))} />
        <Text style={styles.titleText}>{this.state.message}</Text>
      </View>
    );
  }
  componentWillMount()
  {
    console.log(`Downloading music into ${rnfetchblob.fs.dirs.MusicDir}`);
    nodejs.start('main.js');
    nodejs.channel.addListener(
      'message',
      (msg) => {
        console.log(`msg=${msg}`);
        const message = JSON.parse(msg);
        if(message.transferred) {
          this.setState({message: `Transfered: ${message.transferred}, ${message.percentage} %`});
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
});