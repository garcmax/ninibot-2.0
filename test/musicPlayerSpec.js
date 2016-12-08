'use strict';
const should = require("should");
const sinon = require("sinon");

const ytdl = require('ytdl-core');

import MusicPlayer from "../src/music/musicPlayer.js";
import * as config from "../src/config/config.js";

describe ('Music Player', function () {
  var musicPlayer;
  var dispatcher;
  before(function() {
    musicPlayer = new MusicPlayer();
    dispatcher = {
      pause : function() {},
      resume : function() {},
      end : function() {}
    }    
  });  
  beforeEach(function() {
    musicPlayer.setDispatcher(dispatcher);
  });
  it('should pause a file', function (done) {
    sinon.spy(dispatcher, "pause");
    musicPlayer.pause();
    musicPlayer.setDispatcher(undefined);
    musicPlayer.pause();
    dispatcher.pause.calledOnce.should.be.true();
    dispatcher.pause.restore();
    done();
  });  
  it('should resume a file', function (done) {
    sinon.spy(dispatcher, "resume");
    musicPlayer.resume();
    musicPlayer.setDispatcher(undefined);
    musicPlayer.resume();
    dispatcher.resume.calledOnce.should.be.true();
    dispatcher.resume.restore();
    done();
  });
  it('should end a file', function (done) {
    sinon.spy(dispatcher, "end");
    musicPlayer.skip();
    musicPlayer.setDispatcher(undefined);
    musicPlayer.skip();
    dispatcher.end.calledOnce.should.be.true();
    dispatcher.end.restore();
    done();
  });
});
