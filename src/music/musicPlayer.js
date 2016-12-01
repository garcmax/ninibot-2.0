'use strict';

const ytdl = require('ytdl-core');
const when = require('when');

import * as config from "../config/config.js";
import * as bot from "../bot/reply.js";
import Playlist from "./playlist.js";

const lang = new config.Language();

export default class MusicPlayer {
    constructor() {
        this.playList = new Playlist();        
        this.connection;
        this.dispatcher;
    }

    play() {
        const stream = ytdl(this.playList.getPlaylist()[0].url, {filter : 'audioonly'});        
        this.connection.then(connection => {                     
            let dispatcher = connection.playStream(stream, { seek: 0, volume: 1 });
        });
    }

    
    pause() {
        
    }

    resume() {
        
    }

    setDispatcher(dispatcher) {
        console.log("i'm in setDispatcher");
        this.dispatcher = dispatcher;
    }

    setConnection(connection) {
        this.connection = connection;
    }

    getPlaylist() {
        return this.playList.getPlaylist();
    }

    addToPlaylist(url) {
        this.playList.add(url);
    }

}
