'use strict';
const should = require("should");
const sinon = require("sinon");

import * as ping from "../src/commands/ping.js";
import * as mm from "../src/commands/multimedia.js";
import * as lang from "../src/commands/lang.js";
import * as dice from "../src/commands/dice.js";
import * as man from "../src/commands/man.js";
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
    sinon.stub(man, "display");
  });
  afterEach(function() {
    ping.pong.restore();
    mm.imgur.restore();
    mm.youtube.restore();
    lang.change.restore();
    orwell.addCensoredWord.restore();
    orwell.displayCensorList.restore();
    man.display.restore();
  });
  it('should execute ping command', function (done) {
    commandDispatcher(message);
    ping.pong.calledOnce.should.equal(true);
    ping.pong.restore();
    done();
  });
  it('should execute imgur command', function (done) {
    sinon.stub(mm, "imgur");
    message.content ="!imgur";
    commandDispatcher(message);
    mm.imgur.calledOnce.should.equal(true);
    mm.imgur.restore();
    done();
  });
  it('should execute language command', function (done) {
    sinon.stub(lang, "change");
    message.content ="!lang";
    commandDispatcher(message);
    lang.change.calledOnce.should.equal(true);
    lang.change.restore();
    done();
  });
  it('should execute youtube command', function (done) {
    sinon.stub(mm, "youtube");
    message.content ="!yt";
    commandDispatcher(message);
    mm.youtube.calledOnce.should.equal(true);
    mm.youtube.restore();
    done();
  });
  it('should execute add a word to censor list command', function (done) {
    sinon.stub(orwell, "addCensoredWord");
    message.content ="!1984";
    commandDispatcher(message);
    orwell.addCensoredWord.calledOnce.should.equal(true);
    orwell.addCensoredWord.restore();
    done();
  });
  it('should execute display censor list command', function (done) {
    sinon.stub(orwell, "displayCensorList");
    message.content ="!orwell";
    commandDispatcher(message);
    orwell.displayCensorList.calledOnce.should.equal(true);
    orwell.displayCensorList.restore();
    done();
  });
  it('should execute dice command', function (done) {
    sinon.stub(dice, "rolled");
    message.content ="!roll";
    commandDispatcher(message);
    dice.rolled.calledOnce.should.equal(true);
    dice.rolled.restore();
    done();
  });
  it('should execute man command', function (done) {
    message.content ="!man";
    commandDispatcher(message);
    man.display.calledOnce.should.equal(true);
    done();
  });
});
