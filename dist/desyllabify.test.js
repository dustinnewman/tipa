"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var desyllabify_1 = require("./desyllabify");
var tokenize_1 = require("./tokenize");
var collapse_1 = require("./collapse");
var parse_1 = require("./parse");
describe("desyllabify", function () {
    it("should desyllabify monosyllabic words", function () {
        var tokens = tokenize_1.tokenize("mæt");
        if (!tokens) {
            return;
        }
        var segments = collapse_1.collapse(tokens);
        if (!segments) {
            return;
        }
        var word = parse_1.parse("mæt");
        if (!word) {
            return;
        }
        var result = desyllabify_1.desyllabify(word, {
            leading_syllab: true,
            trailing_syllab: true
        });
        chai_1.expect(result).to.not.be.undefined;
        if (result) {
            chai_1.expect(result).to.be.deep.equal(segments);
        }
    });
    it("should desyllabify long polysyllabic words with tone", function () {
        var tokens = tokenize_1.tokenize(".ʕe.es.a.án.");
        if (!tokens) {
            return;
        }
        var segments = collapse_1.collapse(tokens);
        if (!segments) {
            return;
        }
        var word = parse_1.parse(".ʕe.es.a.án.");
        if (!word) {
            return;
        }
        var result = desyllabify_1.desyllabify(word, {
            leading_syllab: true,
            trailing_syllab: true
        });
        chai_1.expect(result).to.not.be.undefined;
        if (result) {
            chai_1.expect(result).to.be.deep.equal(segments);
        }
    });
    it("should desyllabify words with syllabic consonants", function () {
        var tokens = tokenize_1.tokenize("ˈbɑ.ɾɫ̩");
        if (!tokens) {
            return;
        }
        var segments = collapse_1.collapse(tokens);
        if (!segments) {
            return;
        }
        var word = parse_1.parse("ˈbɑ.ɾɫ̩");
        if (!word) {
            return;
        }
        var result = desyllabify_1.desyllabify(word, {
            leading_syllab: true,
            trailing_syllab: true
        });
        chai_1.expect(result).to.not.be.undefined;
        if (result) {
            chai_1.expect(result).to.be.deep.equal(segments);
        }
    });
});
