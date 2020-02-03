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
});
