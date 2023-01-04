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
var tokenize_1 = require("./tokenize");
var collapse_1 = require("./collapse");
var syllabify_1 = require("./syllabify");
var DEF_OPTS = {
    use_branner: false,
    use_ipa_sym: true,
    use_ipa_ent: false,
};
function parse(input, opts) {
    opts = opts ? __assign(__assign({}, DEF_OPTS), opts) : DEF_OPTS;
    var tokens = tokenize_1.tokenize(input, opts);
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
