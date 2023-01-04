"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
function set_diacritic(input, set_fn, diacritic) {
    if (!Array.isArray(input)) {
        var input_fs = feature_string_1.get_feature_string(input.features);
        var target_fs = set_fn(input_fs);
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
            input.features = __assign(__assign({}, input.features), diacritic.features);
            var target_segment = [input, diacritic];
            return target_segment;
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
        letter.features = __assign(__assign({}, letter.features), diacritic.features);
        return __spread([letter, diacritic], input.slice(1));
    }
}
function devoice(input) {
    var diac = ipa_1.get("voiceless diacritic");
    if (diac && types_1.is_diacritic(diac)) {
        var result = set_diacritic(input, function (x) { return feature_string_1.set_voice(x, types_1.feature.neg); }, diac);
        if (types_1.is_voiceless(result)) {
            return result;
        }
    }
    return undefined;
}
exports.devoice = devoice;
function voice(input) {
    var diac = ipa_1.get("voiced diacritic");
    if (diac && types_1.is_diacritic(diac)) {
        var result = set_diacritic(input, function (x) { return feature_string_1.set_voice(x, types_1.feature.pos); }, diac);
        if (types_1.is_voiced(result)) {
            return result;
        }
    }
    return undefined;
}
exports.voice = voice;
function nasalize(input) {
    var diac = ipa_1.get("nasal diacritic");
    if (diac && types_1.is_diacritic(diac)) {
        return set_diacritic(input, function (x) { return feature_string_1.set_nasal(x, types_1.feature.pos); }, diac);
    }
    return undefined;
}
exports.nasalize = nasalize;
function denasalize(input) {
    var diac = ipa_1.get("denasal diacritic");
    if (diac && types_1.is_diacritic(diac)) {
        return set_diacritic(input, function (x) { return feature_string_1.set_nasal(x, types_1.feature.neg); }, diac);
    }
    return undefined;
}
exports.denasalize = denasalize;
function ejectivize(input) {
    var diac = ipa_1.get("ejective");
    if (diac && types_1.is_diacritic(diac)) {
        var set_fn = function (x) { return feature_string_1.set_sp_glot(feature_string_1.set_con_glot(x, types_1.feature.pos), types_1.feature.neg); };
        return set_diacritic(input, set_fn, diac);
    }
    return undefined;
}
exports.ejectivize = ejectivize;
function aspirate(input) {
    if (types_1.is_consonant(input)) {
        var diac = ipa_1.get("aspirated");
        if (diac && types_1.is_diacritic(diac)) {
            var set_fn = function (x) { return feature_string_1.set_sp_glot(feature_string_1.set_con_glot(x, types_1.feature.neg), types_1.feature.pos); };
            var result = set_diacritic(input, set_fn, diac);
            if (types_1.is_consonant(result)) {
                return result;
            }
        }
        return undefined;
    }
}
exports.aspirate = aspirate;
