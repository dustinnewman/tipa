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
    leading_syllab: false,
    trailing_syllab: false
};
var syllable_break = ipa_1.get("syllable break");
var primary = ipa_1.get("primary stress");
var secondary = ipa_1.get("secondary stress");
function desyllabify(input, options) {
    options = options ? __assign(__assign({}, DEF_OPTS), options) : DEF_OPTS;
    // Don't try to desyllabify if there is no way to separate
    // the original syllables or we will lose information
    if (!syllable_break) {
        return undefined;
    }
    var segments = [];
    if (options.leading_syllab) {
        segments.push(syllable_break);
    }
    var num_sylls = input.length;
    for (var i = 0; i < num_sylls; i++) {
        // We should check what mark to add
        var stress = input[i].stress;
        var mark = syllable_break;
        if (stress !== undefined) {
            if (stress === types_1.syllable_stress.primary && primary) {
                mark = primary;
            }
            else if (stress === types_1.syllable_stress.secondary && secondary) {
                mark = secondary;
            }
        }
        // Don't double syllabify if we already added the regular
        // syllable break already
        if (i !== 0 || mark.number !== syllable_break.number) {
            segments.push(mark);
        }
        input[i].segments.forEach(function (segment) {
            segments.push(segment);
        });
    }
    if (options.trailing_syllab) {
        segments.push(syllable_break);
    }
    return segments;
}
exports.desyllabify = desyllabify;
