const getArtistText = (artist) => {
    let text = "";
    for (let i = 0; i < artist.length; i++) {
        if (i > 0 && artist.length > 2) {
            text += ", ";
        }
        if (i > 0 && i === artist.length - 1) {
            text += " and ";
        }
        text += `<span onclick="window.open('${artist[i].url}', '_blank')">` + artist[i].name + `</span>`;
    }

    return text
}

const nowPlayingHtml = (song, image) => {
    return `
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
}

const recentlyPlayedHtml = (song, image) => {
    return `
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
}

const displayNotPlayingHtml = () => {
    return `
        <div class="now-playing-container">
        <div class="now-playing-info">
            <div class="now-playing-title">No music is playing</div>
        </div>
        </div>
        <div class="now-playing-img">
        <img src="./images/generic-album.png" alt="Generic Cover Image" />
        </div>
    `;
}