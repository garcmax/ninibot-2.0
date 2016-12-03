'use strict';
const should = require("should");
const sinon = require("sinon");
const when = require('when');

// import the discord.js module
const Discord = require('discord.js');

// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();

import * as reply from "../src/bot/reply.js";
import * as login from "../src/login/login.js";
import * as config from "../src/config/config.js";
const musicConnection = new config.MusicConnection();

describe('login process', function () {
    beforeEach(function () {
        sinon.stub(bot, 'login').withArgs(config.credentials.discordToken)
            .returns(when("message"));
    });
    afterEach(function () {
        bot.login.restore();
    });
    it("should flowlessly log", function (done) {       
        login.login(bot);
        bot.login.calledOnce.should.be.true();
        done();
    });
});