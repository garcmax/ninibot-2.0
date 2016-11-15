'use strict';
const should = require("should");
const sinon = require("sinon");

import Playlist from "../src/music/playlist.js";

describe ('playlist class helper', function () {
  var pl;
  beforeEach(function () {
    pl = new Playlist();
  });
  it('should add an url to playlist', function (done) {
    let url = "https://www.youtube.com/watch?v=MZuSaudKc68";
    pl.add(url);
    let list = pl.getPlaylist();
    list[0].index.should.equal(0);
    list[0].url.should.equal("https://www.youtube.com/watch?v=MZuSaudKc68");
    done();
  });
  it('should delete an url from playlist', function (done) {
    let url = "https://www.youtube.com/watch?v=MZuSaudKc68";
    pl.add(url);
    pl.getPlaylist().length.should.equal(1);
    pl.remove(url);
    pl.getPlaylist().length.should.equal(0);
    done();
  });
});
