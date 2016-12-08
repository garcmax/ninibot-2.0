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
        } else if (command === '!add') {            
            addToPlaylist(message);
        } else if (command === '!current') {            
            getCurrent(message);
        } else if (command === '!skip') {            
            mp.skip();
        }
    }
}

function displayPlaylist(message) {
    let list = pl.getPlaylist();
    if (list.length == 0) {
        bot.replyInChannel("The playlist is empty", message);   
        return 0;     
    } 
    let answer = "```";
    for (let i = list.length - 1; i >= 0; i--) {
        answer += `
${list[i].author} has requested : ${list[i].title}`;
    }
    answer += "```";
    bot.replyInChannel(answer, message);
}

function addToPlaylist(message) {
    let url = message.content.slice(5);
    let author = message.author.username;
    let urlArray = url.split("=");
    pl.add(url, urlArray[1], author, function(data) {
        if (data == 1) {
            bot.replyInChannel(`Something went wrong with youtube, I will not add this song.`, message);
        } else {
            bot.replyInChannel(`${data} added to the playlist.`, message);
        }
    });
}

function runPlay() {
    mp.play(pl.current().url, function() {
        console.log('in play callback');
        if (pl.hasNext()) {
            console.log(`next song is : ${pl.current().url}`);
            runPlay();
        } else {
            console.log('stop playing');
            mp.turnOff();
        }
    });
}

function isMusicChannel(value) {
    console.log(`type = ${value.type} && name = ${value.name}`)
    return value.type === 'voice' && value.name === 'Music';
}

function getCurrent(message) {
    let current = pl.current();
    bot.replyInChannel(`currently playing : ${current.title} curated by ${current.author}`, message);
}