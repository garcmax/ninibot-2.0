'use strict';

const ytdl = require('ytdl-core');

export default class MusicPlayer {
    constructor(connection) {
        this.playing = false;
        this.musicChannelConnection = connection;
        this.dispatcher;
    }

    isPlaying() {
        return this.playing;
    }

    play() {        
        this.playing = true;
        const stream = ytdl('https://www.youtube.com/watch?v=XAWgeLF9EVQ', {filter : 'audioonly'});
        stream.on('info', function(info) {
            this.dispatcher = this.musicChannelConnection.playStream(stream);        
            this.dispatcher.on('start', function() {
                console.log("start");
            });
            this.dispatcher.on('end', function() {
                console.log("end");
            });
        }).bind(this);
    }

    pause(dispatcher) {
        this.dispatcher.pause();
    }

    resume(dispatcher) {
        this.dispatcher.resume();
    }
}
