import "mocha"
import { expect } from "chai"
import { parse } from "./parse"

describe("parse", () => {

    it("should parse a syllable with an onset and no coda", () => {
        const result = parse("mi")
        expect(result).to.not.be.undefined
    })

    it("should auto-syllabify a syllable", () => {
        const input = "mi"
        const input_len = input.length

        const result = parse(input, {
            auto_syllabify_start: true,
            auto_syllabify_end: true
        })
        expect(result).to.have.lengthOf(input_len + 2)
    })

    it("should not auto-syllabify a syllabified syllable", () => {
        const input = ".mi."
        const input_len = input.length

        const result = parse(input, {
            auto_syllabify_start: true,
            auto_syllabify_end: true
        })
        expect(result).to.have.lengthOf(input_len)
    })

    it("should parse a syllable with a coda and onset", () => {
        const result = parse("mæt")
        expect(result).to.not.be.undefined
    })

    it("should parse a disyllabic word with no codas", () => {
        const result = parse("lu.nə")
        expect(result).to.not.be.undefined
    })

    it("should parse Branner and IPA the same", () => {
        const ipa = parse("lʉ.nə", {
            use_ipa_sym: true,
            use_branner: false
        })
        const branner = parse("lu-.n@", {
            use_ipa_sym: false,
            use_branner: true
        })
        expect(ipa).to.deep.equal(branner)
    })

})