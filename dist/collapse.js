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
function clear_accum(accumulator, output) {
    // If there is only one element in the
    // accumulator we definitely prefer to
    // just push the letter itself
    if (types_1.is_phone(accumulator)) {
        if (accumulator.length === 1) {
            output.push(accumulator[0]);
        }
        else {
            // This is where we apply all the features of the diacritics
            // Onto the base letter so e.g. the syllabic diacritic
            // Will actually make the letter syllabic featured
            var len = accumulator.length;
            for (var i = 1; i < len; i++) {
                accumulator[0].features = __assign(__assign({}, accumulator[0].features), accumulator[i].features);
            }
            output.push(accumulator);
        }
    }
    return [];
}
function collapse(_input) {
    var input = _input;
    var len = input.length;
    var i = 0;
    var output = [];
    var accumulator = [];
    while (i < len) {
        var curr = input[i];
        if (types_1.is_diacritic(curr)) {
            if (accumulator && Array.isArray(accumulator)) {
                accumulator.push(curr);
            }
            i += 1;
            continue;
        }
        else {
            accumulator = clear_accum(accumulator, output);
            if (types_1.is_supra(curr)) {
                output.push(curr);
                i += 1;
                continue;
            }
            // We have a letter which can either be standalone
            // or the beginning of a string of modifying
            // diacritics
            if (types_1.is_letter(curr)) {
                accumulator = [curr];
                i += 1;
                continue;
            }
        }
    }
    // Make sure to include the final letter
    clear_accum(accumulator, output);
    return output;
}
exports.collapse = collapse;
