"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
function NOCODA(output) {
    var violations = 0;
    var length = output.length;
    for (var i = 0; i < length; i++) {
        if (i > 0 && output[i].name === "syllable break") {
            var prev = output[i - 1];
            if (types_1.is_letter(prev)) {
                if (prev.consonant === true) {
                    violations += 1;
                }
            }
        }
    }
    return violations;
}
exports.NOCODA = NOCODA;
function ONSET(output) {
    var violations = 0;
    var length = output.length;
    for (var i = 0; i < length; i++) {
        if (i < length - 1 && output[i].name === "syllable break") {
            var next = output[i + 1];
            if (types_1.is_letter(next)) {
                if (next.consonant !== true) {
                    violations += 1;
                }
            }
        }
    }
    return violations;
}
exports.ONSET = ONSET;
function MAX(input, output, correspondence) {
    var violations = 0;
    var len = correspondence.length;
    for (var i = 0; i < len; i++) {
        var corr = correspondence[i];
        // If correspondent is not null then there
        // is almost certainly a correspondent in the output
        // However we need to make sure there are no illegal
        // correspondences like consonant -> diacritic/vowel
        if (corr !== null) {
            var inp = input[i];
            var outp = output[corr];
            var inp_is_diac = types_1.is_diacritic(inp);
            var outp_is_diac = types_1.is_diacritic(outp);
            if (inp_is_diac !== outp_is_diac) {
                violations += 1;
            }
            else if (types_1.is_letter(inp) && types_1.is_letter(outp)) {
                var inp_is_cons = types_1.is_consonant(inp);
                var outp_is_cons = types_1.is_consonant(outp);
                var inp_is_vow = types_1.is_vowel(inp);
                var outp_is_vow = types_1.is_vowel(outp);
                if (inp_is_cons !== outp_is_cons) {
                    violations += 1;
                }
                else if (inp_is_vow !== outp_is_vow) {
                    violations += 1;
                }
            }
        }
        else {
            // If correspondent is null then there
            // is no correspondent in the output
            violations += 1;
        }
    }
    return violations;
}
exports.MAX = MAX;
