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
    async playlists(access_token) {
        console.log('playlists:'+ access_token);
        let key = 'AIzaSyBtnAcka845n2BMkL7mrXWKcS2FTXPi6I0';
        let url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&mine=true&key=${key}&access_token=${access_token}`;
        console.log(`url=${url}`);
        let meResponse = await fetch(url, {
            method: 'GET'
        });
        return await handleResponse(meResponse);
    }

    async playlist(access_token, playlist_href) {
        console.log(playlist_href);
        let playlistResponse = await fetch(playlist_href, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        });
        return await handleResponse(playlistResponse);
    }    
}
