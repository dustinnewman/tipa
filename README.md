# tipa
[![version](https://img.shields.io/npm/v/tipa.svg)](https://www.npmjs.org/package/tipa)

*tipa* is a TypeScript package supporting parsing of linguistic input in Unicode, HTML Entity, and Branner (1994) formats. It contains extensive features from Hayes (2009), allowing you to transform sounds reliably.


```js
const tipa = require("tipa")

tipa.get("t") === tipa.devoice(tipa.get("d")) // true

const word = tipa.parse("liŋˈɡwɪ.stɪks")

const nucleus = word[0].nucleus[0].name // high front tense unrounded vowel
```

## Installation

For Yarn:

```bash
$ yarn add tipa
```

For NPM:

```bash
$ npm install tipa
```


## Testing

To run tests on the library, first clone the repository:

```bash
$ git clone https://github.com/dustinnewman98/tipa.git
$ cd tipa
```

Then install the dev dependencies:

```bash
$ yarn # for NPM, run: npm install
```

Now you're ready to run the tests!

```bash
$ yarn test # NPM: npm run test
```