
import Buffer from 'buffer';

let redirect_uri = 'https://example.com/callback';
let client_id = '6a878d3c8b854a1387d2bcbe4c665cea';
let client_secret = '7da30991cb4d4e8aa5382ab28f20fd97'

export default class SpotifyApi {
    async me(code) {
        console.log('FRED=' + (new Buffer.Buffer(client_id + ':' + client_secret).toString('base64')));
        let form = new FormData()
        form.append('code', code);
        form.append('redirect_uri', redirect_uri);
        form.append('grant_type', 'authorization_code');
        try {
            let tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + (new Buffer.Buffer(client_id + ':' + client_secret).toString('base64')),
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                body: `code=${code}&redirect_uri=${redirect_uri}&grant_type=authorization_code`
            });
            console.log('FRED3=' + tokenResponse.ok);
            console.log('FRED3=' + tokenResponse.status);
            let tokenJson = await tokenResponse.json();
            var access_token = tokenJson.access_token,
                refresh_token = tokenJson.refresh_token;
            console.log('access_token=' + access_token);
            console.log('refresh_token=' + refresh_token);

            try {
                let meResponse = await fetch('https://api.spotify.com/v1/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    }
                });
                let meJson = await meResponse.json();
                console.log('meJson=' + JSON.stringify(meJson));
            } catch (error) {
                console.error('FRED2' + error);
            }

        } catch (error) {
            console.error('FRED1' + error);
        }        
    }
}
