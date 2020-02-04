import "mocha"
import { expect } from "chai"
import { get } from "./ipa"
import { devoice } from "./transform"
import { is_letter } from "./types"

describe("devoice", () => {

    it("should return the input given a voiceless segment", () => {
        const voiceless = get("t")
        if (voiceless !== undefined && is_letter(voiceless)) {
            const result = devoice(voiceless)
            expect(result).to.deep.equal(voiceless)
        }
    })

    it("should return a voiceless segment given a voiced segment", () => {
        const voiced = get("d")
        const voiceless = get("t")
        if (voiced !== undefined
            && voiceless !== undefined
            && is_letter(voiced)
            && is_letter(voiceless)) {
            const result = devoice(voiced)
            expect(result).to.deep.equal(voiceless)
        }
    })

})