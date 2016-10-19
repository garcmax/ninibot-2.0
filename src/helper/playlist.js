'use strict';


export function add(url, playlist) {
    let index = playlist.length;
    let playlistObject = {"index" : index, "url" : url};
    playlist.splice(index , 0, playlistObject);
    return playlist;
}

export function remove(url, playlist) {
    for (let i = 0; i < playlist.length; i++) {
      if (playlist[i].url == url) {
        playlist.splice(i, 1);
      }
    }
    return playlist;
}
