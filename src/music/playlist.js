'use strict';

export default class Playlist {
    constructor() {
      this.playlist = [];
    }
    add(url) {
      let index = this.playlist.length;
      let playlistObject = {"index" : index, "url" : url};
      this.playlist.splice(index , 0, playlistObject);
    }
    remove(url) {
      for (let i = 0; i < this.playlist.length; i++) {
        if (this.playlist[i].url == url) {
          this.playlist.splice(i, 1);
        }
      }
    }

    getPlaylist() {
      return this.playlist;
    }
}
