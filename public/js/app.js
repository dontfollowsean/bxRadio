const nowplaying = document.querySelector(".now-playing"),
  recentlyPlayedDiv = document.querySelector(".recently-played-container"),
  toggle = document.querySelector("#toggle"),
  nowPlayingEndpoint = "http://35.211.223.26/nowplaying",
  recentlyPlayedEndpoint = "http://35.211.223.26/recentlyplayed";

const renderNowPlaying = song => {
  const image = song.images.find(i => i.width === 640);

  if (image === null) {
    image.url = "./public/images/generic-image.png";
  }

  nowplaying.innerHTML = `
    <div class="now-playing-container" onclick="window.open('${song.url}', '_blank')">
      <label>Now Playing</label>
      <div class="now-playing-info">
        <div class="now-playing-title">${song.title}</div>
        <div class="now-playing-artist">${song.artist}</div>
      </div>
    </div>
    <div class="now-playing-img">
      <img src=${image.url} alt=${song.title} />
    </div>
  `;
};

const renderRecentlyPlayed = songs => {
  let songInfoHtml = "";

  songs.forEach(song => {
    const image = song.images.find(i => i.width === 64);

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
            <div class="single-song-artist">${song.artist}</div>
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

const displaySongs = () => {
  fetch(nowPlayingEndpoint)
    .then(response => {
      if (response.status === 204){
        displayNotPlaying()
        return
      }
     return response.json()
    })
    .then(renderNowPlaying)
    .catch(err => console.log(err));

  fetch(recentlyPlayedEndpoint)
    .then(response => response.json())
    .then(renderRecentlyPlayed)
    .catch(err => console.log(err));
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
