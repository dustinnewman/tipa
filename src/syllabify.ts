import { word, syllable } from "./types"
import { get } from "./ipa"

interface syllabify_options {
    ignore_initial_syllab?: boolean;
    ignore_final_syllab?: boolean;
}

const DEF_OPTS: syllabify_options = {
    ignore_initial_syllab: true,
    ignore_final_syllab: true
}

export function syllabify(_input: word, options?: syllabify_options): syllable[] | undefined {
    // Use default options if not provided
    options = options ? { ...DEF_OPTS, ...options } : DEF_OPTS
    const syllable_break = get("syllable break")
    if (syllable_break === undefined) {
        // There is no point in attempting to
        // syllabify if we have no marker for it
        return undefined
    }

    let input = _input
    if (options.ignore_initial_syllab) {
        if (input[0].branner === syllable_break.branner) {
            input = input.slice(1)
        }
    }

    if (options.ignore_final_syllab) {
        if (input[input.length - 1].branner === syllable_break.branner) {
            input = input.slice(0, input.length - 1)
        }
    }
}