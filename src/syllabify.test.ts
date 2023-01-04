import "mocha"
import { expect } from "chai"
import { tokenize } from "./tokenize"
import { syllabify } from "./syllabify"
import { collapse } from "./collapse"

describe("syllabify", () => {
    it("should syllabify monosyllabic words", () => {
        const tokens = tokenize("mæt")
        if (!tokens) {
            return
        }
        const segments = collapse(tokens)
        if (!segments) {
            return
        }
        const result = syllabify(segments)
        expect(result).to.not.be.undefined
        if (result) {
            expect(result).to.have.lengthOf(1)
        }
    })

    it("should syllabify disyllabic words", () => {
        const tokens = tokenize("lu.nə")
        if (!tokens) {
            return
        }
        const segments = collapse(tokens)
        if (!segments) {
            return
        }
        const result = syllabify(segments)
        expect(result).to.not.be.undefined
        if (result) {
            expect(result).to.have.lengthOf(2)
        }
    })

    it("should syllabify long polysyllabic words with tone", () => {
        const tokens = tokenize(".ʕe.es.a.án.")
        if (!tokens) {
            return
        }
        const segments = collapse(tokens)
        if (!segments) {
            return
        }
        const result = syllabify(segments)
        expect(result).to.not.be.undefined
        if (result) {
            expect(result).to.have.lengthOf(4)
        }
    })

    it("should syllabify words with affricates", () => {
        const tokens = tokenize("ɮdd͡ɮ.")
        if (!tokens) {
            return
        }
        const segments = collapse(tokens)
        if (!segments) {
            return
        }
        const result = syllabify(segments)
        expect(result).to.not.be.undefined
        if (result) {
            expect(result).to.have.lengthOf(1)
        }
    })

    it("should syllabify words with syllabic consonants", () => {
        const tokens = tokenize("ˈbɑ.ɾɫ̩")
        if (!tokens) {
            return
        }
        const segments = collapse(tokens)
        if (!segments) {
            return
        }
        const result = syllabify(segments)
        expect(result).to.not.be.undefined
        if (result) {
            expect(result).to.have.lengthOf(2)
            expect(result[0].onset).to.have.lengthOf(1)
            expect(result[0].nucleus).to.have.lengthOf(1)
            expect(result[0].coda).to.have.lengthOf(0)
            expect(result[1].onset).to.have.lengthOf(1)
            expect(result[1].nucleus).to.have.lengthOf(1)
            expect(result[1].coda).to.have.lengthOf(0)
        }
    })
})