'use strict';

import * as bot from "./reply.js";
import * as config from "../config/config.js"
const lang = new config.Language();

function censor(message) {
    let content = message.content;
    if (content.search(/chocolatine/) != -1) {
        content = content.replace(/chocolatine/gi, "pain au chocolat");
        content = `${config.strings['en'].censorship} ${content}`;
        console.log(content);
        bot.replyWithAuthor(content, message);
        message.delete();
        return 0; 
    }
    return 1;
}

export default censor;