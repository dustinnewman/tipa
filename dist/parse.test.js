"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var parse_1 = require("./parse");
var types_1 = require("./types");
describe("parse", function () {
    it("should parse a sentence", function () {
        // Example found in Jason Riggle (2005, Local Optionality)
        var result = parse_1.parse("ã.vi#də#tə#batʁ");
        chai_1.expect(result).to.not.be.undefined;
        if (result) {
            chai_1.expect(result).to.have.lengthOf(5);
            chai_1.expect(result[0].onset).to.have.lengthOf(0);
            chai_1.expect(result[0].nucleus).to.have.lengthOf(1);
            chai_1.expect(result[0].coda).to.have.lengthOf(0);
            chai_1.expect(result[0].weight).to.equal(types_1.syllable_weight.light);
            chai_1.expect(result[4].onset).to.have.lengthOf(1);
            chai_1.expect(result[4].nucleus).to.have.lengthOf(1);
            chai_1.expect(result[4].coda).to.have.lengthOf(2);
            chai_1.expect(result[4].weight).to.equal(types_1.syllable_weight.heavy);
        }
    });
});
