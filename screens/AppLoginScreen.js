import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import firebase from 'react-native-firebase';
import { Button } from 'react-native-elements';

export default class AppLoginScreen extends Component {
	constructor(props) {
        super(props);
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
        return (
            <View>
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
                <GoogleSigninButton
                    style={{ width: 48, height: 48 }}
                    size={GoogleSigninButton.Size.Icon}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={this.signIn}
                    disabled={true} />
            </View>
        );
    }
}