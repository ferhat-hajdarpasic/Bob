import React, { Component } from 'react';

import { Linking, View, TextInput, Image, ImageBackground } from 'react-native';

import { StyleSheet, WebView, Platform } from 'react-native';
import { TidalApi, redirect_url } from './TidalApi'
import { connect } from "react-redux";

class _LoginToTidal extends Component {
    constructor(props) {
        super(props);
    }

	componentWillReceiveProps = async (nextProps) => {
		console.log(`componentWillReceiveProps = ${JSON.stringify(nextProps)}`);
        if (nextProps.tidalOauth) {
            this.props.navigation.navigate('ImportFromTidal', {})
        }
    }

    componentDidMount() {
        Linking.addEventListener('url', this.handleLoginCallback);
        console.log('Added event listener');
    }

    componentWillUnmount() {
        console.log('Removed event listener');
        Linking.removeEventListener('url', this.handleLoginCallback);
    }

    handleLoginCallback = async (event) => {
        console.log('bobmusic://callback=' + event.url);
        const code = TidalApi.getCodeFromCallbackUrl(event);
        if (code) {
            console.log('User code is: ' + code);
            const oauth = await TidalApi.oauth(code);
            console.log(`access_token is: ${oauth.access_token}`);
            console.log(`userid is: ${oauth.user.userId}`)
            this.props.setTidalOauth(oauth);
        }
    }

    render() {
        const uri = TidalApi.loginUrl();
        return (
            <WebView
                style={styles.WebViewStyle}
                source={{ uri: uri }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                onNavigationStateChange={async (state) => {
                    console.log('Navigation state changed event:' + JSON.stringify(state));
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    WebViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: (Platform.OS) === 'ios' ? 20 : 0
    }
});

const mapStateToProps = state => ({
    tidalOauth: state.tidalOauth,
});

const mapDispatchToProps = (dispatch) => ({
    setTidalOauth: (value) => {
        dispatch({ type: 'SET_TIDAL_OAUTH', oauth: value });
    }
});

export default LoginToTidal = connect(mapStateToProps, mapDispatchToProps)(_LoginToTidal);
