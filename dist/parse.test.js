"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var parse_1 = require("./parse");
describe("parse", function () {
    it("should parse a syllable with an onset and no coda", function () {
        var result = parse_1.parse("mi");
        chai_1.expect(result).to.not.be.undefined;
    });
    it("should auto-syllabify a syllable", function () {
        var input = "mi";
        var input_len = input.length;
        var result = parse_1.parse(input, {
            auto_syllabify_start: true,
            auto_syllabify_end: true
        });
        chai_1.expect(result).to.have.lengthOf(input_len + 2);
    });
    it("should not auto-syllabify a syllabified syllable", function () {
        var input = ".mi.";
        var input_len = input.length;
        var result = parse_1.parse(input, {
            auto_syllabify_start: true,
            auto_syllabify_end: true
        });
        chai_1.expect(result).to.have.lengthOf(input_len);
    });
    it("should parse a syllable with a coda and onset", function () {
        var result = parse_1.parse("mæt");
        chai_1.expect(result).to.not.be.undefined;
    });
    it("should parse a disyllabic word with no codas", function () {
        var result = parse_1.parse("lu.nə");
        chai_1.expect(result).to.not.be.undefined;
    });
    it("should parse Branner and IPA the same", function () {
        var ipa = parse_1.parse("lʉ.nə", {
            use_ipa_sym: true,
            use_branner: false
        });
        var branner = parse_1.parse("lu-.n@", {
            use_ipa_sym: false,
            use_branner: true
        });
        chai_1.expect(ipa).to.deep.equal(branner);
    });
    it("should parse combining symbols as separate diacritics", function () {
        var input = ".e̋.";
        var input_len = input.length;
        var result = parse_1.parse(input, {
            auto_syllabify_start: true,
            auto_syllabify_end: true
        });
        chai_1.expect(result).to.not.be.undefined;
        chai_1.expect(result).to.have.lengthOf(input_len);
        if (result) {
            chai_1.expect(result[1].type).to.equal("letter");
            chai_1.expect(result[2].type).to.equal("diacritic");
        }
    });
    it("should parse combining symbols as separate diacritics in Branner form", function () {
        var input = ".e5.";
        var input_len = input.length;
        var result = parse_1.parse(input, {
            auto_syllabify_start: true,
            auto_syllabify_end: true
        });
        chai_1.expect(result).to.not.be.undefined;
        chai_1.expect(result).to.have.lengthOf(input_len);
        if (result) {
            chai_1.expect(result[1].type).to.equal("letter");
            chai_1.expect(result[2].type).to.equal("diacritic");
        }
    });
    it("should parse combining symbols identically between Unicode and Branner", function () {
        var _a, _b;
        var ipa = parse_1.parse(".e̋.", {
            auto_syllabify_start: true,
            auto_syllabify_end: true
        });
        var branner = parse_1.parse(".e5.", {
            auto_syllabify_start: true,
            auto_syllabify_end: true
        });
        chai_1.expect((_a = ipa) === null || _a === void 0 ? void 0 : _a.length).to.equal((_b = branner) === null || _b === void 0 ? void 0 : _b.length);
        chai_1.expect(ipa).to.deep.equal(branner);
    });
});
