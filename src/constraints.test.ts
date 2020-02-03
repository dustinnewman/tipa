import "mocha"
import { expect } from "chai"
import { parse } from "./parse"
import { NOCODA, ONSET } from "./constraints"

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