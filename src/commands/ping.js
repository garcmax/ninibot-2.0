'use strict';

import * as bot from "../bot/reply.js"
import * as config from "../config/config.js"
var lang = new config.Language();


export function pong(message) {
     bot.reply(config.strings[lang.countryCode].ping, message);
}

