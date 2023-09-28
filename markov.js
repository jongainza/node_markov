/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (chains.has(word)) {
        chains.get(word).push(nextWord);
      } else {
        chains.set(word, [nextWord]);
      }
    }
    this.chain = chains;
  }

  /** return random text from chains */
  static rando(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  makeText(numWords = 100) {
    let res = [];
    let keys = Array.from(this.chain.keys());
    let key = MarkovMachine.rando(keys);

    while ((res < numWords) & (key !== null)) {
      res.push(key);
      key = MarkovMachine.rando(this.chain.get(key));
    }
    return res.join(" ");
  }
}
module.exports = {
  MarkovMachine,
};
