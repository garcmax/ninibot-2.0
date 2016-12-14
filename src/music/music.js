'use strict';

import MusicPlayer from "./musicPlayer.js";
import Playlist from "./playlist.js";
import * as config from "../config/config.js";
import * as dispatcher from "../commands/commandDispatcher.js";
import * as bot from "../bot/reply.js";
const lang = new config.Language(); 

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
        } else if (command === '!remove') {            
            removeFromPlaylist(message);
        }
    }
}

function removeFromPlaylist(message) {
    let index = parseInt(message.content.slice(8), 10);
    if (pl.remove(index) == 0) {
        bot.replyInChannel(config.strings[lang.countryCode].removeSongOK, message);
    } else {
        bot.replyInChannel(config.strings[lang.countryCode].removeSongKO, message);
    }
}

function displayPlaylist(message) {
    let list = pl.getPlaylist();
    if (list.length == 0) {
        bot.replyInChannel(config.strings[lang.countryCode].playlistEmpty, message);   
        return 0;     
    } 
    let answer = "```";
    for (let i = list.length - 1; i >= 0; i--) {
        answer += `
${list[i].index}. ${list[i].author} ${config.strings[lang.countryCode].requested}${list[i].title}`;
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
            bot.replyInChannel(config.strings[lang.countryCode].addKO, message);
        } else {
            bot.replyInChannel(`${data} ${config.strings[lang.countryCode].addOK}`, message);
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
    if (current) {
        bot.replyInChannel(`${config.strings[lang.countryCode].currentlyPlaying}${current.title} ${config.strings[lang.countryCode].curatedBy}${current.author}`, message);
    } else {
        bot.replyInChannel(config.strings[lang.countryCode].currentlyPlayingKO, message);
    }
}