'use strict';
const should = require("should");
const sinon = require("sinon");

import * as man from "../src/commands/man.js";
import * as bot from "../src/bot/reply.js";
import * as config from "../src/config/config.js";
const l = new config.Language();

describe ('Man', function () {
    beforeEach(function () {
        sinon.stub(bot, "replyInPM");        
    });
    afterEach(function () {
        bot.replyInPM.restore();
    });
    it('should display the man', function (done) {
        let message = {};
        man.display(message);
        bot.replyInPM.calledOnce.should.be.equal(true);
        bot.replyInPM.calledWith(config.strings['en'].man, message).should.be.equal(true);
        done();
    });
});