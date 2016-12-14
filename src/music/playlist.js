'use strict';

import * as mm from "../commands/multimedia.js";

export default class Playlist {
    constructor() {
      this.playlist = [];
    }

    add(url, id, author, callback) {
      let title = mm.getVideoInfo(id, function(error, title) {
        if (error) {
          console.log(error);
          callback(1);
        } else {
          let index = this.playlist.length > 0 ? this.playlist[0].index + 1 : 1; 
          let playlistObject = {"url" : url, "title" : title, "author": author, "index" : index};
          this.playlist.unshift(playlistObject);
          callback(playlistObject.title);
        }
      }.bind(this));      
    }

    remove(index) {
      for (let i = 0; i < this.playlist.length; i++) {
        if (this.playlist[i].index == index) {
          this.playlist.splice(i, 1);
          return 0;
        }
      }
      return 1;
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
        return this.playlist[this.playlist.length - 1];
      }
      return undefined;      
    }

    toto() {
      return {};
    }

    getPlaylist() {
      return this.playlist;
    }

}
