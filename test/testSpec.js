'use strict';
const should = require("should");
const sinon = require("sinon");
const fs = require("fs");

import * as config from "../src/config/config.js";


describe('censoring', function () {
    it('should append new word to file', function (done) {      
        fs.open('./src/static/test.json', 'w', function (err, fd) {
            if (err) {
                return console.error(err);
            }
            console.log(`File opened successfully : ${fd}`);
            let str = JSON.stringify(config.censored);
            str = str.slice(0, str.length-1);
            str += ",\"2\" : [\"fiat\", \"fait\"]} ";
            fs.write(fd, str, function (err, written, string) {
                if (err) {
                    return console.error(err);
                }
                console.log("Write to file successfully!");
                fs.readFile('./src/static/test.json', 'utf8', function(err, data) {
                    if (err) {
                        return console.error(err);
                    }
                    let test = JSON.parse(data);
                    console.log(test[1]);
                });
            });
        });
        done();
    });
});