const querystring = require('querystring');

const authorizeUrl = 'https://accounts.spotify.com/authorize?';
const stateKey = 'spotify_auth_state';
const client_id = process.env.SPOTIFY_CLIENT_ID || ''; //TODO: defaults?
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI || '';

const generateRandomString = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

exports.spotifyLogin = (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);
    const scope = 'user-read-private user-read-email streaming';
    res.redirect(authorizeUrl +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        })
    );
};