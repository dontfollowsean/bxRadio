const request = require('request'); // "Request" library
const querystring = require('querystring');

const stateKey = 'spotify_auth_state';
const client_id = process.env.SPOTIFY_CLIENT_ID || '';
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI || '';
const client_secret = process.env.SPOTIFY_CLIENT_SECRET || '';
const BXRADIO_URL = process.env.BXRADIO_URL || '';


exports.spotifyCallback = (req, res) => {
    // requests refresh and access tokens
    // after checking the state parameter

    const code = req.query.code || null;
    const state = req.query.state || null;
    // const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null) { //todo Check if state matches storedState
        res.redirect(BXRADIO_URL);
        console.log('missing_state');
    } else {
        res.clearCookie(stateKey);
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                const access_token = body.access_token,
                    refresh_token = body.refresh_token;
                const options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: {'Authorization': 'Bearer ' + access_token},
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, function (error, response, body) {
                    console.log(body);
                });

                res.redirect(BXRADIO_URL + '?' +
                    querystring.stringify({
                        data: access_token,
                        refresh: refresh_token
                    }));
            } else {
                res.redirect(BXRADIO_URL);
                console.error('invalid_token');
            }
        });
    }
};