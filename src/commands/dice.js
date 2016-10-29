'use strict';

const dice = require("dice-rpg");
import * as bot from "../bot/reply.js";
import * as config from "../config/config.js";
const lang = new config.Language();

export function rolled(message) {
  let input = message.content.substr(6);
  let rolls = dice.rolled(input);
  if(!rolls.error) {
    bot.replyWithAuthor(buildRollsResult(rolls), message);
  } else {
    bot.replyWithAuthor(config.strings[lang.countryCode].diceKO, message);
  }
}

function buildRollsResult(rolls) {
  //http://stackoverflow.com/questions/8312459/iterate-through-object-properties
  let answer = `${config.strings[lang.countryCode].diceOK} ` ;
  for (let dices in rolls) {
    if (rolls.hasOwnProperty(dices)) {
        answer += `${config.strings[lang.countryCode].from} d${dices} : ${rolls[dices]} ; `;
    }
  }
  return answer.substr(0, answer.length - 3);
}
