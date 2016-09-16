'use strict';
const should = require("should");
const sinon = require("sinon");

import * as lang from "../src/commands/lang.js";
import * as bot from "../src/bot/reply.js";
import * as config from "../src/config/config.js";
const l = new config.Language();

describe ('Language manager', function () {
    beforeEach(function () {
        sinon.stub(bot, "reply");        
    });
    afterEach(function () {
        bot.reply.restore();
        l.countryCode = 'en';
    });
    it('should change the language with the expected one', function (done) {
        let message = {
            content: "!lang fr"
        }
        l.countryCode.should.be.equal('en');
        lang.change(message);
        bot.reply.calledOnce.should.be.equal(true);
        bot.reply.calledWith(config.strings['fr'].langOK, message).should.be.equal(true);
        l.countryCode.should.be.equal('fr');
        done();
    });
    it('should say that the language is already set', function (done) {
        let message = {
            content: "!lang en"
        }
        l.countryCode.should.be.equal('en');
        lang.change(message);
        bot.reply.calledOnce.should.be.equal(true);
        bot.reply.calledWith(config.strings['en'].langAlreadySet, message).should.be.equal(true);
        l.countryCode.should.be.equal('en');
        done();
    });
     it('should say that this language settings doesn\'t exist', function (done) {
        let message = {
            content: "!lang jp"
        }
        l.countryCode.should.be.equal('en');
        lang.change(message);
        bot.reply.calledOnce.should.be.equal(true);
        bot.reply.calledWith(config.strings['en'].langKO, message).should.be.equal(true);
        l.countryCode.should.be.equal('en');
        done();
    });
});