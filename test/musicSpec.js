'use strict';
const should = require("should");
const sinon = require("sinon");
const when = require('when');

import * as music from "../src/music/music.js";
import Playlist from "../src/music/playlist.js";
import * as config from "../src/config/config.js";

// import the discord.js module
const Discord = require('discord.js');

// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();

describe ('Music player', function () {
  /*it('should add a song to the playlist', function (done) {
      let message = {
        content: "!add https://www.youtube.com/watch?v=51LMOJu9lwc"
      };   
      let pl = sinon.createStubInstance(Playlist, 'add');      
      music.addMusic(message);
      pl.add.calledWith('https://www.youtube.com/watch?v=51LMOJu9lwc').should.be.true();
      done();
  });*/

});
