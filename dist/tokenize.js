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
var ipa_1 = require("./ipa");
var branner_to_ipa_1 = require("./branner_to_ipa");
var DEF_OPTS = {
    use_branner: false,
    use_ipa_sym: true,
    use_ipa_ent: false,
    auto_syllabify_start: true,
    auto_syllabify_end: true,
};
function split_by_ipa_sym(input) {
    return input.split("");
}
function split_by_branner(input) {
    return split_by_ipa_sym(branner_to_ipa_1.branner_to_ipa(input));
}
function split_by_ipa_ent(input) {
    return input.split("");
}
function tokenize(_input, options) {
    // Use default options if not provided
    options = options ? __assign(__assign({}, DEF_OPTS), options) : DEF_OPTS;
    // Auto syllabification
    var syllable_break = ipa_1.get("syllable break");
    if (syllable_break) {
        if (options.auto_syllabify_start) {
            if (_input[0] !== syllable_break.ipa_sym && options.use_ipa_sym) {
                _input = syllable_break.ipa_sym + _input;
            }
            else if (_input[0] !== syllable_break.branner && options.use_branner) {
                _input = syllable_break.branner + _input;
            }
            else if (_input[0] !== syllable_break.ipa_ent && options.use_ipa_ent) {
                _input = syllable_break.ipa_ent + _input;
            }
        }
        var end = _input[_input.length - 1];
        if (options.auto_syllabify_end) {
            if (end !== syllable_break.ipa_sym && options.use_ipa_sym) {
                _input = _input + syllable_break.ipa_sym;
            }
            else if (end !== syllable_break.branner && options.use_branner) {
                _input = _input + syllable_break.branner;
            }
            else if (end !== syllable_break.ipa_ent && options.use_ipa_ent) {
                _input = _input + syllable_break.ipa_ent;
            }
        }
    }
    var input;
    if (options.use_ipa_sym) {
        input = split_by_ipa_sym(_input);
    }
    else if (options.use_branner) {
        input = split_by_branner(_input);
    }
    else if (options.use_ipa_ent) {
        input = split_by_ipa_ent(_input);
    }
    else {
        input = _input;
    }
    var output = [];
    var len = input.length;
    for (var i = 0; i < len; i++) {
        var sym = ipa_1.get(input[i]);
        if (sym !== undefined) {
            output.push(sym);
        }
        else {
            return undefined;
        }
    }
    return output;
}
exports.tokenize = tokenize;
