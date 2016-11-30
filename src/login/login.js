'use strict';
import * as config from "../config/config.js";

const musicConnection = new config.MusicConnection();

/**
 * login with the discord token
 */
export function login(bot) {
    bot.login(config.credentials.discordToken).then(message => {        
        let musicChannel = bot.channels.filter(isMusicChannel);
        if (musicChannel) {
            musicConnection.musicChannelConnection = musicChannel.first().join();
        }
        console.log(`login token : ${message}`);
    });
}

function isMusicChannel(value) {
    console.log(`type = ${value.type} && name = ${value.name}`)
    return value.type === 'voice' && value.name === 'Music';
}

/**
 * logout gently
 */
export function logout(bot) {
    bot.destroy().then(() => {
        console.log("logout");
    });
}