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
            content :'chocolatine',
            delete : function () {return 0;}
        }
        sinon.spy(message, "delete");
        let ret = censor(message);
        bot.replyWithAuthor.calledOnce.should.be.equal(true);
        bot.replyWithAuthor.calledWith(`${config.strings['en'].censorship} pain au chocolat`, message).should.be.equal(true);
        message.delete.calledOnce.should.be.equal(true);
        ret.should.be.equal(0);
        message.delete.restore();
        done();
    });
     it('should not censor tzeentch', function (done) {
        let message = {
            content :'tzeentch'
        }
        let ret = censor(message);
        bot.replyWithAuthor.calledOnce.should.be.equal(false);        
        ret.should.be.equal(1);
        done();
    });
});