'use strict';
const fs = require('fs');

export const credentials = {
  "googleToken" : process.env.NODE_GOOGLE_API_TOKEN,
  "imgurId" : "Client-ID " + process.env.NODE_IMGUR_CLIENT_ID,  
  "discordToken" : process.env.NODE_NINIBOT_TOKEN,
  "ninibotVersion": process.env.npm_package_version
};

export const url = {
  "imgurAPI" : "https://api.imgur.com/3/gallery/search",
  "youtubeAPI": "https://www.googleapis.com/youtube/v3/search?part=id&maxResults=1&order=relevance&type=video&q=",
  "youtubeVideo" :"http://www.youtube.com/watch?v="
}

export var strings;
export var censored;

let instance = null;

export class Language {
  constructor() {
    if (!instance) {
      instance = this;
    }
    this.countryCode = "en";
    return instance;
  }
}

export function loadFiles() {
  let str = fs.readFileSync('./src/static/strings.json', 'utf8');
  strings = JSON.parse(str); 
  console.log('strings is loaded');
  let cs = fs.readFileSync('./src/static/censored.json', 'utf8');
  censored = JSON.parse(cs); 
  console.log('censored is loaded');
}