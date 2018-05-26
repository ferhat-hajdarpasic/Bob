
import Buffer from 'buffer';
import Spotify from 'rn-spotify-sdk';

let redirect_uri = 'https://example.com/callback';
let client_id = '6a878d3c8b854a1387d2bcbe4c665cea';
let client_secret = '7da30991cb4d4e8aa5382ab28f20fd97'

async function handleResponse(response) {
    if(response.ok) {
        let responseJson = await response.json();
        return responseJson;
    } else {
        throw new Error('Call api failed.' + response.status);
    }
}

let access_token = undefined;
async function getAccessToken(code) {
    if (!access_token) {
        console.log('Authorization=' + (new Buffer.Buffer(client_id + ':' + client_secret).toString('base64')));
        let form = new FormData()
        form.append('code', code);
        form.append('redirect_uri', redirect_uri);
        form.append('grant_type', 'authorization_code');
        let tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + (new Buffer.Buffer(client_id + ':' + client_secret).toString('base64')),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `code=${code}&redirect_uri=${redirect_uri}&grant_type=authorization_code`
        });

        let tokenJson = await handleResponse(tokenResponse);
        access_token = tokenJson.access_token;
        let refresh_token = tokenJson.refresh_token;
        console.log('access_token=' + access_token);
        console.log('refresh_token=' + refresh_token);
    }
    return access_token;
}

export default class SpotifyApi {
    async login() {
		try {
			if (!Spotify.isInitialized()) {
				var spotifyOptions = {
					"clientID": "6a878d3c8b854a1387d2bcbe4c665cea",
					"sessionUserDefaultsKey": "SpotifySession",
					"redirectURL": "testschema://callback",
					"scopes": ["user-read-private", "user-read-email", "playlist-read-private", "user-library-read", "user-read-recently-played", "streaming"],
				};
				await Spotify.initialize(spotifyOptions);
			}
		} catch (error) {
			console.log("Error in initialising", error);
        }
        console.log('********************');
        let loggedIn = Spotify.isLoggedIn();
        console.log('********************');
		if (!loggedIn) {
			try {
				console.log("Spotify not logged in - logging in");
				loggedIn = await Spotify.login();
			} catch (error) {
				console.log("Error in logging in", error);
			}
		}
		return loggedIn;
	}

    async me(access_token) {
        console.log('me:'+ access_token);
        //var access_token = await getAccessToken(code);
        let meResponse = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        });
        return await handleResponse(meResponse);
    }

    async recentlyPlayed(access_token, limit) {
        console.log('recentlyPlayed:'+ access_token);
        //var access_token = await getAccessToken(access_token);
        let recentlyPlayedResponse = await fetch('https://api.spotify.com/v1/me/player/recently-played', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        });
        return await handleResponse(recentlyPlayedResponse);
    }

    async playlists(access_token) {
        console.log('playlists:'+ access_token);
        //var access_token = await getAccessToken(access_token);
        let meResponse = await fetch('https://api.spotify.com/v1/me/playlists', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        });
        return await handleResponse(meResponse);
    }

    async albums(access_token) {
        console.log('albums:'+ access_token);
        //var access_token = await getAccessToken(code);
        let albumsResponse = await fetch('https://api.spotify.com/v1/me/albums', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        });
        return await handleResponse(albumsResponse);
    }

    async album(access_token, albumId) {
        console.log('albums:'+ access_token);
        //var access_token = await getAccessToken(code);
        let albumResponse = await fetch('https://api.spotify.com/v1/albums/' + albumId, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        });
        return await handleResponse(albumResponse);
    }
    
}
