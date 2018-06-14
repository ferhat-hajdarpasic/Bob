import React, { Component } from 'react';

import { View, Text, Button, StyleSheet } from 'react-native';
import nodejs from 'nodejs-mobile-react-native';
export default class ReactNode extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ flexDirection: 'row', backgroundColor: 'transparent', flex: 1, marginLeft:'10%', alignItems: 'center' }}>
        <Text style={styles.titleText}>React Node Js</Text>
        <Button title="Message Node"
    onPress={() => nodejs.channel.send('A message!')}
    />
      </View>
    );
  }
  componentWillMount()
  {
    nodejs.start('main.js');
    nodejs.channel.addListener(
      'message',
      (msg) => {
        alert('From node: ' + msg);
      },
      this 
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    color: '#FCB415',
    fontFamily: 'Bauhaus 93',
    fontSize: 20,
    padding:5
  }
});