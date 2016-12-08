'use strict';
const should = require("should");
const sinon = require("sinon");

import Playlist from "../src/music/playlist.js";
import * as mm from "../src/commands/multimedia.js";

describe ('playlist class helper', function () {
  var pl;
  beforeEach(function () {
    sinon.stub(mm, "getVideoInfo").yields(undefined, "title");
    pl = new Playlist();
  });
  afterEach(function () {
    mm.getVideoInfo.restore();
  });
  it('should add an url to playlist', function (done) {        
    let url = "https://www.youtube.com/watch?v=MZuSaudKc68";
    pl.add(url, "id", "me");
    mm.getVideoInfo.calledOnce.should.be.true();
    pl.getPlaylist()[0].url.should.equal("https://www.youtube.com/watch?v=MZuSaudKc68");
    pl.getPlaylist()[0].title.should.equal("title");
    pl.getPlaylist()[0].author.should.equal("me");
    done();
  });  
  /*it('should return an error when adding a bad url', function (done) {        
    let url = "https://www.loltube.kek/watch?v=MZuSaudKc68";
    pl.add(url, "id", "me");
    mm.getVideoInfo.calledOnce.should.be.true();
    pl.getPlaylist().length.should.equal(0);
    done();
  });*/
  it('should delete an url from playlist', function (done) {
    let url = "https://www.youtube.com/watch?v=MZuSaudKc68";
    pl.add(url);
    pl.getPlaylist().length.should.equal(1);
    pl.remove(url);
    pl.getPlaylist().length.should.equal(0);
    done();
  });
  it('should remove the played url and tell if there is a next song', function(done) {
    pl.add("https://www.youtube.com/watch?v=MZuSaudKc68");
    pl.add("https://www.youtube.com/watch?v=0L_iOnLNt9N");
    pl.hasNext().should.be.true();;
    pl.getPlaylist()[0].url.should.equal("https://www.youtube.com/watch?v=0L_iOnLNt9N");
    pl.getPlaylist().length.should.equal(1);
    done();
  });
  it('should return undefined if there is no next song', function(done) {
    pl.add("https://www.youtube.com/watch?v=MZuSaudKc68");
    pl.add("https://www.youtube.com/watch?v=0L_iOnLNt9N");
    pl.current().url.should.equal("https://www.youtube.com/watch?v=MZuSaudKc68");
    pl.hasNext();
    pl.hasNext();
    (pl.current() === undefined).should.be.true();
    done();
  });
});




