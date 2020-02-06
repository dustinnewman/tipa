"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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
Object.defineProperty(exports, "__esModule", { value: true });
// This is ORDERED and must be done in the order specified
var branner_map = new Map([
    // FIRST do affricates as they contain other symbols
    ['dl3")))', "d͡ɮ"],
    ["tl-))", "t͡ɬ"],
    ["tS))", "t͡ʃ"],
    ['d3"))', "d͡ʒ"],
    ["p[f))", "p̪͡f"],
    ["b[v))", "b̪͡v"],
    ["ts))", "t͡s"],
    ["dz))", "d͡z"],
    // Now do three letter symbols
    ["ae)", "\u00E6"],
    ["xr^", ""],
    ['a"&', "\u0252"],
    ["o/)", "ø"],
    ["oe)", "œ"],
    ["OE)", "Œ"],
    ["l~)", "ɫ"],
    ["~/^", "\u034A"],
    ["ng)", "ŋ"],
    ["nr)", ""],
    ["nj)", ""],
    ['l3")', "ɮ"],
    ['h")', "\u0324"],
    ["&g^", "\u02E4"],
    ["rr)", ""],
    ['m&"', ""],
    ['3"', "ʒ"],
    ['c"', ""],
    ['j"', ""],
    ['v"', "ʋ"],
    ["v)", "\u032C"],
    ["l-", "ɬ"],
    ['a"', "\u0251"],
    ["m&", "ɯ"],
    ['P"', "ɸ"],
    ['B"', "β"],
    ['m"', "ɱ"],
    ['r"', "ɾ"],
    ['g"', "ɣ"],
    ["o-", "ɵ"],
    ["i-", "\u0268"],
    ["u-", "\u0289"],
    ["e&", "ɘ"],
    ["E&", "ɜ"],
    ['E"', "ɞ"],
    ["R%", "\u0281"],
    ['U"', "\u0264"],
    ["v&", "ʌ"],
    ["c&", "\u0254"],
    ["r&", "ɹ"],
    ["?&", "ʕ"],
    ["h^", "\u02B0"],
    ["~^", "\u0303"],
    ["j^", "\u02B2"],
    ["w^", "\u02B7"],
    ["g^", "\u02E0"],
    ["0-", "\u03B8"],
    ["d-", "\u00F0"],
    ["?", "ʔ"],
    ["B", "ʙ"],
    ["G", "ɢ"],
    ["N", "ɴ"],
    ["@", "ə"],
    ["j", "\u006A"],
    ["5", "\u030B"],
    ["4", "\u0301"],
    ["3", "\u0304"],
    ["2", "\u0300"],
    ["1", "\u030F"],
    ["V)", "\u0325"],
    [",)", "\u0329"],
    ["~", "\u0330"],
    ["`", "\u02BC"],
    ["'", "\u02C8"],
    [",", "\u02CC"]
]);
// Source: https://stackoverflow.com/a/3561711
function escape_regex(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
function branner_to_ipa(input) {
    var e_1, _a;
    try {
        for (var branner_map_1 = __values(branner_map), branner_map_1_1 = branner_map_1.next(); !branner_map_1_1.done; branner_map_1_1 = branner_map_1.next()) {
            var _b = __read(branner_map_1_1.value, 2), branner = _b[0], ipa_sym = _b[1];
            var reg_ex = new RegExp(escape_regex(branner), "g");
            input = input.replace(reg_ex, ipa_sym);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (branner_map_1_1 && !branner_map_1_1.done && (_a = branner_map_1.return)) _a.call(branner_map_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return input;
}
exports.branner_to_ipa = branner_to_ipa;
