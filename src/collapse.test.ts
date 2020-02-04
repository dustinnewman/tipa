import "mocha"
import { expect } from "chai"
import { tokenize } from "./tokenize"
import { collapse } from "./collapse"
import { is_phone } from "./types"

describe("collapse", () => {
    it("should not change input with no diacritics", () => {
        const input = tokenize("lu.nə")
        if (input) {
            const result = collapse(input)
            expect(result).to.not.be.undefined
            if (result) {
                expect(result).to.have.lengthOf(input.length)
                expect(result).to.be.deep.equal(input)
            }
        }
    })

    it("should change input with diacritics", () => {
        const input = tokenize("v̥̄")
        if (input) {
            const result = collapse(input)
            expect(result).to.not.be.undefined
            if (result) {
                expect(result).to.have.lengthOf(input.length - 2)
                expect(result[1]).to.be.an("array")
                expect(is_phone(result[1])).to.be.true
            }
        }
    })
})