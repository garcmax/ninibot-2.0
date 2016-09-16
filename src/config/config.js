'use strict';
const fs = require('fs');

export const credentials = {
  "googleToken" : process.env.NODE_GOOGLE_API_TOKEN,
  "imgurId" : "Client-ID " + process.env.NODE_IMGUR_CLIENT_ID,  
  "discordToken" : process.env.NODE_NINIBOT_TOKEN
};

export const url = {
  "imgur" : "https://api.imgur.com/3/gallery/search"
}

export var strings;

fs.readFile('./src/static/strings.json', 'utf8', function (err, data) {
    if (err) throw err;
    strings = JSON.parse(data);
});


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