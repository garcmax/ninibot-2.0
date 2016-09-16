'use strict';

import * as bot from "../bot/reply.js"

export function buildImgurQuery(opts) {
  let sort = "";
  let window = "";
  let query = "/?q=";
  let optIndex = 1;
  if (opts[optIndex] && opts[optIndex].charAt(0) === "-") {
    let opt1 = opts[optIndex].substr(1);
    if (opt1 === "help") {
      return -1;
    }
    sort = "/" + opt1;
    optIndex++;
    if (opts[optIndex] && opts[optIndex].charAt(0) === "-") {
      let opt2 = opts[optIndex].substr(1);
      window = "/" + opt2;
      optIndex++;
    }
  }
  while (optIndex < opts.length) {   
    query = query + encodeUrl(opts[optIndex]) + " ";
    optIndex++;
  }
  return sort + window + query;
}

export function imgur(message) {
    let query = buildImgurQuery(message.content.split(/\s/));
    if (query == -1) {
      bot.reply("help");
    }
}

export function encodeUrl(str) {
    return encodeURIComponent(str).replace(/%20/gi, '+');
}