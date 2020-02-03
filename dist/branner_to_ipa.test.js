"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var branner_to_ipa_1 = require("./branner_to_ipa");
describe("branner_to_ipa", function () {
    it("should perform vacuous conversions", function () {
        var word = "ma";
        var result = branner_to_ipa_1.branner_to_ipa(word);
        chai_1.expect(result).to.equal(word);
    });
    it("should perform simple conversions", function () {
        var branner = "mae)t@";
        var ipa = "mætə";
        var result = branner_to_ipa_1.branner_to_ipa(branner);
        chai_1.expect(result).to.equal(ipa);
    });
    it("should perform complex conversions", function () {
        var branner = 'l3")ddl3"))).';
        var ipa = "ɮdd͡ɮ.";
        var result = branner_to_ipa_1.branner_to_ipa(branner);
        chai_1.expect(result).to.equal(ipa);
    });
});
