'use strict';

export function reply(replyContent, channel) {
     channel.sendMessage(replyContent)
    .then(message => console.log(`Sent message: ${message.content}`))
    .catch(console.log);
}

export function replyInChannel(replyContent, message) {
    reply(replyContent, message.channel);
}

export function replyWithAuthor(replyContent, message) {
    reply(`${message.author} : ${replyContent}`, message.channel);    
}

export function replyInPM(replyContent, message) {
    reply(replyContent, message.author);
}