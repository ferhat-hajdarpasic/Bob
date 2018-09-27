import Config from 'react-native-config'

export const login_url = 'https://login.stage.tidal.com/authorize';
export const oauth_url = 'https://auth.stage.tidal.com/v1/oauth2/token';
export const redirect_url = 'bobmusic://callback';
export const client_id = Config.CLIENT_ID;
export const client_unique_key=Config.CLIENT_UNIQUE_KEY
export const code_challenge='ABCD1234';
export const code_challenge_method='plain';

export class TidalApi {
    static loginUrl = () => {
        let loginUrl = `${login_url}?lang=en&response_type=code&redirect_uri=${redirect_url}&client_id=${client_id}&code_challenge=${code_challenge}&code_challenge_method=${code_challenge_method}&client_unique_key=${client_unique_key}`;    
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
            grant_type:'authorization_code',
            client_id:client_id,
            client_secret:client_unique_key,
            code:code,
            code_verifier:code_challenge,
            scope:'t_usr',
            redirect_uri:redirect_url,
            client_unique_key:client_unique_key
        };
        
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        
        let response = await fetch(oauth_url, {method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}, body: formBody});
        if(response.ok) {
            let responseJson = await response.json();
            let access_token = responseJson.access_token;
            return access_token;
        } else {
            throw new Error('Call api failed.' + response.status);
        }
    }
}