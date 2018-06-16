import React, { Component } from 'react';

import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import nodejs from 'nodejs-mobile-react-native';
export default class ReactNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'React NodeJs',
      videoId: 'ek1ePFp-nBI'
    };
  }
  render() {
    return (
      <View style={{ flexDirection: 'column', backgroundColor: 'transparent', flex: 1, marginLeft:'10%', alignItems: 'center' }}>
        <TextInput placeholder="Enter Video Name" underlineColorAndroid='transparent' style={styles.video} 
          onChangeText={(videoId) => this.setState({ videoId: videoId })} value={this.state.videoId} />
        <Button title="Download" onPress={() => nodejs.channel.send(this.state.videoId)} />
        <Text style={styles.titleText}>{this.state.message}</Text>
      </View>
    );
  }
  componentWillMount()
  {
    nodejs.start('main.js');
    nodejs.channel.addListener(
      'message',
      (msg) => {
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