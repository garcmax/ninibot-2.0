'use strict';
const should = require("should");
const sinon = require("sinon");

import censor from "../src/bot/censorship.js";
import * as bot from "../src/bot/reply.js";
import * as config from "../src/config/config.js";
const lang = new config.Language();

describe('censoring', function() {
    before(function() {
        config.loadFiles();
    });
    beforeEach(function() {
        sinon.stub(bot, 'replyWithAuthor');    
    });
    afterEach(function() {
        bot.replyWithAuthor.restore();
    });
    it('should censor chocolatine', function (done) {
        let message = {
            content :'chocolatine'
        }
        message = censor(message);
        bot.replyWithAuthor.calledOnce.should.be.equal(true);
        bot.replyWithAuthor.calledWith(config.strings[lang.countryCode].censorship, message).should.be.equal(true);
        message.should.be.equal(message);
        done();
    });
     it('should not censor tzeentch', function (done) {
        let message = {
            content :'tzeentch'
        }
        message = censor(message);
        bot.replyWithAuthor.calledOnce.should.be.equal(false);        
        message.should.be.equal(message);
        done();
    });
});