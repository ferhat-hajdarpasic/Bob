let client_id='z8LRYFPM4UK5MMLaBe9vixfph5kqNA25';
//let key = 'AIzaSyBtnAcka845n2BMkL7mrXWKcS2FTXPi6I0';
//let code='24b49a39adc1802c40b0059153c416b1';
//access_token = '1-178930-450627837-740f6f923d451';

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
        let url = `http://api.soundcloud.com/me/playlists?client_id=${client_id}&oauth_token=${access_token}`;
        console.log(`url=${url}`);
        let meResponse = await fetch(url, {
            method: 'GET'
        });
        return await handleResponse(meResponse);
    }

    async playlist(access_token, playlist_id) {
       console.log(playlist_id);
       let key = 'AIzaSyBtnAcka845n2BMkL7mrXWKcS2FTXPi6I0';
       let url =`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlist_id}&part=snippet,contentDetails&key=${key}&access_token=${access_token}`;
        let playlistResponse = await fetch(url, {
            method: 'GET'
        });
        console.log(`url=${url}`);
        return await handleResponse(playlistResponse);
    }    
}
