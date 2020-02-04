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

    it("should parse combining symbols as separate diacritics", () => {
        const input = ".e̋."
        const input_len = input.length

        const result = parse(input, {
            auto_syllabify_start: true,
            auto_syllabify_end: true
        })
        expect(result).to.not.be.undefined
        expect(result).to.have.lengthOf(input_len)
        if (result) {
            expect(result[1].type).to.equal("letter")
            expect(result[2].type).to.equal("diacritic")
        }
    })

    it("should parse combining symbols as separate diacritics in Branner form", () => {
        const input = ".e5."
        const input_len = input.length

        const result = parse(input, {
            auto_syllabify_start: true,
            auto_syllabify_end: true
        })
        expect(result).to.not.be.undefined
        expect(result).to.have.lengthOf(input_len)
        if (result) {
            expect(result[1].type).to.equal("letter")
            expect(result[2].type).to.equal("diacritic")
        }
    })

    it("should parse combining symbols identically between Unicode and Branner", () => {
        const ipa = parse(".e̋.", {
            auto_syllabify_start: true,
            auto_syllabify_end: true
        })
        const branner = parse(".e5.", {
            auto_syllabify_start: true,
            auto_syllabify_end: true,
            use_branner: true,
            use_ipa_sym: false
        })
        expect(ipa?.length).to.equal(branner?.length)
        expect(ipa).to.deep.equal(branner)
    })

})