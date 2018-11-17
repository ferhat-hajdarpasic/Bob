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
        let key = 'AIzaSyBpujtNa5iCA5hy2aP4CUNojRlKNxaEeNw';
        let url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&mine=true&key=${key}&access_token=${access_token}`;
        console.log(`url=${url}`);
        let meResponse = await fetch(url, {
            method: 'GET'
        });
        return await handleResponse(meResponse);
    }

    async playlist(access_token, playlist_id) {
       console.log(playlist_id);
       let key = 'AIzaSyBpujtNa5iCA5hy2aP4CUNojRlKNxaEeNw';
       let url =`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlist_id}&part=snippet,contentDetails&key=${key}&access_token=${access_token}`;
        let playlistResponse = await fetch(url, {
            method: 'GET'
        });
        console.log(`url=${url}`);
        return await handleResponse(playlistResponse);
    }    
}
