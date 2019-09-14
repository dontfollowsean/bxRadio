const nowplaying = document.querySelector(".now-playing"),
    recentlyPlayedDiv = document.querySelector(".recently-played-container"),
    toggle = document.querySelector("#toggle"),
    nowPlayingEndpoint = "https://bxradio.seanw.io/nowplaying",
    recentlyPlayedEndpoint = "https://bxradio.seanw.io/recentlyplayed";

function getArtistText(artist) {
    let text = "";
    for (let i = 0; i < artist.length; i++) {
        if (i > 0 && artist.length > 2) {
            text += ", ";
        }
        if (i > 0 && i === artist.length - 1) {
            text += "and ";
        }
        text += `<span onclick="window.open('${artist[i].url}', '_blank')">` + artist[i].name + `</span>`
        ;
    }

    return text
}

const renderNowPlaying = song => {
    let image = song.images.find(i => i.width === 640);

    if (image === null) {
        image = {};
        image.url = "./public/images/generic-image.png";
    }

    nowplaying.innerHTML = `
    <div class="now-playing-container">
      <label>Now Playing</label>
      <div class="now-playing-info">
        <div class="now-playing-title" onclick="window.open('${song.url}', '_blank')">${song.title}</div>
        <div class="now-playing-artist">${getArtistText(song.artist)}</div>
      </div>
    </div>
    <div class="now-playing-img" onclick="window.open('${song.url}', '_blank')">
      <img src=${image.url} alt=${song.title} />
    </div>
  `;

    setTimeout(fetchNowPlaying, song.duration - song.progress);
};

const renderRecentlyPlayed = songs => {
    let songInfoHtml = "";

    songs.forEach(song => {
        let image = song.images.find(i => i.width === 64);

        if (image === null) {
            image = {};
            image.url = "./public/images/generic-image.png";
        }

        songInfoHtml += `
      <div class="single-song-container" 
          onclick="window.open('${song.url}', '_blank')">
          <img
            src=${image.url}
            alt=${song.title}
            class="single-song-image"
          />
          <div class="single-song-content">
            <div class="single-song-title">${song.title}</div>
            <div class="single-song-artist">${getArtistText(song.artist)}</div>
          </div>
      </div>
    `;
    });

    recentlyPlayedDiv.innerHTML = songInfoHtml;
};

/*
  TODO -
    Proper error handling
*/
const displayNotPlaying = () => {
    nowplaying.innerHTML = `
    <div class="now-playing-container">
      <div class="now-playing-info">
        <div class="now-playing-title">No music is playing</div>
      </div>
    </div>
    <div class="now-playing-img">
      <img src="./public/images/generic-image.png" alt="Generic Cover Image" />
    </div>
  `;
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
            setTimeout(fetchRecentlyPlayed, (song.duration - song.progress) + 5000);
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
    fetchNowPlaying();
    fetchRecentlyPlayed()
};

const styles = {
    blue: {
        "--theme-background-color":
            "linear-gradient(0deg, #0047c8 0%, #0080d4 75%)",
        "--theme-text-color": "#f8e71c",
        "--theme-single-hover-background-color": "#0266c1",
        "--theme-single-background-color": "#0047C8",
        "--theme-single-shadow": "0px 2px 8px 2px rgba(0, 0, 0, 0.1)"
    },
    dark: {
        "--theme-background-color":
            "linear-gradient(0deg,rgba(0, 0, 0, 1) 0%, rgba(57, 57, 67, 1) 75%)",
        "--theme-text-color": "#0085ff",
        "--theme-single-hover-background-color": "#111112",
        "--theme-single-background-color": "#18181d",
        "--theme-single-shadow": "0px 2px 12px 2px rgba(0, 0, 0, 0.4)"
    }
};

const toggleTheme = e => {
    if (e.target.checked) {
        Object.keys(styles.blue).map(key => {
            document.documentElement.style.setProperty(key, styles.blue[key]);
        });
    } else {
        Object.keys(styles.dark).map(key => {
            document.documentElement.style.setProperty(key, styles.dark[key]);
        });
    }
};

displaySongs();
toggle.addEventListener("change", toggleTheme);
