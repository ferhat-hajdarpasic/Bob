import Config from 'react-native-config'
export const api_url = 'https://api.soundcloud.com';
export const client_id = Config.SOUNDCLOUD_CLIENT_ID;

async function handleResponse(response) {
    if(response.ok) {
        let responseJson = await response.json();
        console.log(responseJson);
        return responseJson;
    } else {
        throw new Error('Call api failed.' + response.status);
    }
}

export default class SoundCloudApi {
    async playlists(access_token) {
        console.log('playlists:'+ access_token);
        let url = `${api_url}/me/playlists?client_id=${client_id}&oauth_token=${access_token}`;
        console.log(`url=${url}`);
        let meResponse = await fetch(url, {
            method: 'GET'
        });
        return await handleResponse(meResponse);
    }
}
