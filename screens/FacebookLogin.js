import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';

export default class Login extends Component {
  render() {
    return (
      <View>
        <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString());
                    AccessToken.getCurrentAccessToken()
                    .then((data) => {
                      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                      firebase.auth().signInWithCredential(credential)
                        .then(() => {
                            console.log('Firebase login success, proceed to import music screen');
                        })
                        .catch((error) => {
                            console.log(`Firebase login failed, erro =${error.message}`);
                        });
                    });
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/>
      </View>
    );
  }
}