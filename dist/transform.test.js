"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var ipa_1 = require("./ipa");
var transform_1 = require("./transform");
var tokenize_1 = require("./tokenize");
var types_1 = require("./types");
describe("transform", function () {
    describe("devoice", function () {
        it("should return the input given a voiceless segment", function () {
            var voiceless = ipa_1.get("t");
            if (voiceless !== undefined && types_1.is_phone(voiceless)) {
                var result = transform_1.devoice(voiceless);
                chai_1.expect(result).to.deep.equal(voiceless);
            }
        });
        it("should return a voiceless segment given a voiced segment", function () {
            var voiced = ipa_1.get("d");
            var voiceless = ipa_1.get("t");
            if (voiced !== undefined
                && voiceless !== undefined
                && types_1.is_phone(voiced)
                && types_1.is_phone(voiceless)) {
                var result = transform_1.devoice(voiced);
                chai_1.expect(result).to.deep.equal(voiceless);
            }
        });
        it("should preserve diacritics", function () {
            var voiced = tokenize_1.tokenize("v̄");
            var devoiced = tokenize_1.tokenize("v̥̄");
            if (voiced && devoiced) {
                var filtered_voiced = voiced.filter(function (x) { return !types_1.is_supra(x); });
                var filtered_devoiced = devoiced.filter(function (x) { return !types_1.is_supra(x); });
                var voiced_letter = filtered_voiced[0];
                var devoiced_letter = filtered_devoiced[0];
                if (types_1.is_letter(voiced_letter) && types_1.is_letter(devoiced_letter)) {
                    var fv = __spread([voiced_letter], filtered_voiced.slice(1));
                    var fd = __spread([devoiced_letter], filtered_devoiced.slice(1));
                    var result = transform_1.devoice(fv);
                    if (result) {
                        chai_1.expect(result).to.deep.equal(fd);
                    }
                }
            }
        });
    });
    describe("voice", function () {
        it("should return the input given a voiced segment", function () {
            var voiced = ipa_1.get("d");
            if (voiced !== undefined && types_1.is_phone(voiced)) {
                var result = transform_1.voice(voiced);
                chai_1.expect(result).to.deep.equal(voiced);
            }
        });
        it("should return a voiced segment given a voiceless segment", function () {
            var voiceless = ipa_1.get("t");
            var voiced = ipa_1.get("d");
            if (voiceless !== undefined
                && voiced !== undefined
                && types_1.is_phone(voiceless)
                && types_1.is_phone(voiced)) {
                var result = transform_1.voice(voiceless);
                chai_1.expect(result).to.deep.equal(voiced);
            }
        });
        it("should voice voiceless affricates", function () {
            var input = ipa_1.get("t͡ʃ");
            var output = ipa_1.get("d͡ʒ");
            if (input !== undefined
                && output !== undefined
                && types_1.is_phone(input)
                && types_1.is_phone(output)) {
                var result = transform_1.voice(input);
                chai_1.expect(result).to.deep.equal(output);
            }
        });
    });
    describe("nasalize", function () {
        it("should nasalize vowels into a phone", function () {
            var tokens = ipa_1.get("a");
            if (tokens && types_1.is_phone(tokens)) {
                var result = transform_1.nasalize(tokens);
                chai_1.expect(result).to.not.be.undefined;
                chai_1.expect(result).to.have.lengthOf(2);
                chai_1.expect(result).to.be.an("array");
                if (result && types_1.is_phone(result) && Array.isArray(result)) {
                    chai_1.expect(result[0]).to.have.property("type");
                    chai_1.expect(result[0].vowel).to.be.true;
                    chai_1.expect(result[1].type).to.equal("diacritic");
                }
            }
        });
    });
    describe("denasalize", function () {
        it("should not denasalize nasals into obstruents", function () {
            var tokens = ipa_1.get("m");
            var obstruent = ipa_1.get("b");
            if (tokens && types_1.is_phone(tokens) && obstruent && types_1.is_phone(obstruent)) {
                var result = transform_1.denasalize(tokens);
                chai_1.expect(result).to.not.be.undefined;
                chai_1.expect(result).to.have.lengthOf(2);
                chai_1.expect(result).to.be.an("array");
                chai_1.expect(result).to.not.be.deep.equal(obstruent);
            }
        });
    });
    describe("ejectivize", function () {
        it("should turn obstruents into ejectives", function () {
            var tokens = ipa_1.get("t");
            if (tokens && types_1.is_phone(tokens)) {
                var result = transform_1.ejectivize(tokens);
                chai_1.expect(result).to.not.be.undefined;
                chai_1.expect(result).to.have.lengthOf(2);
                chai_1.expect(result).to.be.an("array");
                if (result && types_1.is_phone(result) && Array.isArray(result)) {
                    chai_1.expect(result[0]).to.have.property("type");
                    chai_1.expect(result[0].consonant).to.be.true;
                    chai_1.expect(result[1].type).to.equal("diacritic");
                }
            }
        });
    });
    describe("aspirate", function () {
        it("should aspirate obstruents", function () {
            var tokens = ipa_1.get("t");
            if (tokens && types_1.is_phone(tokens)) {
                var result = transform_1.aspirate(tokens);
                chai_1.expect(result).to.not.be.undefined;
                chai_1.expect(result).to.have.lengthOf(2);
                chai_1.expect(result).to.be.an("array");
                if (result && types_1.is_phone(result) && Array.isArray(result)) {
                    chai_1.expect(result[0]).to.have.property("type");
                    chai_1.expect(result[0].consonant).to.be.true;
                    chai_1.expect(result[1].type).to.equal("diacritic");
                }
            }
        });
    });
});
