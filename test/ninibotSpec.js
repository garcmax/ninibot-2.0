'use strict';
const should = require("should");
const sinon = require("sinon");
const sinonAsPromised = require('sinon-as-promised');
const Discord = require("discord.js");

import ping from "../src/commands/ping.js"

/*describe ('message event', function () {
  it('should be called only once', function (done) {
    let spy = sinon.spy();
    let bot = new Discord.Client();
    bot.on('message', spy);
    bot.emit('message');
    spy.called.should.equal.true;
    done();
  });
});

describe ('bot commands', function () {
  it ('should get the command from the message', function (done) {
    let stub = sinon.stub();
    let bot = new Discord.Client();
    let message = {
      content: "!ping"
    }; 
    bot.on('message', stub);
    bot.emit('message');
    let spy = sinon.spy(ping);
    stub.resolves(message);

    done();
  });
  it('should execute pong command', function (done) {
    let stub = sinon.stub();
    let bot = new Discord.Client();
    let message = {
      content: "!toto"
    }; 
    bot.on('message', stub);
    bot.emit('message');
    let spy = sinon.spy(ping);
    stub.resolves(message);
    spy.calledOnce.should.equal.true;
    stub().then(function(value) {
        console.log(message === value);
    })
    done();
  });
});*/