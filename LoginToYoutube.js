import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'

import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'

export default class LoginToYoutube extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    this._setupGoogleSignin()
  }

  render() {
    if (!this.state.user) {
      return (
        <View style={styles.container}>
          <GoogleSigninButton
            style={{ width: 212, height: 48 }}
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Auto}
            onPress={this._signIn.bind(this)}
          />
        </View>
      )
    }

    if (this.state.user) {
      return (
        <View style={styles.container}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>
            Welcome {this.state.user.name}
          </Text>
          <Text>Your email is: {this.state.user.email}</Text>

          <TouchableOpacity
            onPress={() => {
              this._signOut()
            }}
          >
            <View style={{ marginTop: 50 }}>
              <Text>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
  }

  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true })

      await GoogleSignin.configure({
        scopes: ["https://www.googleapis.com/auth/youtube.readonly"], // what API you want to access on behalf of the user, default is email and profile
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        hostedDomain: '', // specifies a hosted domain restriction
        forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
        accountName: '' // [Android] specifies an account name on the device that should be used
      })

      const user = await GoogleSignin.currentUserAsync()
      console.log(user)
      this.setState({ user })
    } catch (err) {
      console.warn('Google signin error', err.code, err.message)
    }
  }

  _signIn() {
    GoogleSignin.signIn()
      .then(user => {
        console.log(user)
        this.setState({ user: user })
      })
      .catch(err => {
        console.warn(err)
      })
      .done()
  }

  _signOut() {
    GoogleSignin.revokeAccess()
      .then(() => GoogleSignin.signOut())
      .then(() => {
        this.setState({ user: null })
      })
      .done()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})

AppRegistry.registerComponent('GoogleSigninSampleApp', () => GoogleSigninSampleApp)