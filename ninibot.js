'use strict';

import * as signIn from "./src/login/login.js";
import commandDispatcher from "./src/commands/commandDispatcher.js";
import censor from "./src/bot/censorship.js";
import * as config from "./src/config/config.js";

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
    if (censor(message) == 1) {
        commandDispatcher(message, bot.user);
    }
});

bot.on('error', error => {
    console.log(error);
});

