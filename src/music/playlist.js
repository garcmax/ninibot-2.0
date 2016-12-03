'use strict';

import * as mm from "../commands/multimedia.js";

export default class Playlist {
    constructor() {
      this.playlist = [];
    }

    add(url, id, author) {
      let title = mm.getVideoInfo(id, function(error, title) {
        if (error) {
          //error case
        } else {
          let playlistObject = {"url" : url, "title" : title, "author": author};
          this.playlist.unshift(playlistObject);
        }
      }.bind(this));      
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
