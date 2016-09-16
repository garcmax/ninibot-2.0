'use strict';

import * as ping from "./ping.js";
import * as mm from "./multimedia.js";

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
    }
}

export default commandDispatcher;
