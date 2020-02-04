import "mocha"
import { expect } from "chai"
import { get } from "./ipa"
import { devoice } from "./transform"
import { parse } from "./parse"
import { is_letter, is_supra, ipa_segment } from "./types"

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

    it("should preserve diacritics", () => {
        const voiced = parse("v̄")
        const devoiced = parse("v̥̄")
        if (voiced && devoiced) {
            const filtered_voiced = voiced.filter(x => !is_supra(x))
            const filtered_devoiced = devoiced.filter(x => !is_supra(x))
            const voiced_letter = filtered_voiced[0]
            const devoiced_letter = filtered_devoiced[0]
            if (is_letter(voiced_letter) && is_letter(devoiced_letter)) {
                const fv: ipa_segment = [voiced_letter, ...filtered_voiced.slice(1)]
                const fd: ipa_segment = [devoiced_letter, ...filtered_devoiced.slice(1)]
                const result = devoice(fv)
                if (result) {
                    expect(result).to.deep.equal(fd)
                }
            }
        }
    })

})