'use strict';

import * as ping from "./ping.js";
import * as mm from "./multimedia.js";
import * as lang from "./lang.js";

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
function commandDispatcher(message, self) {
    if (message.author != self) {
        let command = extractCommand(message);
        if (command === '!ping') {
            ping.pong(message);
        } else if (command === '!imgur') {
            mm.imgur(message);
        } else if (command === '!lang') {
            lang.change(message);
        }
    }
}

export default commandDispatcher;
