'use strict';
import * as config from "../config/config.js";

const musicConnection = new config.MusicConnection();

/**
 * login with the discord token
 */
export function login(bot) {
    bot.login(config.credentials.discordToken).then(message => {        
        console.log(`login token : ${message}`);
    });
}

/**
 * logout gently
 */
export function logout(bot) {
    bot.destroy().then(() => {
        console.log("logout");
    });
}