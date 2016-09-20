'use strict';

import * as bot from "./reply.js";
import * as config from "../config/config.js"
const lang = new config.Language();

export function addCensoredWord(message) {
    let opts = message.content.split(/\s/);
    config.addCensoredWord(opts[1], opts[2], function(err) {
        if (err) {
            bot.replyInPM(config.strings[lang.countryCode].addCensoredWordKO, message);
        } else {
            bot.replyInPM(config.strings[lang.countryCode].addCensoredWordOK, message);
        }
    });
}

export function censor(message) {
    let content = message.content;
    for (let i = 0; config.censored[i]; i++) {
        let words = config.censored[i];
        let regexp = new RegExp(words[0], "gi");
        if (content.search(regexp) != -1) {
            content = content.replace(regexp, words[1]);
            content = `${config.strings[lang.countryCode].censorship} ${content}`;
            bot.replyWithAuthor(content, message);
            message.delete();
            return 0; 
        }
    }
    return 1;
}
