'use strict';
const should = require("should");
const sinon = require("sinon");

import * as reply from "../src/bot/reply.js";
import * as login from "../src/login/login.js";
import * as config from "../src/config/config.js";
const lang = new config.Language();

describe('login process', function () {
    it ("should flowlessly log", function (done) {
        sinon.stub(bot, 'login').withArgs(config.credentials.discordToken).yields("toto");
        login.login(bot);
        done();
    })
});