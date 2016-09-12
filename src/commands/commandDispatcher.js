'use strict';

import ping from "./ping.js";


function extractCommand(message) {
    let options = message.content.split(/\s/);
    return options[0];
}

function commandDispatcher(message) {
    let command = extractCommand(message);

    if (command === '!ping') {
       ping(message);
    }
}

export default commandDispatcher;