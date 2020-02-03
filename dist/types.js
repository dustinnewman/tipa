"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var feature;
(function (feature) {
    feature[feature["neg"] = -1] = "neg";
    feature[feature["zero"] = 0] = "zero";
    feature[feature["pos"] = 1] = "pos";
})(feature = exports.feature || (exports.feature = {}));
var syllable_weight;
(function (syllable_weight) {
    syllable_weight["light"] = "light";
    syllable_weight["heavy"] = "heavy";
})(syllable_weight = exports.syllable_weight || (exports.syllable_weight = {}));
exports.LETTER = "letter";
exports.DIAC = "diacritic";
function is_diacritic(symbol) {
    return symbol.type === exports.DIAC;
}
exports.is_diacritic = is_diacritic;
function is_letter(symbol) {
    return symbol.type === exports.LETTER;
}
exports.is_letter = is_letter;
function is_consonant(symbol) {
    return symbol.consonant === true;
}
exports.is_consonant = is_consonant;
function is_vowel(symbol) {
    return symbol.vowel === true;
}
exports.is_vowel = is_vowel;
