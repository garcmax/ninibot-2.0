'use strict';

import * as ping from "./ping.js";
import * as mm from "./multimedia.js";


export function extractCommand(message) {
    let options = message.content.split(/\s/);
    return options[0];
}

function commandDispatcher(message) {
    let command = extractCommand(message);

    if (command === '!ping') {
       ping.pong(message);
    } else if (command === '!imgur') {
       mm.imgur(message);
    }
}

export default commandDispatcher;
