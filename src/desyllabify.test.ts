import "mocha"
import { expect } from "chai"
import { desyllabify } from "./desyllabify"
import { tokenize } from "./tokenize"
import { collapse } from "./collapse"
import { parse } from "./parse"

describe("desyllabify", () => {
    it("should desyllabify monosyllabic words", () => {
        const tokens = tokenize("mæt")
        if (!tokens) {
            return
        }
        const segments = collapse(tokens)
        if (!segments) {
            return
        }
        const word = parse("mæt")
        if (!word) {
            return
        }
        const result = desyllabify(word, {
            leading_syllab: true,
            trailing_syllab: true
        })
        expect(result).to.not.be.undefined
        if (result) {
            expect(result).to.be.deep.equal(segments)
        }
    })

    it("should desyllabify long polysyllabic words with tone", () => {
        const tokens = tokenize(".ʕe.es.a.án.")
        if (!tokens) {
            return
        }
        const segments = collapse(tokens)
        if (!segments) {
            return
        }
        const word = parse(".ʕe.es.a.án.")
        if (!word) {
            return
        }
        const result = desyllabify(word, {
            leading_syllab: true,
            trailing_syllab: true
        })
        expect(result).to.not.be.undefined
        if (result) {
            expect(result).to.be.deep.equal(segments)
        }
    })

    it("should desyllabify words with syllabic consonants", () => {
        const tokens = tokenize("ˈbɑ.ɾɫ̩")
        if (!tokens) {
            return
        }
        const segments = collapse(tokens)
        if (!segments) {
            return
        }
        const word = parse("ˈbɑ.ɾɫ̩")
        if (!word) {
            return
        }
        const result = desyllabify(word, {
            leading_syllab: true,
            trailing_syllab: true
        })
        expect(result).to.not.be.undefined
        if (result) {
            expect(result).to.be.deep.equal(segments)
        }
    })
})