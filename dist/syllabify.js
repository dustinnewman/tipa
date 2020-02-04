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
    ignore_initial_syllab: true,
    ignore_final_syllab: true
};
function syllabify(_input, options) {
    // Use default options if not provided
    options = options ? __assign(__assign({}, DEF_OPTS), options) : DEF_OPTS;
    var syllable_break = ipa_1.get("syllable break");
    if (syllable_break === undefined) {
        // There is no point in attempting to
        // syllabify if we have no marker for it
        return undefined;
    }
    var input = _input;
    if (options.ignore_initial_syllab) {
        var initial = input[0];
        if (!types_1.is_phone(initial)) {
            if (initial.branner === syllable_break.branner) {
                input = input.slice(1);
            }
        }
    }
    if (options.ignore_final_syllab) {
        var final = input[input.length - 1];
        if (!types_1.is_phone(final)) {
            if (final.branner === syllable_break.branner) {
                input = input.slice(0, input.length - 1);
            }
        }
    }
}
exports.syllabify = syllabify;
