"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var parse_1 = require("./parse");
var constraints_1 = require("./constraints");
describe("NOCODA", function () {
    it("should assign zero violations to a syllable with no coda", function () {
        var word = parse_1.parse(".ma.");
        if (word) {
            var violations = constraints_1.NOCODA(word);
            chai_1.expect(violations).to.equal(0);
        }
    });
    it("should assign one violation to a syllable with a coda", function () {
        var word = parse_1.parse(".mæt.");
        if (word) {
            var violations = constraints_1.NOCODA(word);
            chai_1.expect(violations).to.equal(1);
        }
    });
});
describe("ONSET", function () {
    it("should assign zero violations to a syllable with an onset", function () {
        var word = parse_1.parse(".ma.");
        if (word) {
            var violations = constraints_1.ONSET(word);
            chai_1.expect(violations).to.equal(0);
        }
    });
    it("should assign one violation to a syllable without an onset", function () {
        var word = parse_1.parse(".æt.");
        if (word) {
            var violations = constraints_1.ONSET(word);
            chai_1.expect(violations).to.equal(1);
        }
    });
});
