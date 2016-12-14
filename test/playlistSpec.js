'use strict';
const should = require("should");
const sinon = require("sinon");

import Playlist from "../src/music/playlist.js";
import * as mm from "../src/commands/multimedia.js";

describe ('playlist class helper', function () {
  var pl;
  var callback;
  beforeEach(function () {
    callback = sinon.spy();
    pl = new Playlist();
  });
  afterEach(function () {
    mm.getVideoInfo.restore();
  });
  it('should add an url to playlist', function (done) {        
    sinon.stub(mm, "getVideoInfo").yields(undefined, "title");    
    let url = "https://www.youtube.com/watch?v=MZuSaudKc68";
    pl.add(url, "id", "me", callback);
    mm.getVideoInfo.calledOnce.should.be.true();
    pl.getPlaylist()[0].url.should.equal("https://www.youtube.com/watch?v=MZuSaudKc68");
    pl.getPlaylist()[0].title.should.equal("title");
    pl.getPlaylist()[0].author.should.equal("me");
    pl.getPlaylist()[0].index.should.equal(1);
    callback.calledOnce.should.be.true();
    callback.calledWith("title").should.be.true();    
    done();
  });  
  it('should return an error when adding a bad url', function (done) {           
    sinon.stub(mm, "getVideoInfo").yields("error", "title");  
    let url = "https://www.loltube.kek/watch?v=MZuSaudKc68";
    pl.add(url, "id", "me", callback);
    mm.getVideoInfo.calledOnce.should.be.true();
    callback.calledOnce.should.be.true();
    callback.calledWith(1).should.be.true();
    pl.getPlaylist().length.should.equal(0);
    done();
  });
  it('should delete an url from playlist', function (done) {        
    sinon.stub(mm, "getVideoInfo").yields(undefined, "title");
    let url = "https://www.youtube.com/watch?v=MZuSaudKc68";
    pl.add(url, "id", "me", callback);
    pl.getPlaylist().length.should.equal(1);
    pl.remove(1).should.equal(0);
    pl.getPlaylist().length.should.equal(0);
    pl.add(url, "id", "me", callback);
    pl.add(url, "id", "me", callback);
    pl.add(url, "id", "me", callback);
    pl.add(url, "id", "me", callback);
    pl.remove(2).should.equal(0);
    pl.getPlaylist().length.should.equal(3);
    pl.remove(2).should.equal(1);
    pl.getPlaylist().length.should.equal(3);
    pl.add(url, "id", "me", callback);
    pl.getPlaylist().length.should.equal(4);
    pl.remove(5).should.equal(0);
    pl.getPlaylist().length.should.equal(3);
    done();
  });
  it('should remove the played url and tell if there is a next song', function(done) {        
    sinon.stub(mm, "getVideoInfo").yields(undefined, "title");
    pl.add("https://www.youtube.com/watch?v=MZuSaudKc68", "id", "me", callback);
    pl.add("https://www.youtube.com/watch?v=0L_iOnLNt9N", "id", "me", callback);
    pl.hasNext().should.be.true();;
    pl.getPlaylist()[0].url.should.equal("https://www.youtube.com/watch?v=0L_iOnLNt9N");
    pl.getPlaylist().length.should.equal(1);
    done();
  });
  it('should return undefined if there is no next song', function(done) {        
    sinon.stub(mm, "getVideoInfo").yields(undefined, "title");
    pl.add("https://www.youtube.com/watch?v=MZuSaudKc68", "id", "me", callback);
    pl.add("https://www.youtube.com/watch?v=0L_iOnLNt9N", "id", "me", callback);
    pl.current().url.should.equal("https://www.youtube.com/watch?v=MZuSaudKc68");
    pl.hasNext();
    pl.hasNext();
    (pl.current() === undefined).should.be.true();
    done();
  });
});




