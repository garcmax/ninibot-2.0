'use strict';
const should = require("should");
const sinon = require("sinon");

import * as ping from "../src/commands/ping.js";
import * as mm from "../src/commands/multimedia.js";
import * as lang from "../src/commands/lang.js";
import * as music from "../src/music/music.js";
import * as orwell from "../src/bot/censorship.js";
import commandDispatcher from "../src/commands/commandDispatcher.js";



describe ('commands call', function () {
  var message;
  before(function() {
    message = {
      content: "!ping",
      author: "the bot"
    };
  });
  beforeEach(function() {
    sinon.stub(ping, "pong");
    sinon.stub(mm, "imgur");
    sinon.stub(mm, "youtube");
    sinon.stub(lang, "change");
    sinon.stub(orwell, "addCensoredWord");
    sinon.stub(orwell, "displayCensorList");
    sinon.stub(music, "playMusic");
    sinon.stub(music, "addMusic");
  });
  afterEach(function() {
    ping.pong.restore();
    mm.imgur.restore();
    mm.youtube.restore();
    lang.change.restore();
    orwell.addCensoredWord.restore();
    orwell.displayCensorList.restore();
    music.playMusic.restore();
    music.addMusic.restore();
  });
  it('should execute ping command', function (done) {
    commandDispatcher(message, undefined);
    ping.pong.calledOnce.should.equal(true);
    done();
  });
  it('should execute imgur command', function (done) {
    message.content ="!imgur";
    commandDispatcher(message, undefined);
    mm.imgur.calledOnce.should.equal(true);
    done();
  });
  it('should execute language command', function (done) {
    message.content ="!lang";
    commandDispatcher(message, undefined);
    lang.change.calledOnce.should.equal(true);
    done();
  });
  it('should execute youtube command', function (done) {
    message.content ="!yt";
    commandDispatcher(message, undefined);
    mm.youtube.calledOnce.should.equal(true);
    done();
  });
  it('should execute add a word to censor list command', function (done) {
    message.content ="!1984";
    commandDispatcher(message, undefined);
    orwell.addCensoredWord.calledOnce.should.equal(true);
    done();
  });
  it('should execute display censor list command', function (done) {
    message.content ="!orwell";
    commandDispatcher(message, undefined);
    orwell.displayCensorList.calledOnce.should.equal(true);
    done();
  });
  it('should execute play music command', function (done) {
    message.content ="!play";
    commandDispatcher(message, undefined);
    music.playMusic.calledOnce.should.equal(true);
    done();
  });
   it('should execute add music command', function (done) {
    message.content ="!add";
    commandDispatcher(message, undefined);
    music.addMusic.calledOnce.should.equal(true);
    done();
  });
});
