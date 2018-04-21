import React, { Component } from 'react';

import { View, TextInput, Image, ImageBackground } from 'react-native';

import { StyleSheet, WebView, Platform} from 'react-native';
import BKD  from './BobBackground'
 
export default class MainActivity extends Component {
 
      render() {
        let redirect_url = 'about:blank';
        let client_id='6a878d3c8b854a1387d2bcbe4c665cea';        
        return (     
            <BKD></BKD>
        );
      }
    }
    
 
 
const styles = StyleSheet.create(
{
 
 WebViewStyle:
 {
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    marginTop: (Platform.OS) === 'ios' ? 20 : 0
 }
});