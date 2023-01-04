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
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var ipa_1 = require("./ipa");
var DEF_OPTS = {
    diphthong_is_heavy: true,
    coda_is_heavy: true,
    mark_superheavy: false
};
var syllable_break = ipa_1.get("syllable break");
var primary = ipa_1.get("primary stress");
var secondary = ipa_1.get("secondary stress");
function syllabify(input, options) {
    // Use default options if not provided
    options = options ? __assign(__assign({}, DEF_OPTS), options) : DEF_OPTS;
    if (syllable_break === undefined) {
        // There is no point in attempting to
        // syllabify if we have no marker for it
        return undefined;
    }
    var start_new_syllable = function (opts) {
        if (syllable_segments.length > 0) {
            var weight = types_1.syllable_weight.light;
            if (opts.mark_superheavy && nucleus.length > 1 && coda.length > 0) {
                weight = types_1.syllable_weight.superheavy;
            }
            else if (opts.diphthong_is_heavy && nucleus.length > 1) {
                weight = types_1.syllable_weight.heavy;
            }
            else if (opts.coda_is_heavy && coda.length > 0) {
                weight = types_1.syllable_weight.heavy;
            }
            var stress = types_1.syllable_stress.unstressed;
            if (last_encountered_supra !== undefined) {
                var les_number = last_encountered_supra.number;
                if (primary && les_number === primary.number) {
                    stress = types_1.syllable_stress.primary;
                }
                else if (secondary && les_number === secondary.number) {
                    stress = types_1.syllable_stress.secondary;
                }
            }
            var syllable = {
                onset: onset,
                nucleus: nucleus,
                coda: coda,
                weight: weight,
                stress: stress,
                segments: syllable_segments
            };
            word.push(syllable);
            // Reset all the accumulators
            encountered_syllabic = false;
            syllable_segments = [];
            onset = [];
            nucleus = [];
            coda = [];
        }
    };
    var word = [];
    var onset = [];
    var nucleus = [];
    var coda = [];
    var syllable_segments = [];
    var encountered_syllabic = false;
    var last_encountered_supra;
    var len = input.length;
    for (var i = 0; i < len; i++) {
        var curr = input[i];
        if (types_1.is_phone(curr)) {
            if (types_1.is_syllabic(curr)) {
                encountered_syllabic = true;
                nucleus.push(curr);
            }
            else if (encountered_syllabic) {
                coda.push(curr);
            }
            else {
                onset.push(curr);
            }
            syllable_segments.push(curr);
        }
        else if (types_1.is_supra(curr)) {
            // Encountered syllable break so push all the
            // accumulated segments into the syllable
            start_new_syllable(options);
            last_encountered_supra = curr;
        }
    }
    start_new_syllable(options);
    return word;
}
exports.syllabify = syllabify;
