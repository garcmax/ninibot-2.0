'use strict';

function ping(message) {
     message.channel.sendMessage("pong!")
    .then(message => console.log(`Sent message: ${message.content}`))
    .catch(console.log);
}

export default ping;