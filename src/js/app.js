import { setTheme } from './themes.js';
import { nowPlayingHtml, recentlyPlayedHtml, displayNotPlayingHtml } from './utils.js';

const nowplaying = document.querySelector(".now-playing"),
    recentlyPlayedDiv = document.querySelector(".recently-played-container"),
    nowPlayingEndpoint = "https://bxradio.seanw.io/nowplaying",
    recentlyPlayedEndpoint = "https://bxradio.seanw.io/recentlyplayed";

const renderNowPlaying = song => {
    let image = song.images.find(i => i.width === 640);

    if (image === null) {
        image = {};
        image.url = "./images/generic-album.png";
    }

    nowplaying.innerHTML = nowPlayingHtml(song);

    setTimeout(fetchNowPlaying, song.duration - song.progress);
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
const displayNotPlaying = () => {
    nowplaying.innerHTML = displayNotPlayingHtml();
};

const fetchNowPlaying = () => {
    fetch(nowPlayingEndpoint)
        .then(response => {
            if (response.status === 204) {
                displayNotPlaying();
                return
            }
            return response.json()
        })
        .then((song) => {
            setTimeout(fetchRecentlyPlayed, (song.duration - song.progress) + 6500);
            renderNowPlaying(song);
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
