'use strict';
const should = require("should");
const sinon = require("sinon");

const ytdl = require('ytdl-core');

import MusicPlayer from "../src/music/musicPlayer.js";
import * as config from "../src/config/config.js";

describe ('Music Player', function () {
  var musicPlayer;
  before(function() {
    musicPlayer = new MusicPlayer();
  });
  it('should manage the playlist', function (done) {
    musicPlayer.addToPlaylist('https://www.youtube.com/watch?v=J56VVtlZCGE');
    let playlist = musicPlayer.getPlaylist();
    playlist.should.exist;
    playlist.length.should.equal(1);
    playlist[0].url.should.equal('https://www.youtube.com/watch?v=J56VVtlZCGE');
    done();
  });  
  
});
