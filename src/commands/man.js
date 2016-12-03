'use strict';

import * as config from "../config/config.js";
import * as bot from "../bot/reply.js";
const lang = new config.Language(); 

export function display(message) {
    bot.replyInPM(config.strings[lang.countryCode].man, message);
}