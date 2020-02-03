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
var DEF_OPTS = {
    use_branner: false,
    use_ipa_sym: true,
    use_ipa_ent: false
};
function parse(input, options) {
    // Use default options if not provided
    options = options ? __assign(__assign({}, DEF_OPTS), options) : DEF_OPTS;
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
exports.parse = parse;
