import Config from 'react-native-config'

export const api_url = 'https://www.googleapis.com/youtube/v3';
export const client_id = Config.YOUTUBE_CLIENT_ID;
export const api_key=Config.YOUTUBE_API_KEY

async function handleResponse(response) {
    if(response.ok) {
        let responseJson = await response.json();
        console.log(responseJson);
        return responseJson;
    } else {
        throw new Error('Call api failed.' + response.status);
    }
}

export default class YouTubeApi {
    async playlists(accessToken) {
        console.log('playlists:'+ accessToken);
        let url = `${api_url}/playlists?part=snippet,contentDetails&mine=true`;
        console.log(`url=${url}`);
        let meResponse = await fetch(url, {
            method: 'GET', headers: {'Authorization': `Bearer ${accessToken}`}
        });
        return await handleResponse(meResponse);
    }

    async playlist(accessToken, playlist_id) {
       console.log(playlist_id);
       let url =`${api_url}/playlistItems?playlistId=${playlist_id}&part=snippet,contentDetails`;
        let playlistResponse = await fetch(url, {
            method: 'GET', headers: {'Authorization': `Bearer ${accessToken}`}
        });
        console.log(`url=${url}`);
        return await handleResponse(playlistResponse);
    }    
}
