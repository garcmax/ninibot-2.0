'use strict';

const ytdl = require('ytdl-core');
const when = require('when');

import * as config from "../config/config.js";
import * as bot from "../bot/reply.js";

const lang = new config.Language();

export default class MusicPlayer {
    constructor() {
        this.connection;
        this.dispatcher;
        this.playing = false;
    }

    play(url, toNextSong) {
        if (url) {
            this.playing = true;
            const stream = ytdl(url, { filter: 'audioonly' });
            stream.on('info', function(info) {
                console.log(info.length_seconds);
                playStreamCallback(stream);
            });

            let dispatcherCallback = function dispatcherCallback(dispatcher) {
                this.setDispatcher(dispatcher);
            }.bind(this);

            let playStreamCallback = function playStreamCallback(st) {
                this.connection.then(connection => {
                    let dispatcher = connection.playStream(st, { seek: 0, volume: 2 });
                    dispatcher.on('end', function() {
                        console.log('end in promise');
                        toNextSong();
                    });
                     dispatcher.on('error', function(err) {
                        console.log("dispatcher on error");
                        console.log(err);
                    });
                    dispatcher.on('speaking', function(value) {
                        console.log("dispatcher on speaking");
                        console.log(value);
                    });
                    dispatcher.on('debug', function(information) {
                        console.log("dispatcher on debug");
                        console.log(information);
                    });
                    dispatcherCallback(dispatcher);
                });
            }.bind(this);
        }
    }



    pause() {
        this.dispatcher.pause();
    }

    resume() {
        this.dispatcher.resume();
    }

    isPlaying() {
        return this.playing;
    }

    turnOff() {
        this.playing = !this.playing;
    }

    setDispatcher(dispatcher) {
        console.log("i'm in setDispatcher");
        this.dispatcher = dispatcher;
    }

    setConnection(connection) {
        this.connection = connection;
    }
}
