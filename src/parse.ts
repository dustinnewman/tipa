import { word } from "./types";
import { tokenize } from "./tokenize";
import { collapse } from "./collapse";
import { syllabify } from "./syllabify";

export function parse(input: string): word | undefined {
    const tokens = tokenize(input)
    if (tokens === undefined) {
        return undefined
    }

    const segments = collapse(tokens)
    if (segments === undefined) {
        return undefined
    }

    const word = syllabify(segments)
    if (word === undefined) {
        return undefined
    }

    return word
}