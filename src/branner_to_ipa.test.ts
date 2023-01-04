import "mocha"
import { expect } from "chai"
import { branner_to_ipa } from "./branner_to_ipa"

describe("branner_to_ipa", () => {

    it("should perform vacuous conversions", () => {
        const word = "ma"
        const result = branner_to_ipa(word)
        expect(result).to.equal(word)
    })

    it("should perform simple conversions", () => {
        const branner = "mae)t@"
        const ipa = "mætə"
        const result = branner_to_ipa(branner)
        expect(result).to.equal(ipa)
    })

    it("should perform complex conversions", () => {
        const branner = 'l3")ddl3"))).'
        const ipa = "ɮdd͡ɮ."
        const result = branner_to_ipa(branner)
        expect(result).to.equal(ipa)
    })

    it("should convert tones", () => {
        const branner = "e5"
        const ipa = "e̋"
        const result = branner_to_ipa(branner)
        expect(result).to.equal(ipa)
    })

    it("should convert voiced diacritics", () => {
        const branner = "vv)"
        const ipa = "v̬"
        const result = branner_to_ipa(branner)
        expect(result).to.equal(ipa)
    })

    it("should convert voiceless diacritics", () => {
        const branner = "vV)"
        const ipa = "v̥"
        const result = branner_to_ipa(branner)
        expect(result).to.equal(ipa)
    })

})