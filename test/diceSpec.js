'use strict';
const should = require("should");
const sinon = require("sinon");

const dice = require("dice-rpg");
import * as di from "../src/commands/dice.js";
import * as bot from "../src/bot/reply.js";

describe('dice command', function() {
  beforeEach(function() {
      sinon.stub(bot, 'replyWithAuthor');
      sinon.stub(dice, "rolled").returns({'6' : [4, 2], '20': [20]});
  });
  afterEach(function() {
      bot.replyWithAuthor.restore();
      dice.rolled.restore();
  });
  it('should roll a d6', function (done) {
    let message = {
        content: "!roll 2d6 d20"
    }
    di.rolled(message);
    dice.rolled.calledOnce.should.be.ok();
    dice.rolled.calledWith("2d6 d20").should.be.ok();
    done();
  });
  it('should write the results from d6', function (done) {
    let message = {
        content: "!roll d6"
    }
    di.rolled(message);
    bot.replyWithAuthor.calledOnce.should.be.ok();
    bot.replyWithAuthor.calledWith("results from d6 : 4,2 ; from d20 : 20", message).should.be.ok();
    done();
  });
});

describe('dice command', function() {
  before(function() {
      sinon.stub(bot, 'replyWithAuthor');
      sinon.stub(dice, "rolled").returns({"error" : "bad input"});
  });
  after(function() {
      bot.replyWithAuthor.restore();
      dice.rolled.restore();
  });
  it('should manage error', function (done) {
    let message = {
        content: "!roll 2dd6 d20"
    }
    di.rolled(message);
    dice.rolled.calledOnce.should.be.ok();
    bot.replyWithAuthor.calledWith("are you sure of your dices ?", message).should.be.ok();
    done();
  });
});
