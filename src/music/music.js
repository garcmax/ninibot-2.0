'use strict';

import MusicPlayer from "./musicPlayer.js";
import * as config from "../config/config.js";
import * as dispatcher from "../commands/commandDispatcher.js";
import * as bot from "../bot/reply.js";

var mp = new MusicPlayer();

function connect(bot) {
    let musicChannel = bot.channels.filter(isMusicChannel);
    if (musicChannel) {
        mp.setConnection(musicChannel.first().join());
    }
}

export function manageCommands(message, bot) {
    if (!mp.connection) {
        connect(message.client);
    } else {
        let command = dispatcher.extractCommand(message);
        if (command === '!play') {
            mp.play();
        } else if (command === '!pause') {
            mp.pause();
        } else if (command === '!resume') {
            mp.resume();
        } else if (command === '!pl') {
            displayPlaylist(message);
        }  else if (command === '!add') {            
            mp.addToPlaylist(message.content.slice(5));
        }
    }
}

function displayPlaylist(message) {
    let pl = mp.getPlaylist();
    let answer = "\`\`\`";
    for (let i = 0; i < pl.length; i++) {
        answer += `
${pl[i].url}`;
    }
    bot.replyInChannel(answer, message);
}


function isMusicChannel(value) {
    console.log(`type = ${value.type} && name = ${value.name}`)
    return value.type === 'voice' && value.name === 'Music';
}