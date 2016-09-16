'use strict';
const should = require("should");
const sinon = require("sinon");

import * as ping from "../src/commands/ping.js";
import * as mm from "../src/commands/multimedia.js";
import *as lang from "../src/commands/lang.js";
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
    sinon.stub(lang, "change");
  });
  afterEach(function() {
    ping.pong.restore();
    mm.imgur.restore();
    lang.change.restore();
  });
   it('should not execute command from self', function (done) {
    commandDispatcher(message, "the bot");
    ping.pong.called.should.equal(false);
    done();
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
});
