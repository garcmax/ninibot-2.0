'use strict';

import MusicPlayer from "./musicPlayer.js";
import Playlist from "./playlist.js";
import * as config from "../config/config.js";
import * as dispatcher from "../commands/commandDispatcher.js";
import * as bot from "../bot/reply.js";

var mp = new MusicPlayer();
var pl = new Playlist();

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
        if (command === '!play' && !mp.isPlaying() && pl.getPlaylist().length > 0) {
            runPlay();
        } else if (command === '!pause') {
            mp.pause();
        } else if (command === '!resume') {
            mp.resume();
        } else if (command === '!pl') {
            displayPlaylist(message);
        }  else if (command === '!add') {            
            addToPlaylist(message.content.slice(5));
        }
    }
}

function displayPlaylist(message) {
    let list = pl.getPlaylist(); 
    let answer = "```";
    for (let i = 0; i < list.length; i++) {
        answer += `
${list[i].url}`;
    }
    answer += "```";
    bot.replyInChannel(answer, message);
}

function addToPlaylist(url) {
    pl.add(url);
}

function runPlay() {
    mp.play(pl.current(), function() {
        console.log('in play callback');
        if (pl.hasNext()) {
            console.log(`next song is : ${pl.current()}`);
            runPlay();
        } else {
            console.log('stop playing');
            mp.turnOff();
            console.log(mp.isPlaying());
        }
    });
}

function isMusicChannel(value) {
    console.log(`type = ${value.type} && name = ${value.name}`)
    return value.type === 'voice' && value.name === 'Music';
}