'use strict';
import credentials from "../config/credentials.js";

/**
 * login with the discord token
 */
export function login(bot) {
    bot.login(credentials.discordToken).then(message => {
        console.log(message);
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