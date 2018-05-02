
import Buffer from 'buffer';

let redirect_uri = 'https://example.com/callback';
let client_id = '6a878d3c8b854a1387d2bcbe4c665cea';
let client_secret = '7da30991cb4d4e8aa5382ab28f20fd97'

async function handleResponse(response) {
    if(response.ok) {
        let responseJson = await response.json();
        console.log('responseJson=' + JSON.stringify(responseJson));
        return responseJson;
    } else {
        console.log('response.ok=' + response.ok);
        console.log('response.status=' + response.status);
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
    async me(code) {
        var access_token = await getAccessToken(code);
        let meResponse = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        });
        return await handleResponse(meResponse);
    }

    async recentlyPlayed(code, limit) {
        console.log(`recentlyPlayed(code=${code}, limit=${limit})`);
        var access_token = await getAccessToken(code);
        console.log('recentlyPlayed:access_token='+access_token);
        let recentlyPlayedResponse = await fetch('https://api.spotify.com/v1/me/player/recently-played', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        });
        console.log('recentlyPlayedResponse='+JSON.stringify(recentlyPlayedResponse));
        return await handleResponse(recentlyPlayedResponse);
    }

    async playlists(code) {
        var access_token = await getAccessToken(code);
        let meResponse = await fetch('https://api.spotify.com/v1/me/playlists', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        });
        return await handleResponse(meResponse);
    }
}
