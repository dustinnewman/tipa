import { is_letter, word, correspondence, is_diacritic, is_consonant, is_vowel, is_supra } from "./types"

export function NOCODA(output: word): number {
    let violations = 0

    const length = output.length
    for (let i = 0; i < length; i++) {
        if (i > 0 && output[i].name === "syllable break") {
            const prev = output[i - 1]
            if (is_letter(prev)) {
                if (prev.consonant === true) {
                    violations += 1
                }
            }
        }
    }

    return violations
}

export function ONSET(output: word): number {
    let violations = 0

    const length = output.length
    for (let i = 0; i < length; i++) {
        if (i < length - 1 && output[i].name === "syllable break") {
            const next = output[i + 1]
            if (is_letter(next)) {
                if (next.consonant !== true) {
                    violations += 1
                }
            }
        }
    }

    return violations
}

export function MAX(input: word, output: word, correspondence: correspondence): number {
    let violations = 0

    const len = correspondence.length
    for (let i = 0; i < len; i++) {
        const corr = correspondence[i]
        // If correspondent is not null then there
        // is almost certainly a correspondent in the output
        // However we need to make sure there are no illegal
        // correspondences like consonant -> diacritic/supra
        if (corr !== null) {
            const inp = input[i]
            const outp = output[corr]

            const inp_is_diac = is_diacritic(inp)
            const outp_is_diac = is_diacritic(outp)
            const inp_is_supra = is_supra(inp)
            const outp_is_supra = is_supra(outp)
            if (inp_is_diac !== outp_is_diac) {
                violations += 1
                continue
            } else if (inp_is_supra !== outp_is_supra) {
                violations += 1
                continue
            } else if (is_letter(inp) && is_letter(outp)) {
                const inp_is_cons = is_consonant(inp)
                const outp_is_cons = is_consonant(outp)
                const inp_is_vow = is_vowel(inp)
                const outp_is_vow = is_vowel(outp)

                if (inp_is_cons !== outp_is_cons) {
                    violations += 1
                    continue
                } else if (inp_is_vow !== outp_is_vow) {
                    violations += 1
                    continue
                }
            }
        } else {
            // If correspondent is null then there
            // is no correspondent in the output
            violations += 1
            continue
        }
    }

    return violations
}