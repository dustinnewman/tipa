"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var tokenize_1 = require("./tokenize");
var collapse_1 = require("./collapse");
var types_1 = require("./types");
describe("collapse", function () {
    it("should not change input with no diacritics", function () {
        var input = tokenize_1.tokenize("lu.nə");
        if (input) {
            var result = collapse_1.collapse(input);
            chai_1.expect(result).to.not.be.undefined;
            if (result) {
                chai_1.expect(result).to.have.lengthOf(input.length);
                chai_1.expect(result).to.be.deep.equal(input);
            }
        }
    });
    it("should change input with diacritics", function () {
        var input = tokenize_1.tokenize("v̥̄");
        if (input) {
            var result = collapse_1.collapse(input);
            chai_1.expect(result).to.not.be.undefined;
            if (result) {
                chai_1.expect(result).to.have.lengthOf(input.length - 2);
                chai_1.expect(result[1]).to.be.an("array");
                chai_1.expect(types_1.is_phone(result[1])).to.be.true;
            }
        }
    });
    it("should merge features of diacritics into letter", function () {
        var input = tokenize_1.tokenize("ɫ̩");
        if (input) {
            var result = collapse_1.collapse(input);
            chai_1.expect(result).to.not.be.undefined;
            if (result) {
                chai_1.expect(result).to.have.lengthOf(input.length - 1);
                chai_1.expect(result[1]).to.be.an("array");
                var segment = result[1];
                if (types_1.is_phone(segment) && Array.isArray(segment)) {
                    chai_1.expect(segment[0].features.SYL).to.equal(types_1.feature.pos);
                }
            }
        }
    });
});
