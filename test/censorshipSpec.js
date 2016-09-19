'use strict';
const should = require("should");
const sinon = require("sinon");

import censor from "../src/bot/censorship.js";

describe('censoring', function() {
  it('should censor chocolatine', function (done) {
    let message = {
        content :'chocolatine'
    }
    message = censor(message);
    message.content.should.be.equal("pain au chocolat");
    done();
  });
});