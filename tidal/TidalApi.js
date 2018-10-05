import Config from 'react-native-config'

export const login_url = 'https://login.tidal.com/authorize';
export const oauth_url = 'https://auth.tidal.com/v1/oauth2/token';
export const redirect_url = 'bobmusic://callback';
export const client_id = Config.CLIENT_ID;
export const client_unique_key=Config.CLIENT_UNIQUE_KEY
export const code_challenge='ABCD1234';
export const code_challenge_method='plain';

export class TidalApi {
    static loginUrl = () => {
        let loginUrl = `${login_url}?client_id=${client_id}&redirect_uri=${redirect_url}&scope=r_usr&&response_type=code&code_challenge=${code_challenge}&code_challenge_method=${code_challenge_method}`
        console.log(`login url = ${loginUrl}`);
        return loginUrl;
    }
    static getCodeFromCallbackUrl(event) {
        if(event.url.startsWith(redirect_url)) {
            let rx = /code=([^&]*)/g;
            const code = rx.exec(event.url)[1];
            return code;
        }
    }

    static oauth = async (code) => {
        var details = {
            code:code,
            client_id:client_id,
            redirect_uri:redirect_url,
            grant_type:'authorization_code',
            code_verifier:code_challenge
        };
        
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        
        let response = await fetch(oauth_url, {method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded'}, body: formBody});
        if(response.ok) {
            let responseJson = await response.json();
            console.log(`Tidal oauth data:${JSON.stringify(responseJson)}`);
            return responseJson;
        } else {
            throw new Error('Call api failed.' + response.status);
        }
    }

    static playlists = async (userId, accessToken) => {
        const url = `https://api.tidal.com/v1/users/${userId}/playlists?countryCode=AU`
        console.log(`Playlists url = ${url}`);
        let response = await fetch(url, {method: 'GET', headers: {'Authorization': `Bearer ${accessToken}`}});
        if(response.ok) {
            let responseJson = await response.json();
            console.log(`Tidal playlist data:${JSON.stringify(responseJson)}`);
            return responseJson;
        } else {
            throw new Error('Playlists call api failed.' + response.status);
        }
    }

    static albums = async (userId, accessToken) => {
        const url = `https://api.tidal.com/v1/users/${userId}/favorites/albums?order=NAME&orderDirection=ASC&countryCode=AU`;
        console.log(`Albums url = ${url}`);
        let response = await fetch(url, {method: 'GET', headers: {'Authorization': `Bearer ${accessToken}`}});
        if(response.ok) {
            let responseJson = await response.json();
            console.log(`Tidal albums data:${JSON.stringify(responseJson)}`);
            return responseJson;
        } else {
            throw new Error('Albums call api failed.' + response.status);
        }
    }

    static tracks = async (userId, accessToken) => {
        const url = `https://api.tidal.com/v1/users/${userId}/favorites/tracks?order=NAME&orderDirection=ASC&countryCode=AU`;
        console.log(`Tracks url = ${url}`);
        let response = await fetch(url, {method: 'GET', headers: {'Authorization': `Bearer ${accessToken}`}});
        if(response.ok) {
            let responseJson = await response.json();
            console.log(`Tidal tracks data:${JSON.stringify(responseJson)}`);
            return responseJson;
        } else {
            throw new Error('Tracks call api failed.' + response.status);
        }
    }

    static artists = async (userId, accessToken) => {
        const url = `https://api.tidal.com/v1/users/${userId}/favorites/artists?order=NAME&orderDirection=ASC&countryCode=AU`;
        console.log(`Artists url = ${url}`);
        let response = await fetch(url, {method: 'GET', headers: {'Authorization': `Bearer ${accessToken}`}});
        if(response.ok) {
            let responseJson = await response.json();
            console.log(`Tidal artists data:${JSON.stringify(responseJson)}`);
            return responseJson;
        } else {
            throw new Error('Artists call api failed.' + response.status);
        }
    }

    static recentlyPlayed = async (userId, accessToken) => {

    }
}