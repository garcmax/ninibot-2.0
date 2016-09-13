'use strict';

export function pong(message) {
     message.channel.sendMessage("pong!")
    .then(message => console.log(`Sent message: ${message.content}`))
    .catch(console.log);
}

