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

## Functions

| Name                   | Type Signature                   | Example
| ------                 | -------                          | -------
| `parse`                | `string => word`                 | `parse("liŋˈɡwɪ.stɪks")`
| `get`                  | `string => ipa_symbol`           | `get("low back rounded vowel")`
| `tokenize`             | `string => ipa_symbol[]`         | `tokenize(".ʕe.es.a.án.")`
| `collapse`             | `ipa_symbol[] => ipa_segment[]`  | `collapse(tokenize("kætz̥"))`
| `syllabify`            | `ipa_segment[] => word`          | `syllabify(collapse(tokenize("lu.nə")))`
| `devoice`              | `phone => phone`                 | `devoice(get("g"))`

## Types

| Type                        | Meaning
| ------                      | -------
| `ipa_symbol`                | Base type which includes `ipa_diacritic`, `ipa_suprasegmental`, and `ipa_letter`.
| `ipa_diacritic`             | Sub-type of `ipa_symbol`. Used to modify an `ipa_letter` in some way. Includes tone diacritics (1 - 5), secondary articulation, and length diacritics (long, half long, and extra short).
| `ipa_suprasegmental`        | Sub-type of `ipa_symbol`. Used to create syllable boundaries and/or provide syllable-level information such as primary or secondary stress.
| `ipa_letter`                | Sub-type of `ipa_symbol`. Can either be a vowel or consonant. Has a feature matrix defined by Hayes (2009).
| `phone`                     | A single, standalone sound. Can be an `ipa_letter` (e.g. `[p]`) or an `ipa_letter` followed by diacritics (e.g. `[v̥̄]`).
| `ipa_segment`               | The building block of syllables. Can be a `phone` or a suprasegmental.
| `syllable`                  | A group of `ipa_segments` and the building block of words. Has an onset, nucleus, and coda, as well as a list of all constituent segments.
| `word`                      | A group of syllables and the end result of parsing.
| `markedness_constraint`     | (Optimality Theory) Any function which takes a candidate word and returns the number of violations.
| `faithfulness_constraint`   | (Optimality Theory) Any function which takes an input word, a candidate word, and a correspondence between the two and returns the number of violations.
| `correspondence`            | (Optimality Theory) A mapping between two words. An array of `number` or `null` values where the *index* marks the index into the input word and the *value* marks the corresponding index into the output word, if it exists.

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