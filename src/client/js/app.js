const nowPlaying = document.querySelector(".now-playing"),
    recentlyPlayedDiv = document.querySelector(".recently-played-container"),
    nowPlayingEndpoint = "https://bxradio.seanw.io/nowplaying",
    recentlyPlayedEndpoint = "https://bxradio.seanw.io/recentlyplayed";
let currentSong = {};

const renderNowPlaying = song => {
    let image = song.images.find(i => i.width === 640);

    if (image === null) {
        image = {};
        image.url = "./images/generic-album.png";
    }

    if (typeof song !== 'undefined') {
        nowPlaying.innerHTML = nowPlayingHtml(song, image);
        setTimeout(fetchNowPlaying, song.duration - song.progress);
    }
};

const renderRecentlyPlayed = songs => {
    let songInfoHtml = "";

    songs.forEach(song => {
        let image = song.images.find(i => i.width === 64);

        if (image === null) {
            image = {};
            image.url = "./images/generic-album.png";
        }

        songInfoHtml += recentlyPlayedHtml(song, image);
    });

    recentlyPlayedDiv.innerHTML = songInfoHtml;
};

/*
  TODO -
    Proper error handling
*/

const fetchNowPlaying = () => {
    fetch(nowPlayingEndpoint)
        .then(response => {
            if (response.status === 204) {
                nowPlaying.innerHTML = displayNotPlayingHtml();
                return;
            }
            return response.json();
        })
        .then((song) => {
            if (typeof song !== 'undefined') {
                setTimeout(fetchRecentlyPlayed, (song.duration - song.progress) + 6500);
                currentSong = song;
                renderNowPlaying(song);
                if (getCookieValue('access_token') && sessionStorage.device_id) {
                    playCurrentSong(getCookieValue('access_token'), sessionStorage.device_id);
                }
            }
        })
        .catch(err => console.log(err));
};

const fetchRecentlyPlayed = () => {
    fetch(recentlyPlayedEndpoint)
        .then(response => response.json())
        .then(renderRecentlyPlayed)
        .catch(err => console.log(err));
};

const displaySongs = () => {
    setTheme();
    fetchNowPlaying();
    fetchRecentlyPlayed()
};

displaySongs();
