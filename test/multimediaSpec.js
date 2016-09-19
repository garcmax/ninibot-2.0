'use strict';
const should = require("should");
const sinon = require("sinon");
const request = require('request');

import * as mm from "../src/commands/multimedia.js";
import * as bot from "../src/bot/reply.js";
import * as config from "../src/config/config.js";
const lang = new config.Language();

describe('encoding url', function() {
  it('should encode accentuated characters', function (done) {
    let test = mm.encodeUrl("éèäû");
    test.should.be.equal("%C3%A9%C3%A8%C3%A4%C3%BB");
    done();
  });
  it('should encode change space in +', function (done) {
    let test = mm.encodeUrl("a b c");
    test.should.be.equal("a+b+c");
    done();
  });
});

describe ('build imgur query', function () {    
  it('should get a valid simple query', function (done) {
    let opts = ["!imgur", "slaanesh"];
    let query = mm.buildImgurQuery(opts);
    query.should.be.equal("/?q=slaanesh");
    done();
  });
  it('should get a query with a sort option', function (done) {
    let opts = ["!imgur", "-top", "slaanesh"];
    let query = mm.buildImgurQuery(opts);
    query.should.be.equal("/top/?q=slaanesh");
    done();
  });
   it('should get a query with a sort and window options', function (done) {
    let opts = ["!imgur", "-top", "-week", "slaanesh"];
    let query = mm.buildImgurQuery(opts);
    query.should.be.equal("/top/week/?q=slaanesh");
    done();
  });
  it('should get the help option', function (done) {
    let opts = ["!imgur", "-help", "khorne"];
    let query = mm.buildImgurQuery(opts);
    query.should.be.equal(-1);
    done();
  });
});

describe ('imgur search', function () {
  beforeEach(function() {
    sinon.stub(bot, 'replyInPM');
    sinon.stub(request, 'get');
  });
  afterEach(function() {
      request.get.restore();
      bot.replyInPM.restore();
  });
  it('should trigger imgur helper', function (done) {    
    let message = {
        content: "!imgur -help"
    }
    mm.imgur(message);
    bot.replyInPM.calledWith(config.strings[lang.countryCode].imgurHelp, message).should.be.equal(true);
    done();
  });
  it('should get an image', function (done) {
    let message = {
        content: "!imgur slaanesh"
    };
    let options = {
        url: config.url.imgur + "/?q=slaanesh",
        headers: {
          'Authorization' : config.credentials.imgurId
        }
    };
    mm.imgur(message);
    request.get.called.should.be.equal(true);
    request.get.calledWith(options).should.be.equal(true);
    done();
  });
});

describe('treat imgur response', function () {
    var response;
    var body;
    var bodyStringify;

    before(function () {
      body = {
        data: [
          {
            link: "http://www.imgur.com/a/1DE01"
          },
          {
            link: "http://www.imgur.com/a/1DE02"
          }
        ]
      };
      bodyStringify = JSON.stringify(body);
      response = { 
        statusCode: 200,
        body: bodyStringify
      };
    });
    beforeEach(function() {
        sinon.stub(bot, 'replyWithAuthor');    
    });
    afterEach(function() {
        bot.replyWithAuthor.restore();
    });
    it ('should reply that something went wrong with the API call', function () {
        mm.imgurCallback("error", response, "message");
        bot.replyWithAuthor.calledOnce.should.be.equal(true);
        bot.replyWithAuthor.calledWith(config.strings[lang.countryCode].internetKO, "message").should.be.equal(true);
    });
    it ('should reply with the received image', function () {    
        mm.imgurCallback(undefined, response, "message");
        bot.replyWithAuthor.calledOnce.should.be.equal(true);
        bot.replyWithAuthor.calledWith(body.data[0].link, "message").should.be.equal(true);
    });
    it ('should reply with the no data error message', function () {
        let bodyTmp = {};
        response.body =  JSON.stringify(bodyTmp);   
        mm.imgurCallback(undefined, response, "message");
        bot.replyWithAuthor.calledOnce.should.be.equal(true);
        bot.replyWithAuthor.calledWith(config.strings[lang.countryCode].imgurSearchKO, "message").should.be.equal(true);
    });
    it ('should reply with the bad status error message', function () {        
        response.statusCode = 401;  
        mm.imgurCallback(undefined, response, "message");
        bot.replyWithAuthor.calledOnce.should.be.equal(true);
        bot.replyWithAuthor.calledWith(config.strings[lang.countryCode].imgurAPIKO, "message").should.be.equal(true);
    });
});

describe('treat youtube response', function () {
    var response;
    var body;
    var bodyStringify;

    before(function () {      
      body = {
        items: [
          {
            id: {
              videoId: "0L_iOnLNt9M"
            }, 
          },
          {
            id: {
              videoId: "0L_iOnLNt9N"
            },
          }
        ]
      };
      bodyStringify = JSON.stringify(body);
      response = { 
        statusCode: 200,
        body: bodyStringify
      };
    });
    beforeEach(function() {
        sinon.stub(bot, 'replyWithAuthor');    
    });
    afterEach(function() {
        bot.replyWithAuthor.restore();
    });
    it ('should reply that something went wrong with the API call', function () {
        mm.ytCallback("error", response, "message");
        bot.replyWithAuthor.calledOnce.should.be.equal(true);
        bot.replyWithAuthor.calledWith(config.strings[lang.countryCode].internetKO, "message").should.be.equal(true);
    });
    it ('should reply with the received image', function () {    
        mm.ytCallback(undefined, response, "message");
        bot.replyWithAuthor.calledOnce.should.be.equal(true);
        bot.replyWithAuthor.calledWith(`${config.url.youtubeVideo}${body.items[0].id.videoId}`, "message").should.be.equal(true);
    });
    it ('should reply with the no data error message', function () {
        let bodyTmp = {};
        response.body =  JSON.stringify(bodyTmp);   
        mm.ytCallback(undefined, response, "message");
        bot.replyWithAuthor.calledOnce.should.be.equal(true);
        bot.replyWithAuthor.calledWith(config.strings[lang.countryCode].ytSearchKO, "message").should.be.equal(true);
    });
    it ('should reply with the bad status error message', function () {        
        response.statusCode = 401;  
        mm.ytCallback(undefined, response, "message");
        bot.replyWithAuthor.calledOnce.should.be.equal(true);
        bot.replyWithAuthor.calledWith(config.strings[lang.countryCode].ytAPIKO, "message").should.be.equal(true);
    });
});

describe ('youtube search', function () {
  beforeEach(function() {
    sinon.stub(bot, 'replyInPM');
    sinon.stub(request, 'get');
  });
  afterEach(function() {
      request.get.restore();
      bot.replyInPM.restore();
  });  
  it('should get a video', function (done) {
    let message = {
        content: "!yt rhapsody"
    };
    let options = {
        url: "https://www.googleapis.com/youtube/v3/search?part=id&maxResults=1&order=relevance&type=video&q=" + "rhapsody" + "&key=" + config.credentials.googleToken
    };
    mm.youtube(message);
    request.get.called.should.be.equal(true);
    request.get.calledWith(options).should.be.equal(true);
    done();
  });
});