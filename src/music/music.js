'use strict';

import * as config from "../config/config.js";
import Playlist from "./playlist.js";
import MusicPlayer from "./musicPlayer.js";
import * as bot from "../bot/reply.js";

const lang = new config.Language(); 
var pl = new Playlist();
var mp;
var dispatcher = {};

export function extractMusicChannelConnection(bot) {
    let musicChannel = bot.channels.filter(isMusicChannel);
    if (musicChannel) {
        musicChannel.join().then(connection => {
            mp = new MusicPlayer(connection);
        }).catch(console.error);
        console.log(`music channel = ${musicChannel}`);
    }
}

function isMusicChannel(value) {
    console.log(`type = ${value.type} && name = ${value.name}`)
    return value.type === 'voice' && value.name === 'Music';
}

export function addMusic(message) {
    let url = message.content.substr(5);
    pl.add(url);
}

export function playMusic() {
    mp.play();    
}