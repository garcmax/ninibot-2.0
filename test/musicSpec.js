'use strict';
const should = require("should");
const sinon = require("sinon");

const ytdl = require('ytdl-core');

import MusicPlayer from "../src/music/musicPlayer.js";
import * as music from "../src/music/music.js";
import * as bot from "../src/bot/reply.js";
import * as config from "../src/config/config.js";
const lang = new config.Language();


describe('Music Manager', function () {
    /*
    ** http://stackoverflow.com/questions/32695244/how-to-mock-dependency-classes-for-unit-testing-with-mocha-js
    */
    var message;
    var musicChannel;
    before(function () {
        musicChannel = {
            first: function() {
                return {
                    join: function() {
                        return {connection: "connection"}
                    }
                }
            }
        }
        message = {
            content: "!play",
            author: "the bot",
            client: {
                channels : {
                    filter: function() {
                        return null;
                    }
                }
            }                        
        };
        sinon.stub(MusicPlayer.prototype);
        MusicPlayer.prototype.connection = {};
        MusicPlayer.prototype.getPlaylist = function() {
            return [{index:0, url:"foo"}, {index:0, url:"bar"}];
        };       
        MusicPlayer.prototype.setConnection = function(connection) {
            MusicPlayer.prototype.connection = connection;
        };
    });    
    it('should play the music', function (done) {
        music.manageCommands(message);
        MusicPlayer.prototype.play.calledOnce.should.equal(true);
        done();
    });
    it('should pause the music', function (done) {
        message.content = "!pause";
        music.manageCommands(message);
        MusicPlayer.prototype.pause.calledOnce.should.equal(true);
        done();
    });
    it('should resume the music', function (done) {
        message.content = "!resume";
        music.manageCommands(message);
        MusicPlayer.prototype.resume.calledOnce.should.equal(true);
        done();
    });
    it('should create a connection', function(done) {
        MusicPlayer.prototype.connection = null;
        sinon.stub(message.client.channels, 'filter').returns(musicChannel);
        music.manageCommands(message);
        MusicPlayer.prototype.connection.should.exist;
        done();
    });
    it('should display the playlist', function (done) {
        sinon.stub(bot, 'replyInChannel');
        message.content = "!pl";       
        music.manageCommands(message);        
        bot.replyInChannel.calledOnce.should.equal(true);
        bot.replyInChannel.restore();
        done();
    });
    it('should add to playlist', function (done) {        
        message.content = "!add";
        music.manageCommands(message);        
        MusicPlayer.prototype.addToPlaylist.calledOnce.should.equal(true);
        done();
    });
});