import React, { Component } from 'react';
 
import { StyleSheet, View, TextInput } from 'react-native';
 
import LinearGradient from 'react-native-linear-gradient';
 
export default class MainActivity extends Component {
 
render() {
 
  return (
 
     <View style={styles.MainContainer}>
 
           <LinearGradient colors={['#c3c3c3', '#FFFFFF']} style={styles.LinearGradientStyle} >
 
                <View style={styles.ChildViewStyle}>
 
                  <TextInput
                    placeholder="Enter Your Text Here"
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}/>
 
                </View>
                 
           </LinearGradient>
       
 
     </View>
 
       
  );
}
}
 
const styles = StyleSheet.create({
 
 MainContainer :{
 
   flex:1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor : '#fff'
 
 },
 
 LinearGradientStyle: {
   borderRadius: 10,
   height: 500,
   width: '100%'
 },
 
 ChildViewStyle:{
 
   borderWidth: 1, 
   borderColor: '#028b53',
   width: '100%',
   height: 50,
   borderRadius: 10,
 
 },
 
 TextInputStyleClass:{
  
 textAlign: 'center',
 height: 50,
 width: '90%'
 
 }
 
});