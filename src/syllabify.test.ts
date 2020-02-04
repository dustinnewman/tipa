import "mocha"
import { expect } from "chai"
import { tokenize } from "./tokenize"
import { syllabify } from "./syllabify"

describe("syllabify", () => {
    it("should tokenize long polysyllabic words with tone", () => {
        const tokens = tokenize(".ʕe.es.a.án.")
        if (!tokens) {
            return
        }
        const result = syllabify(tokens)
        expect(result).to.not.be.undefined
        if (result) {
            expect(result).to.have.lengthOf(4)
        }
    })
})