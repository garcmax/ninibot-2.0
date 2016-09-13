'use strict';

export function buildQuery(opts) {
  let sort = "";
  let windw = "";
  let query = "/?q=";
  let optIndex = 1;
  if (opts[optIndex] && opts[optIndex].charAt(0) === "-") {
    let opt1 = opts[optIndex].substr(1);
    if (opt1 === "help") {
      return -1;
    }
    sort = "/" + opt1;
    optIndex++;
    if (opts[optIndex] && opts[optIndex].charAt(0) === "-") {
      let opt2 = opts[optIndex].substr(1);
      windw = "/" + opt2;
      optIndex++;
    }
  }
  while (optIndex < opts.length) {   
    query = query + encodeUrl(opts[optIndex]) + " ";
    optIndex++;
  }
  return sort + windw + query;
}

export function imgur(message) {

}

export function encodeUrl(str) {
    return encodeURIComponent(str).replace(/%20/gi, '+');
}