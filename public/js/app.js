const nowplayingImg = document.querySelector(".now-playing-img"),
  nowplayingTitle = document.querySelector(".now-playing-title"),
  nowplayingInfo = document.querySelector(".now-playing-info"),
  nowPlayingArtist = document.querySelector(".now-playing-artist"),
  recentlyPlayedDiv = document.querySelector(".recently-played-container"),
  toggle = document.querySelector("#toggle"),
  nowPlayingEndpoint = "http://35.211.223.26/nowplaying",
  recentlyPlayedEndpoint = "http://35.211.223.26/recentlyplayed";

const renderNowPlaying = song => {
  const image = song.images.find(i => i.width === 640);

  nowplayingImg.src = image[0].url;
  nowplayingTitle.innerText = `${song.title}`;
  nowPlayingArtist.innerText = ` by ${song.artist}`;

  nowplayingInfo.addEventListener(
    "click",
    () => (window.location.href = song.url)
  );
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
const handleError = err => {
  console.log(err);
};

const displaySongs = e => {
  fetch(nowPlayingEndpoint)
    .then(response => response.json())
    .then(renderNowPlaying)
    .catch(handleError);

  fetch(recentlyPlayedEndpoint)
    .then(response => response.json())
    .then(renderRecentlyPlayed)
    .catch(handleError);
};

const styles = {
  blue: {
    "--theme-background-color":
      "linear-gradient(0deg, #0047c8 0%, #0080d4 75%)",
    "--theme-text-color": "#f8e71c",
    "--theme-single-hover-background-color": "#0266c1",
    "--theme-single-background-color": "#0085ff",
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

window.addEventListener("load", displaySongs);
toggle.addEventListener("change", toggleTheme);
