import "mocha"
import { expect } from "chai"
import { parse } from "./parse"
import { NOCODA, ONSET, MAX } from "./constraints"

describe("NOCODA", () => {

    it("should assign zero violations to a syllable with no coda", () => {
        const word = parse(".ma.")
        if (word) {
            const violations = NOCODA(word)
            expect(violations).to.equal(0)
        }
    })

    it("should assign one violation to a syllable with a coda", () => {
        const word = parse(".mæt.")
        if (word) {
            const violations = NOCODA(word)
            expect(violations).to.equal(1)
        }
    })

})

describe("ONSET", () => {

    it("should assign zero violations to a syllable with an onset", () => {
        const word = parse(".ma.")
        if (word) {
            const violations = ONSET(word)
            expect(violations).to.equal(0)
        }
    })

    it("should assign one violation to a syllable without an onset", () => {
        const word = parse(".æt.")
        if (word) {
            const violations = ONSET(word)
            expect(violations).to.equal(1)
        }
    })

})

describe("MAX", () => {

    it("should assign zero violations to faithful candidate", () => {
        const input = parse(".ma.")
        const output = parse(".ma.")
        const correspondence = [0, 1, 2, 3]
        if (input && output) {
            const violations = MAX(input, output, correspondence)
            expect(violations).to.equal(0)
        }
    })

    it("should assign one violation", () => {
        const input = parse(".ma.")
        const output = parse(".m.")
        const correspondence = [0, 1, null, 2]
        if (input && output) {
            const violations = MAX(input, output, correspondence)
            expect(violations).to.equal(1)
        }
    })

    it("should not assign violations for epenthesis", () => {
        const input = parse(".ma.")
        const output = parse(".mat.")
        const correspondence = [0, 1, 2, 4]
        if (input && output) {
            const violations = MAX(input, output, correspondence)
            expect(violations).to.equal(0)
        }
    })

})