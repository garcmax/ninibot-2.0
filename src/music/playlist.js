'use strict';

export default class Playlist {
    constructor() {
      this.playlist = [];
    }

    add(url) {
      let playlistObject = {"url" : url};
      this.playlist.unshift(playlistObject);
    }

    remove(url) {
      for (let i = 0; i < this.playlist.length; i++) {
        if (this.playlist[i].url == url) {
          this.playlist.splice(i, 1);
        }
      }
    }

    next() {
      return this.playlist.pop();
    }

    current() {
      return this.playlist[this.playlist.length - 1].url;
    }

    getPlaylist() {
      return this.playlist;
    }
}
