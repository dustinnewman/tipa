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
