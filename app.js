const displaySongs = function () {
    const nowplayingImg = document.getElementById('nowplayingImg');
    const nowplayingTitle = document.getElementById('nowplayingTitle');
    const nowplayingInfo = document.getElementById('nowplayingInfo');
    const lastPlayedDiv = document.getElementById('lastplayed');
    const nowPlayingEndpoint = 'https://35.211.223.26/nowplaying';
    const lastPlayedEndpoint = 'https://35.211.223.26/lastplayed';

    fetch(nowPlayingEndpoint)
        .then(response => response.json())
        .then(song => {
            const image = song.images.filter(i => i.width === 300);
            // console.log(song);
            nowplayingImg.innerHTML = `<img src="${image[0].url}"/>`;
            nowplayingTitle.innerText = `${song.title} by ${song.artist}`;
            nowplayingInfo.addEventListener('click', event => {
                window.location.href = song.url
            })
        })
        .catch(error => {
            console.error(error)
        });

    fetch(lastPlayedEndpoint)
        .then(response => response.json())
        .then(songs => {
            // console.log(songs);
            let songInfoHtml = '';
            songs.forEach(song => {
                const image = song.images.filter(i => i.width === 64);
                const songImg = `<img src="${image[0].url}"/> `;
                const songInfoDiv = `<div class="recentlyPlayedInfo">${song.title} by ${song.artist}</div> `
                songInfoHtml += `<div onclick="window.location = '${song.url}'" class="listItem">${songImg + songInfoDiv}</div>`
            });
            lastPlayedDiv.innerHTML = songInfoHtml
        })
        .catch(error => {
            console.error(error)
        })
}

window.onload = displaySongs;