'use strict';
const should = require("should");
const sinon = require("sinon");

import * as pl from "../src/helper/playlist.js";

describe ('playlist helper', function () {
  it('should add an url to playlist', function (done) {
    console.log(pl);
    let playlist = [];
    let url = "https://www.youtube.com/watch?v=MZuSaudKc68";
    playlist = pl.add(url, playlist);
    playlist[0].index.should.equal(0);
    playlist[0].url.should.equal("https://www.youtube.com/watch?v=MZuSaudKc68");
    done();
  });
  it('should delete an url from playlist', function (done) {
    let playlist = [ {"index" : 0 , "url" : "https://www.youtube.com/watch?v=MZuSaudKc68"}];
    let url = "https://www.youtube.com/watch?v=MZuSaudKc68";
    playlist = pl.remove(url, playlist);
    playlist.length.should.equal(0);
    done();
  });
});
