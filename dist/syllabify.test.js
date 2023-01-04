"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var tokenize_1 = require("./tokenize");
var syllabify_1 = require("./syllabify");
var collapse_1 = require("./collapse");
describe("syllabify", function () {
    it("should syllabify monosyllabic words", function () {
        var tokens = tokenize_1.tokenize("mæt");
        if (!tokens) {
            return;
        }
        var segments = collapse_1.collapse(tokens);
        if (!segments) {
            return;
        }
        var result = syllabify_1.syllabify(segments);
        chai_1.expect(result).to.not.be.undefined;
        if (result) {
            chai_1.expect(result).to.have.lengthOf(1);
        }
    });
    it("should syllabify disyllabic words", function () {
        var tokens = tokenize_1.tokenize("lu.nə");
        if (!tokens) {
            return;
        }
        var segments = collapse_1.collapse(tokens);
        if (!segments) {
            return;
        }
        var result = syllabify_1.syllabify(segments);
        chai_1.expect(result).to.not.be.undefined;
        if (result) {
            chai_1.expect(result).to.have.lengthOf(2);
        }
    });
    it("should syllabify long polysyllabic words with tone", function () {
        var tokens = tokenize_1.tokenize(".ʕe.es.a.án.");
        if (!tokens) {
            return;
        }
        var segments = collapse_1.collapse(tokens);
        if (!segments) {
            return;
        }
        var result = syllabify_1.syllabify(segments);
        chai_1.expect(result).to.not.be.undefined;
        if (result) {
            chai_1.expect(result).to.have.lengthOf(4);
        }
    });
    it("should syllabify words with affricates", function () {
        var tokens = tokenize_1.tokenize("ɮdd͡ɮ.");
        if (!tokens) {
            return;
        }
        var segments = collapse_1.collapse(tokens);
        if (!segments) {
            return;
        }
        var result = syllabify_1.syllabify(segments);
        chai_1.expect(result).to.not.be.undefined;
        if (result) {
            chai_1.expect(result).to.have.lengthOf(1);
        }
    });
    it("should syllabify words with syllabic consonants", function () {
        var tokens = tokenize_1.tokenize("ˈbɑ.ɾɫ̩");
        if (!tokens) {
            return;
        }
        var segments = collapse_1.collapse(tokens);
        if (!segments) {
            return;
        }
        var result = syllabify_1.syllabify(segments);
        chai_1.expect(result).to.not.be.undefined;
        if (result) {
            chai_1.expect(result).to.have.lengthOf(2);
            chai_1.expect(result[0].onset).to.have.lengthOf(1);
            chai_1.expect(result[0].nucleus).to.have.lengthOf(1);
            chai_1.expect(result[0].coda).to.have.lengthOf(0);
            chai_1.expect(result[1].onset).to.have.lengthOf(1);
            chai_1.expect(result[1].nucleus).to.have.lengthOf(1);
            chai_1.expect(result[1].coda).to.have.lengthOf(0);
        }
    });
});
