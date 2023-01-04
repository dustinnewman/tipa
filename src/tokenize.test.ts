import "mocha"
import { expect } from "chai"
import { LETTER, DIAC, SUPRA } from "./types"
import { tokenize } from "./tokenize"

describe("tokenize", () => {

    it("should tokenize a syllable with an onset and no coda", () => {
        const result = tokenize("mi")
        expect(result).to.not.be.undefined
    })

    it("should auto-syllabify a syllable", () => {
        const input = "mi"
        const input_len = input.length

        const result = tokenize(input, {
            auto_syllabify_start: true,
            auto_syllabify_end: true
        })
        expect(result).to.have.lengthOf(input_len + 2)
    })

    it("should not auto-syllabify a syllabified syllable", () => {
        const input = ".mi."
        const input_len = input.length

        const result = tokenize(input, {
            auto_syllabify_start: true,
            auto_syllabify_end: true
        })
        expect(result).to.have.lengthOf(input_len)
    })

    it("should tokenize a syllable with a coda and onset", () => {
        const result = tokenize("mæt")
        expect(result).to.not.be.undefined
    })

    it("should tokenize a disyllabic word with no codas", () => {
        const result = tokenize("lu.nə")
        expect(result).to.not.be.undefined
    })

    it("should tokenize Branner and IPA the same", () => {
        const ipa = tokenize("lʉ.nə", {
            use_ipa_sym: true,
            use_branner: false
        })
        const branner = tokenize("lu-.n@", {
            use_ipa_sym: false,
            use_branner: true
        })
        expect(ipa).to.deep.equal(branner)
    })

    it("should tokenize combining symbols as separate diacritics", () => {
        const input = ".e̋."
        const input_len = input.length

        const result = tokenize(input, {
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

    it("should tokenize combining symbols as separate diacritics in Branner form", () => {
        const input = ".e5."
        const input_len = input.length

        const result = tokenize(input, {
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

    it("should tokenize combining symbols identically between Unicode and Branner", () => {
        const ipa = tokenize(".e̋.", {
            auto_syllabify_start: true,
            auto_syllabify_end: true
        })
        const branner = tokenize(".e5.", {
            auto_syllabify_start: true,
            auto_syllabify_end: true,
            use_branner: true,
            use_ipa_sym: false
        })
        expect(ipa).to.not.be.undefined
        expect(branner).to.not.be.undefined
        if (ipa && branner) {
            expect(ipa.length).to.equal(branner.length)
            expect(ipa).to.deep.equal(branner)
        }
    })

    it("should tokenize long polysyllabic words with tone", () => {
        const result = tokenize(".ʕe.es.a.án.")
        expect(result).to.not.be.undefined
        if (result) {
            expect(result).to.have.lengthOf(13)
            expect(result[0].type).to.equal(SUPRA)
            expect(result[1].type).to.equal(LETTER)
            expect(result[1].branner).to.equal("?&")
            expect(result[3].type).to.equal(SUPRA)
            expect(result[9].type).to.equal(LETTER)
            expect(result[10].type).to.equal(DIAC)
            expect(result[10].branner).to.equal("4")
        }
    })

    it("should tokenize affricates as one letter", () => {
        const input = "ɮdd͡ɮ."

        const result = tokenize(input, {
            auto_syllabify_start: true,
            auto_syllabify_end: true
        })
        expect(result).to.not.be.undefined
        expect(result).to.have.lengthOf(5)
        if (result) {
            expect(result[3].branner).to.equal('dl3")))')
        }
    })

})