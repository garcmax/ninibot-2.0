'use strict';
const should = require("should");
const sinon = require("sinon");

const ytdl = require('ytdl-core');

import MusicPlayer from "../src/music/musicPlayer.js";
import * as config from "../src/config/config.js";

describe ('Music Player', function () {
  var mp;
  beforeEach(function () {
    mp = new MusicPlayer({playStream : function(stream) {}});
  });
  afterEach(function () {
  })
  it('should tell if a music is playing', function (done) {
    mp.isPlaying().should.be.false();
    done();
  });  
  /*it('should play a stream', function (done) {
    mp.play({});    
    mp.isPlaying().should.be.true();
    done();
  });*/
});
