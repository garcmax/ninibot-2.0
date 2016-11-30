'use strict';

import * as signIn from "./src/login/login.js";
import commandDispatcher from "./src/commands/commandDispatcher.js";
import * as orwell from "./src/bot/censorship.js";
import * as config from "./src/config/config.js";
import * as music from "./src/music/music.js";

// import the discord.js module
const Discord = require('discord.js');

// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();

// load every need files before using them
config.loadFiles();

// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', () => {
  console.log('I am ready!');
});

//login
signIn.login(bot);

bot.on('message', message => {
  if (message.author != bot.user) {
    if (message.channel.name === 'music') {
      console.log(`ninibot.js : ${message.content}`);
      music.manageCommands(message);
    } else if (orwell.censor(message) == 1) {
      commandDispatcher(message);
    }
  }
});

bot.on('disconnect', function(error) {
    if (error)
      console.log(error);
    console.log("disconnect");
});

bot.on('error', error => {
  console.log(error);
});

