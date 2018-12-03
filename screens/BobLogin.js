import React, { Component } from 'react';

import { View, Text, TextInput, Image, TouchableHighlight, StyleSheet } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import firebase from 'react-native-firebase';

import BKD from './BobBackground'
import accounting from 'accounting';

export default class BobLogin extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: ''};
    }

    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices({ autoResolve: true });
            await GoogleSignin.configure({
                scopes: ["https://www.googleapis.com/auth/youtube.readonly"], // what API you want to access on behalf of the user, default is email and profile
                offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
                hostedDomain: '', // specifies a hosted domain restriction
                forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
                accountName: '' // [Android] specifies an account name on the device that should be used
            });
            const userInfo = await GoogleSignin.signIn();
            console.log(`userInfo=${JSON.stringify(userInfo)}`);
            const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken);
            firebase.auth().signInWithCredential(credential)
                .then((result) => {
                    console.log(`result=${JSON.stringify(result)}`);
                    console.log('Firebase login success, proceed to import music screen');
                    this.props.navigation.navigate('AddFavourites', {});
                })
                .catch((error) => {
                    console.log(`Firebase login failed, erro =${error.message}`);
                });

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log("user cancelled the login flow");
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log("operation (f.e. sign in) is in progress already");
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log("play services not available or outdated");
            } else {
                console.log(`some other error happened ${JSON.stringify(error)}`);
            }
        }
    };

    render() {
        console.log('FRED=' + accounting.formatMoney(455678.678));
        return (
            <BKD title='bob'>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={styles.loginToBob}>login to bob</Text>
                    <TextInput placeholder="Enter Your Username" underlineColorAndroid='transparent' style={styles.username} onChangeText={(username) => this.setState({ username })} value={this.state.username} />
                    <TextInput placeholder="Enter Your Password" secureTextEntry={true} underlineColorAndroid='transparent' style={styles.password} onChangeText={(password) => this.setState({ password })} value={this.state.password} />
                    <View style={{ flexDirection: 'row', marginBottom: '10%' }}>
                        {/* <Image source={require('../Resources/3RD_PARTY_LOGOS/GOOGLE.png')} style={styles.google} /> */}
                        <GoogleSigninButton
                            style={{ width: 48, height: 48 }}
                            size={GoogleSigninButton.Size.Icon}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={this.signIn}
                            disabled={true} />
                        {/* <Image source={require('../Resources/3RD_PARTY_LOGOS/FB.png')} style={styles.facebook} /> */}
                        <LoginButton readPermissions={["public_profile", "email"]}
                            onLoginFinished={
                                (error, result) => {
                                    if (error) {
                                        console.log("login has error: " + result.error);
                                    } else if (result.isCancelled) {
                                        console.log("login is cancelled.");
                                    } else {
                                        AccessToken.getCurrentAccessToken().then(
                                            (data) => {
                                                console.log(`data=${JSON.stringify(data)}`);
                                                AccessToken.getCurrentAccessToken()
                                                    .then((data) => {
                                                        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                                                        console.log(`credential=${JSON.stringify(credential)}`);
                                                        firebase.auth().signInWithCredential(credential)
                                                            .then((result) => {
                                                                console.log(`result=${JSON.stringify(result)}`);
                                                                console.log('Firebase login success, proceed to import music screen');
                                                                this.props.navigation.navigate('AddFavourites', {});
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
                            onLogoutFinished={() => console.log("logout.")} />
                    </View>
                    <TouchableHighlight>
                        <Text style={styles.login}>login</Text>
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <Text style={styles.joinBob}>join bob</Text>
                    </TouchableHighlight>
                </View>
            </BKD>
        );
    }
}

const styles = StyleSheet.create({
    username: { backgroundColor: 'white', color: '#393536', textAlign: 'center', fontSize: 20, fontFamily: 'Bauhaus 93', width: '80%', borderRadius: 50, marginBottom: '10%' },
    password: { backgroundColor: 'white', color: '#393536', textAlign: 'center', fontSize: 20, fontFamily: 'Bauhaus 93', width: '80%', borderRadius: 50, marginBottom: '10%' },
    loginToBob: { color: 'white', fontFamily: 'Bauhaus 93', fontSize: 20, marginBottom: '10%' },
    login: { color: '#FCB415', fontFamily: 'Bauhaus 93', fontSize: 20, marginBottom: '10%' },
    joinBob: { color: '#FCB415', fontFamily: 'Bauhaus 93', fontSize: 20 },
    google: { width: 40, height: 40 * (1065 / 1045), marginRight: '10%' },
    facebook: { width: 40, height: 40 }
});