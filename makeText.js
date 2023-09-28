/** Command-line tool to generate Markov text. */

const fs = require("fs");
const axios = require("axios");
const process = require("process");
const markov = require("./markov");

function generateText(text) {
  let mm = new markov.MarkovMachine(text);
  console.log(mm.makeText());
}

function makeText(path) {
  fs.readFile(path, "utf8", function mt(err, data) {
    if (err) {
      console.log(`Can not read the file: ${path},${err}`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });
}

async function urlText(url) {
  let res;
  try {
    res = await axios.get(url);
  } catch (err) {
    console.log(`can not acces data in ${url}, ${err}`);
    process.exit(1);
  }
  generateText(res.data);
}
let [method, path] = process.argv.slice(2);
if (method === "file") {
  makeText(path);
} else if (method === "url") {
  urlText(path);
} else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}
