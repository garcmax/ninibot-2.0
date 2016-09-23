'use strict';

import * as ping from "./ping.js";
import * as mm from "./multimedia.js";
import * as lang from "./lang.js";
import * as orwell from "../bot/censorship.js";

/**
 * Extract the desired command from the message
 */
export function extractCommand(message) {
    let options = message.content.split(/\s/);
    return options[0];
}

/**
 * Route ninibot to execute given command
 */
function commandDispatcher(message) {    
        let command = extractCommand(message);
        if (command === '!ping') {            
            ping.pong(message);
        } else if (command === '!imgur') {
            mm.imgur(message);
        } else if (command === '!lang') {
            lang.change(message);
        } else if (command === '!yt') {
            mm.youtube(message);
        } else if (command === '!1984') {            
            orwell.addCensoredWord(message);
        } else if (command === '!orwell') {
            orwell.displayCensorList(message);
        }
}

export default commandDispatcher;
