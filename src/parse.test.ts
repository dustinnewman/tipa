import "mocha"
import { expect } from "chai"
import { parse } from "./parse"
import { syllable_weight } from "./types"

describe("parse", () => {
    it("should parse a sentence", () => {
        // Example found in Jason Riggle (2005, Local Optionality)
        const result = parse("ã.vi#də#tə#batʁ")
        expect(result).to.not.be.undefined
        if (result) {
            expect(result).to.have.lengthOf(5)
            expect(result[0].onset).to.have.lengthOf(0)
            expect(result[0].nucleus).to.have.lengthOf(1)
            expect(result[0].coda).to.have.lengthOf(0)
            expect(result[0].weight).to.equal(syllable_weight.light)
            expect(result[4].onset).to.have.lengthOf(1)
            expect(result[4].nucleus).to.have.lengthOf(1)
            expect(result[4].coda).to.have.lengthOf(2)
            expect(result[4].weight).to.equal(syllable_weight.heavy)
        }
    })
})