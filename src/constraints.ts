import { is_letter, word } from "./types"

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