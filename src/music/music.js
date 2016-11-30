'use strict';

import MusicPlayer from "./musicPlayer.js";
import * as config from "../config/config.js";
import * as dispatcher from "../commands/commandDispatcher.js"; 

var mp = new MusicPlayer();

export function manageCommands(message) {
    let command = dispatcher.extractCommand(message);
    if (command === '!play') {
        mp.play();
    } else if (command === '!pause') {
        mp.pause();
    } else if (command === '!resume') {
        mp.resume();
    }
}