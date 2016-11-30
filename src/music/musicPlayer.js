'use strict';

const ytdl = require('ytdl-core');

import * as config from "../config/config.js";
import * as bot from "../bot/reply.js";
import Playlist from "./playlist.js";

const lang = new config.Language();

export default class MusicPlayer {
    constructor() {
        this.playList = new Playlist();
        this.playList.add("https://www.youtube.com/watch?v=KKwVGqXM8u4");
        this.connection;
    }

    play() {
        const stream = ytdl(this.playList.getPlaylist()[0].url, {filter : 'audioonly'});
        stream.on('info', function(info) {
            console.log(info.length_seconds);
            console.log(this.connection);
            this.connection.then(playStream(stream, { seek: 0, volume: 1 }));
        });
    }

    pause() {
        
    }

    resume() {
        
    }

    setConnection(connection) {
        console.log(connection);
        this.connection = connection;
    }

}
