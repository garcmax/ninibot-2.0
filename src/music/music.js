'use strict';

import MusicPlayer from "./musicPlayer.js";
import * as config from "../config/config.js";
import * as dispatcher from "../commands/commandDispatcher.js";

var mp = new MusicPlayer();

function connect(bot) {
    let musicChannel = bot.channels.filter(isMusicChannel);
    if (musicChannel) {
        mp.setConnection(musicChannel.first().join());        
    }
}

export function manageCommands(message) {
    console.log(mp.connection);
    if (!mp.connection) {
        connect(message.client);
    }
    let command = dispatcher.extractCommand(message);
    console.log(`music.js : ${command}`);
    if (command === '!play') {
        mp.play();
    } else if (command === '!pause') {
        mp.pause();
    } else if (command === '!resume') {
        mp.resume();
    }
}


function isMusicChannel(value) {
    console.log(`type = ${value.type} && name = ${value.name}`)
    return value.type === 'voice' && value.name === 'Music';
}