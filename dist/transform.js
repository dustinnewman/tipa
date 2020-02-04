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
function devoice(input) {
    if (types_1.is_letter(input)) {
        var input_fs = feature_string_1.get_feature_string(input.features);
        var target_fs = feature_string_1.set_voice(input_fs, types_1.feature.neg);
        if (input_fs === target_fs) {
            // Input is already voiceless
            return input;
        }
        var target_letter = ipa_1.get_by_feature_string(target_fs);
        if (target_letter !== undefined) {
            // Ideal case: we found the voiceless counterpart
            return target_letter;
        }
        else {
            // We could not find the voiceless counterpart
            // so we create an array and add the voiceless
            // diacritic in the second position
            var voiceless_diac = ipa_1.get("voiceless diacritic");
            if (voiceless_diac !== undefined) {
                var target_segment = [input, voiceless_diac];
                return target_segment;
            }
            else {
                // In the very unusual case we do not find the
                // voiceless diacritic return undefined to signal
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
        // In this case, simply add the voiceless
        // diacritic after the others
        var letter = input[0];
        var voiceless_diac = ipa_1.get("voiceless diacritic");
        if (voiceless_diac !== undefined) {
            return __spread([letter, voiceless_diac], input.slice(1));
        }
        else {
            // In the very unusual case we do not find the
            // voiceless diacritic return undefined to signal
            // to the caller that no such representation exists
            return undefined;
        }
    }
}
exports.devoice = devoice;
