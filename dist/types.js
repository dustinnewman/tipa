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
    syllable_weight[syllable_weight["light"] = 0] = "light";
    syllable_weight[syllable_weight["heavy"] = 1] = "heavy";
    syllable_weight[syllable_weight["superheavy"] = 2] = "superheavy";
})(syllable_weight = exports.syllable_weight || (exports.syllable_weight = {}));
var syllable_stress;
(function (syllable_stress) {
    syllable_stress[syllable_stress["unstressed"] = 0] = "unstressed";
    syllable_stress[syllable_stress["primary"] = 1] = "primary";
    syllable_stress[syllable_stress["secondary"] = 2] = "secondary";
})(syllable_stress = exports.syllable_stress || (exports.syllable_stress = {}));
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
function is_stop(symbol) {
    if (Array.isArray(symbol)) {
        var base_letter = symbol[0];
        return is_stop(base_letter);
    }
    return (is_consonant(symbol)
        && symbol.features.SON === feature.neg
        && symbol.features.CONT === feature.neg
        && symbol.features.DELREL === feature.neg);
}
exports.is_stop = is_stop;
function is_syllabic(symbol) {
    if (Array.isArray(symbol)) {
        var base_letter = symbol[0];
        return is_syllabic(base_letter);
    }
    return symbol.features.SYL === feature.pos;
}
exports.is_syllabic = is_syllabic;
function is_voiced(symbol) {
    if (Array.isArray(symbol)) {
        var base_letter = symbol[0];
        return is_voiced(base_letter);
    }
    return symbol.features.VOICE === feature.pos;
}
exports.is_voiced = is_voiced;
function is_voiceless(symbol) {
    if (Array.isArray(symbol)) {
        var base_letter = symbol[0];
        return is_voiceless(base_letter);
    }
    return symbol.features.VOICE === feature.neg;
}
exports.is_voiceless = is_voiceless;
function is_sonorant(symbol) {
    if (Array.isArray(symbol)) {
        var base_letter = symbol[0];
        return is_sonorant(base_letter);
    }
    return symbol.features.SON === feature.pos;
}
exports.is_sonorant = is_sonorant;
