"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var parse_1 = require("./parse");
describe("parse", function () {
    it("should parse the word /pæt/", function () {
        var result = parse_1.parse("pæt");
        console.log(result);
        chai_1.expect(result).to.not.be.undefined;
    });
});
