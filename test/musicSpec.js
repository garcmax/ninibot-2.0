'use strict';
const should = require("should");
const sinon = require("sinon");

const ytdl = require('ytdl-core');

import MusicPlayer from "../src/music/musicPlayer.js";
import * as music from "../src/music/music.js";
import * as config from "../src/config/config.js";

/*describe('Music Manager', function () {
    var message;
    before(function () {
        message = {
            content: "!play",
            author: "the bot"
        };
    });
    /*
    ** http://stackoverflow.com/questions/32695244/how-to-mock-dependency-classes-for-unit-testing-with-mocha-js
    */
   /* it('should play the music', function (done) {
        sinon.stub(MusicPlayer.prototype, 'play');
        music.manageCommands(message);
        MusicPlayer.prototype.play.calledOnce.should.equal(true);
        MusicPlayer.prototype.play.restore();
        done();
    });
    it('should pause the music', function (done) {
        message.content = "!pause";
        sinon.stub(MusicPlayer.prototype, 'pause');
        music.manageCommands(message);
        MusicPlayer.prototype.pause.calledOnce.should.equal(true);
        MusicPlayer.prototype.pause.restore();
        done();
    });
    it('should resume the music', function (done) {
        message.content = "!resume";
        sinon.stub(MusicPlayer.prototype, 'resume');
        music.manageCommands(message);
        MusicPlayer.prototype.resume.calledOnce.should.equal(true);
        MusicPlayer.prototype.resume.restore();
        done();
    });
});*/