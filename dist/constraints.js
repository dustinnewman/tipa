"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function NOCODA(output) {
    var violations = 0;
    var num_syllables = output.length;
    for (var i = 0; i < num_syllables; i++) {
        var coda = output[i].coda;
        if (coda) {
            if (coda.length) {
                violations += 1;
            }
        }
    }
    return violations;
}
exports.NOCODA = NOCODA;
function ONSET(output) {
    var violations = 0;
    var num_syllables = output.length;
    for (var i = 0; i < num_syllables; i++) {
        var onset = output[i].onset;
        if (onset) {
            if (onset.length === 0) {
                violations += 1;
            }
        }
        else {
            violations += 1;
        }
    }
    return violations;
}
exports.ONSET = ONSET;
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
