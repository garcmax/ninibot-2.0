'use strict';
const should = require("should");
const sinon = require("sinon");

import * as cmd from "../src/commands/commandDispatcher.js";

describe ('the command extractor', function () {
  it('should get the correct command', function (done) {
    let correctCmd = "!command ninibot"
    let message = {
      content: correctCmd
    };
    let command = cmd.extractCommand(message);
    command.should.equal("!command");
    done();
  });
});
