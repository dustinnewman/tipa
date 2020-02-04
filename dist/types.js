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
    syllable_weight["superheavy"] = "superheavy";
})(syllable_weight = exports.syllable_weight || (exports.syllable_weight = {}));
exports.LETTER = "letter";
exports.DIAC = "diacritic";
exports.SUPRA = "suprasegmental";
function is_diacritic(symbol) {
    return symbol.type === exports.DIAC;
}
exports.is_diacritic = is_diacritic;
function is_supra(symbol) {
    if (symbol === undefined) {
        return false;
    }
    return symbol.type === exports.SUPRA;
}
exports.is_supra = is_supra;
function is_letter(symbol) {
    if (symbol === undefined) {
        return false;
    }
    return symbol.type === exports.LETTER;
}
exports.is_letter = is_letter;
function is_phone(symbol) {
    if (symbol === undefined) {
        return false;
    }
    if (Array.isArray(symbol)) {
        var base_letter = symbol[0];
        if (is_letter(base_letter)) {
            if (symbol.length === 1) {
                return true;
            }
            return symbol.slice(1).every(function (x) { return is_diacritic(x); });
        }
        return false;
    }
    return is_letter(symbol);
}
exports.is_phone = is_phone;
function is_consonant(symbol) {
    if (Array.isArray(symbol)) {
        var base_consonant = symbol[0];
        return is_consonant(base_consonant);
    }
    return symbol.consonant === true;
}
exports.is_consonant = is_consonant;
function is_vowel(symbol) {
    if (Array.isArray(symbol)) {
        var base_vowel = symbol[0];
        return is_vowel(base_vowel);
    }
    return symbol.vowel === true;
}
exports.is_vowel = is_vowel;
