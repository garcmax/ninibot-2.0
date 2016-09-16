'use strict';

import * as bot from "../bot/reply.js"
import * as config from "../config/config.js"
const lang = new config.Language();


export function pong(message) {
     bot.replyInChannel(`${config.strings[lang.countryCode].ping}${config.credentials.ninibotVersion}.`, message);
}

