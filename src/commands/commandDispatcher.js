'use strict';

import * as ping from "./ping.js";


export function extractCommand(message) {
    let options = message.content.split(/\s/);
    return options[0];
}

function commandDispatcher(message) {
    let command = extractCommand(message);

    if (command === '!ping') {
       ping.ping(message);
    }
}

export default commandDispatcher;
