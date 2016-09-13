'use strict';
const should = require("should");
const sinon = require("sinon");

import * as ping from "../src/commands/ping.js";
import commandDispatcher from "../src/commands/commandDispatcher.js";


describe ('commands call', function () {
  it('should execute ping command', function (done) {
    let stub = sinon.stub(ping, "pong");
    let message = {
      content: "!ping"
    };
    commandDispatcher(message);
    stub.calledOnce.should.equal(true);
    done();
  });
});
