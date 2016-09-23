'use strict';
const should = require("should");
const sinon = require("sinon");

import * as orwell from "../src/bot/censorship.js";
import * as bot from "../src/bot/reply.js";
import * as config from "../src/config/config.js";
const lang = new config.Language();

describe('censoring', function () {
    before(function () {
        config.loadFiles();
    });
    beforeEach(function () {
        sinon.stub(bot, 'replyWithAuthor');
    });
    afterEach(function () {
        bot.replyWithAuthor.restore();
    });
    it('should censor chocolatine', function (done) {
        let message = {
            content: 'chocolatine',
            delete: function () { return 0; }
        }
        sinon.spy(message, "delete");
        let ret = orwell.censor(message);
        bot.replyWithAuthor.calledOnce.should.equal(true);
        bot.replyWithAuthor.calledWith(`${config.strings['en'].censorship} pain au chocolat`, message).should.equal(true);
        message.delete.calledOnce.should.equal(true);
        ret.should.be.equal(0);
        message.delete.restore();
        done();
    });
    it('should not censor tzeentch', function (done) {
        let message = {
            content: 'tzeentch'
        }
        let ret = orwell.censor(message);
        bot.replyWithAuthor.calledOnce.should.equal(false);
        ret.should.equal(1);
        done();
    });
});

describe('add words to censor list', function () {
    var message;
    before(function () {
        message = {
            content: '!censor fiat fait',
            member: "member",
            guild: {owner: "member"}
        }
    });
    beforeEach(function () {
        sinon.stub(bot, 'replyInPM');
        sinon.stub(bot, 'replyInChannel');
    });
    afterEach(function () {
        config.addCensoredWord.restore();
        bot.replyInPM.restore();
        bot.replyInChannel.restore();
    });
    it('should add a word to censored strings', function (done) {
        sinon.stub(config, "addCensoredWord").yields(undefined);     
        orwell.addCensoredWord(message);
        config.addCensoredWord.calledOnce.should.equal(true);
        config.addCensoredWord.calledWith("fiat", "fait").should.equal(true);
        bot.replyInPM.calledOnce.should.equal(true);
        bot.replyInPM.calledWith(config.strings[lang.countryCode].addCensoredWordOK, message).should.equal(true);
        done();
    });
    it('should manage error from config', function (done) {
        sinon.stub(config, "addCensoredWord").yields("error");;
        orwell.addCensoredWord(message);
        config.addCensoredWord.calledOnce.should.equal(true);
        config.addCensoredWord.calledWith("fiat", "fait").should.equal(true);
        bot.replyInPM.calledOnce.should.equal(true);
        bot.replyInPM.calledWith(config.strings[lang.countryCode].addCensoredWordKO, message).should.equal(true);
        done();
    });
    it('should check role', function (done) {        
        sinon.stub(config, "addCensoredWord").yields("error");
        message.guild.owner = "foo"; 
        orwell.addCensoredWord(message);        
        bot.replyInChannel.calledOnce.should.equal(true);
        bot.replyInChannel.calledWith(config.strings[lang.countryCode].badPermission, message).should.equal(true);
        done();
    });
});

describe('display the censor list', function () {
    beforeEach(function () {
        sinon.stub(bot, 'replyInChannel');
    });
    afterEach(function () {
        config.addCensoredWord.restore();
        bot.replyInChannel.restore();
    });
    it('should display the list', function (done) {
        sinon.stub(config, "addCensoredWord").yields(undefined);
        let message = {
            content: '!orwell'
        }        
        orwell.displayCensorList(message);        
        bot.replyInChannel.calledOnce.should.equal(true);
        done();
    });
});