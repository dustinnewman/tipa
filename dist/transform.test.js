"use strict";
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var ipa_1 = require("./ipa");
var transform_1 = require("./transform");
var parse_1 = require("./parse");
var types_1 = require("./types");
describe("devoice", function () {
    it("should return the input given a voiceless segment", function () {
        var voiceless = ipa_1.get("t");
        if (voiceless !== undefined && types_1.is_letter(voiceless)) {
            var result = transform_1.devoice(voiceless);
            chai_1.expect(result).to.deep.equal(voiceless);
        }
    });
    it("should return a voiceless segment given a voiced segment", function () {
        var voiced = ipa_1.get("d");
        var voiceless = ipa_1.get("t");
        if (voiced !== undefined
            && voiceless !== undefined
            && types_1.is_letter(voiced)
            && types_1.is_letter(voiceless)) {
            var result = transform_1.devoice(voiced);
            chai_1.expect(result).to.deep.equal(voiceless);
        }
    });
    it("should preserve diacritics", function () {
        var voiced = parse_1.parse("v̄");
        var devoiced = parse_1.parse("v̥̄");
        if (voiced && devoiced) {
            var filtered_voiced = voiced.filter(function (x) { return !types_1.is_supra(x); });
            var filtered_devoiced = devoiced.filter(function (x) { return !types_1.is_supra(x); });
            var voiced_letter = filtered_voiced[0];
            var devoiced_letter = filtered_devoiced[0];
            if (types_1.is_letter(voiced_letter) && types_1.is_letter(devoiced_letter)) {
                var fv = __spread([voiced_letter], filtered_voiced.slice(1));
                var fd = __spread([devoiced_letter], filtered_devoiced.slice(1));
                var result = transform_1.devoice(fv);
                if (result) {
                    chai_1.expect(result).to.deep.equal(fd);
                }
            }
        }
    });
});
