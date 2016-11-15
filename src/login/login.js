'use strict';
import * as config from "../config/config.js";

/**
 * login with the discord token
 */
export function login(bot) {
    bot.login(config.credentials.discordToken).then(message => {
        console.log(`login token : ${message}`);
        let musicChannel = bot.channels.filter(isMusicChannel);
        console.log(`music channel = ${musicChannel}`);
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