import "mocha"
import { expect } from "chai"
import { get } from "./ipa"
import { devoice, voice } from "./transform"
import { tokenize } from "./tokenize"
import { is_phone, is_letter, is_supra, phone } from "./types"

describe("transform", () => {
    describe("devoice", () => {

        it("should return the input given a voiceless segment", () => {
            const voiceless = get("t")
            if (voiceless !== undefined && is_phone(voiceless)) {
                const result = devoice(voiceless)
                expect(result).to.deep.equal(voiceless)
            }
        })

        it("should return a voiceless segment given a voiced segment", () => {
            const voiced = get("d")
            const voiceless = get("t")
            if (voiced !== undefined
                && voiceless !== undefined
                && is_phone(voiced)
                && is_phone(voiceless)) {
                const result = devoice(voiced)
                expect(result).to.deep.equal(voiceless)
            }
        })

        it("should preserve diacritics", () => {
            const voiced = tokenize("v̄")
            const devoiced = tokenize("v̥̄")
            if (voiced && devoiced) {
                const filtered_voiced = voiced.filter(x => !is_supra(x))
                const filtered_devoiced = devoiced.filter(x => !is_supra(x))
                const voiced_letter = filtered_voiced[0]
                const devoiced_letter = filtered_devoiced[0]
                if (is_letter(voiced_letter) && is_letter(devoiced_letter)) {
                    const fv: phone = [voiced_letter, ...filtered_voiced.slice(1)]
                    const fd: phone = [devoiced_letter, ...filtered_devoiced.slice(1)]
                    const result = devoice(fv)
                    if (result) {
                        expect(result).to.deep.equal(fd)
                    }
                }
            }
        })

    })

    describe("voice", () => {

        it("should return the input given a voiced segment", () => {
            const voiced = get("d")
            if (voiced !== undefined && is_phone(voiced)) {
                const result = voice(voiced)
                expect(result).to.deep.equal(voiced)
            }
        })

        it("should return a voiced segment given a voiceless segment", () => {
            const voiceless = get("t")
            const voiced = get("d")
            if (voiceless !== undefined
                && voiced !== undefined
                && is_phone(voiceless)
                && is_phone(voiced)) {
                const result = voice(voiceless)
                expect(result).to.deep.equal(voiced)
            }
        })

        it("should voice voiceless affricates", () => {
            const input = get("t͡ʃ")
            const output = get("d͡ʒ")
            if (input !== undefined
                && output !== undefined
                && is_phone(input)
                && is_phone(output)) {
                const result = voice(input)
                expect(result).to.deep.equal(output)
            }
        })
    })
})