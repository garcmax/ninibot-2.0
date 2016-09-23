'use strict';
const should = require("should");
const sinon = require("sinon");
const fs = require("fs");

import * as config from "../src/config/config.js";


/*describe('censoring', function () {
    it('should append new word to file', function (done) {      
        fs.open('./src/static/test.json', 'w', function (err, fd) {
            if (err) {
                return console.error(err);
            }
            //console.log(`File opened successfully : ${fd}`);
            let str = JSON.stringify(config.censored);
            str = str.slice(0, str.length-1);
            str += ",\"2\" : [\"fiat\", \"fait\"]} ";
            fs.write(fd, str, function (err, written, string) {
                if (err) {
                    return console.error(err);
                }
                //console.log("Write to file successfully!");
                fs.readFile('./src/static/test.json', 'utf8', function(err, data) {
                    if (err) {
                        return console.error(err);
                    }
                    let test = JSON.parse(data);
                    //console.log(test[1]);
                });
            });
        });
        done();
    });
});*/

/*describe('censoring list', function () {
    it('should complete the list', function(done) {
        let callback = sinon.spy();
        sinon.stub(config, "loadCensored");
      
        config.addCensoredWord("fiat", "fait", callback, './test/test.json');
        config.loadCensored.calledOnce.should.equal(true);
        callback.calledOnce.should.equal(true);
        
        callback.reset();
        done();
    });
});*/