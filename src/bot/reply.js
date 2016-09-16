'use strict';

export function reply(replyContent, message) {
     message.channel.sendMessage(replyContent)
    .then(message => console.log(`Sent message: ${message.content}`))
    .catch(console.log);
}

export function replyWithAuthor(replyContent, message) {
     reply(`${message.author} ${replyContent}`, message);    
}