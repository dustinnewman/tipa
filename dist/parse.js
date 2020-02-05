"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokenize_1 = require("./tokenize");
var collapse_1 = require("./collapse");
var syllabify_1 = require("./syllabify");
function parse(input) {
    var tokens = tokenize_1.tokenize(input);
    if (tokens === undefined) {
        return undefined;
    }
    var segments = collapse_1.collapse(tokens);
    if (segments === undefined) {
        return undefined;
    }
    var word = syllabify_1.syllabify(segments);
    if (word === undefined) {
        return undefined;
    }
    return word;
}
exports.parse = parse;
