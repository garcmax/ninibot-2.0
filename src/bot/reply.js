'use strict';

export function reply(reply, message) {
     message.channel.sendMessage(reply)
    .then(message => console.log(`Sent message: ${message.content}`))
    .catch(console.log);
}

export function replyWithAuthor(reply, message) {
     reply(`${message.author} ${reply}`);    
}