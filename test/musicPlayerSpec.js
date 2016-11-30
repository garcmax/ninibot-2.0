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
  it('should play the first file from playlist', function (done) {
    musicPlayer.play();
    done();
  });  
  
});
