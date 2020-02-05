"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var feature_string_1 = require("./feature_string");
var ipa_1 = require("./ipa");
function set_diacritic(input, set_fn, set_val, diacritic) {
    if (!Array.isArray(input)) {
        var input_fs = feature_string_1.get_feature_string(input.features);
        var target_fs = set_fn(input_fs, set_val);
        if (input_fs === target_fs) {
            // Input is already transformed
            return input;
        }
        var target_letter = ipa_1.get_by_feature_string(target_fs);
        if (target_letter !== undefined) {
            // Ideal case: we found the counterpart
            return target_letter;
        }
        else {
            // We could not find the transformed counterpart
            // so we create an array and add the given
            // diacritic in the second position
            if (diacritic !== undefined) {
                var target_segment = [input, diacritic];
                return target_segment;
            }
            else {
                // In the very unusual case we do not find the
                // desired diacritic return undefined to signal
                // to the caller that no such representation exists
                return undefined;
            }
        }
    }
    else {
        // If we were not passed a single letter
        // we were likely passed a letter followed
        // by a series of modifying diacritics (such
        // as tone markers).
        // In this case, simply add the given
        // diacritic after the others
        var letter = input[0];
        if (diacritic !== undefined) {
            return __spread([letter, diacritic], input.slice(1));
        }
        else {
            // In the very unusual case we do not find the
            // voiceless diacritic return undefined to signal
            // to the caller that no such representation exists
            return undefined;
        }
    }
}
function devoice(input) {
    var voiceless_diac = ipa_1.get("voiceless diacritic");
    return set_diacritic(input, feature_string_1.set_voice, types_1.feature.neg, voiceless_diac);
}
exports.devoice = devoice;
function voice(input) {
    var voiced_diac = ipa_1.get("voiced diacritic");
    return set_diacritic(input, feature_string_1.set_voice, types_1.feature.pos, voiced_diac);
}
exports.voice = voice;
