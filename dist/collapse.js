"use strict";
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
