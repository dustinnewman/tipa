import { is_phone, word, correspondence, is_diacritic, is_consonant, is_vowel, is_supra } from "./types"

export function NOCODA(output: word): number {
    let violations = 0

    const num_syllables = output.length
    for (let i = 0; i < num_syllables; i++) {
        const coda = output[i].coda
        if (coda) {
            if (coda.length) {
                violations += 1
            }
        }
    }

    return violations
}

export function ONSET(output: word): number {
    let violations = 0

    const num_syllables = output.length
    for (let i = 0; i < num_syllables; i++) {
        const onset = output[i].onset
        if (onset) {
            if (onset.length === 0) {
                violations += 1
            }
        } else {
            violations += 1
        }
    }

    return violations
}

// export function MAX(input: word, output: word, correspondence: correspondence): number {
//     let violations = 0

//     const len = correspondence.length
//     for (let i = 0; i < len; i++) {
//         const corr = correspondence[i]
//         // If correspondent is not null then there
//         // is almost certainly a correspondent in the output
//         // However we need to make sure there are no illegal
//         // correspondences like consonant -> diacritic/supra
//         if (corr !== null) {
//             const inp = input[i]
//             const outp = output[corr]

//             const inp_is_diac = is_diacritic(inp)
//             const outp_is_diac = is_diacritic(outp)
//             const inp_is_supra = is_supra(inp)
//             const outp_is_supra = is_supra(outp)
//             if (inp_is_diac !== outp_is_diac) {
//                 violations += 1
//                 continue
//             } else if (inp_is_supra !== outp_is_supra) {
//                 violations += 1
//                 continue
//             } else if (is_phone(inp) && is_phone(outp)) {
//                 const inp_is_cons = is_consonant(inp)
//                 const outp_is_cons = is_consonant(outp)
//                 const inp_is_vow = is_vowel(inp)
//                 const outp_is_vow = is_vowel(outp)

//                 if (inp_is_cons !== outp_is_cons) {
//                     violations += 1
//                     continue
//                 } else if (inp_is_vow !== outp_is_vow) {
//                     violations += 1
//                     continue
//                 }
//             }
//         } else {
//             // If correspondent is null then there
//             // is no correspondent in the output
//             violations += 1
//             continue
//         }
//     }

//     return violations
// }