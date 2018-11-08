import React, { Component } from 'react';

import { View, Text, Image} from 'react-native';
import BKD from './BobBackground'
import styles from "../styles/playlist"

export default class PlaylistScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { params } = this.props.navigation.state;
    let playlist = params.playlist;
    let FlatList = params.FlatList;
    let style = params.style;
    let logoImage = params.logoImage;

    console.log(`style=${JSON.stringify(style)}`);
    
    return (
        <BKD title={playlist.title}>
        <View style={{
          flex: 1,
          flexDirection: 'column',
        }}>
          <View style={{ flexDirection: 'row', backgroundColor: 'transparent', flex: 1.5,  justifyContent: 'flex-end', alignItems: 'center'}}>
            <Image source={logoImage} style={styles.soundcloud} />
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'transparent', flex: 7, marginLeft:'10%' }}>
            <FlatList params={params} navigation={this.props.navigation}/>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'transparent', flex: 1, marginLeft:'10%', alignItems: 'center' }}>
            <Image source={require('../Resources/BOB_LOGOS/BOB_LOGO_ORANGE.png')} style={styles.titleImage} />
            <Text style={styles.titleText}>import all to bob</Text>
          </View>
        </View>
      </BKD>
    );
  }
}