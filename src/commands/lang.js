'use strict';

import * as config from "../config/config.js";
import * as bot from "../bot/reply.js";
const lang = new config.Language(); 

export function change(message) {
    let options = message.content.split(/\s/);
    let cc = options[1];
    if (cc === lang.countryCode) {
        bot.reply(config.strings[cc].langAlreadySet, message);
    } else if (config.strings[options[1]]) {
        lang.countryCode = cc;
        bot.reply(config.strings[cc].langOK, message);
    } else {
        bot.reply(config.strings[lang.countryCode].langKO, message);
    }
}

