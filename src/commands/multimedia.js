'use strict';

const request = require('request'); 
import * as bot from "../bot/reply.js";
import * as config from "../config/config.js";
const lang = new config.Language();

/**
 * Will extract the desired options from the query and buit it
 */
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
  query = query.trim();
  return sort + window + query;
}

/**
	* Manage the imgur API response
 */
export function imgurCallback(error, response, message) {
    if (error) {
      bot.replyWithAuthor(config.strings[lang.countryCode].internetKO, message);
    } else {
      let res = JSON.parse(response.body); 
      let data = res.data ? res.data[0] : undefined;
      if(response.statusCode === 200 && data) {							
        bot.replyWithAuthor(data.link, message);          
      } else if (response.statusCode === 200 && !data) {          
        bot.replyWithAuthor(config.strings[lang.countryCode].imgurSearchKO, message);
      } else {          
        bot.replyWithAuthor(config.strings[lang.countryCode].imgurAPIKO, message);
      }
    }
}


/**
 * Ask imgur for the desired image
 */
export function imgur(message) {
    let query = buildImgurQuery(message.content.split(/\s/));
    if (query == -1) {
      bot.reply(config.strings[lang.countryCode].imgurHelp, message);
    } else {
      let options = {
      url: config.url.imgur + query,
      headers: {
        'Authorization' : config.credentials.imgurId
      }
    };
    request.get(options, function(error, response) {
        imgurCallback(error, response, message);
    });
  }
}

/**
 * Encode the url for imgur query
 */
export function encodeUrl(str) {
    return encodeURIComponent(str).replace(/%20/gi, '+');
}