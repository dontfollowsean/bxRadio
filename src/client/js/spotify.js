window.onSpotifyWebPlaybackSDKReady = () => {
    const token = getCookieValue('access_token');
    const player = new Spotify.Player({
        name: 'bxRadio',
        getOAuthToken: cb => {
            cb(token);
        }
    });

    // Error handling
    player.addListener('initialization_error', ({message}) => {
        console.error(message);
    });
    player.addListener('authentication_error', ({message}) => {
        console.error(message);
    });
    player.addListener('account_error', ({message}) => {
        console.error(message);
    });
    player.addListener('playback_error', ({message}) => {
        console.error(message);
    });

    // Playback status updates
    player.addListener('player_state_changed', state => {
        console.log(state);
    });

    // Ready
    player.addListener('ready', ({device_id}) => {
        console.log('Ready with Device ID', device_id);
        playCurrentSong(token, device_id);
        sessionStorage.device_id = device_id;
    });

    // Not Ready
    player.addListener('not_ready', ({device_id}) => {
        console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!
    player.connect();


};

const playCurrentSong = (token, device_id) => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            uris: [`spotify:track:${currentSong.id}`],
            position_ms: currentSong.progress
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).catch((err) => {
        console.error('error playing current song');
    });
};