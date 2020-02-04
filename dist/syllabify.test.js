"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var tokenize_1 = require("./tokenize");
var syllabify_1 = require("./syllabify");
describe("syllabify", function () {
    it("should tokenize long polysyllabic words with tone", function () {
        var tokens = tokenize_1.tokenize(".ʕe.es.a.án.");
        if (!tokens) {
            return;
        }
        var result = syllabify_1.syllabify(tokens);
        chai_1.expect(result).to.not.be.undefined;
        if (result) {
            chai_1.expect(result).to.have.lengthOf(4);
        }
    });
});
