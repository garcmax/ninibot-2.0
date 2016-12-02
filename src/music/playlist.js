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

    hasNext() {
      this.playlist.pop();
      let hasNext = this.playlist.length > 0 ? true : false;
      console.log(`is there a next song ? ${hasNext}`)
      return hasNext;
    }

    current() {
      let length = this.playlist.length;
      if (length > 0) {
        return this.playlist[this.playlist.length - 1].url;
      }
      return undefined;
    }

    getPlaylist() {
      return this.playlist;
    }
}
