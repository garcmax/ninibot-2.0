'use strict';

import * as bot from "./reply.js";
import * as config from "../config/config.js"
const lang = new config.Language();

function censor(message) {
    let content = message.content;
    content = content.replace(/chocolatine/gi, "pain au chocolat");
    message.content = content;
    bot.replyWithAuthor(config.strings['en'].censorship, message);
    return message;
}

export default censor;