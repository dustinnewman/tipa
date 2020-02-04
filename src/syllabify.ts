import { word, syllable, ipa_segment, is_phone } from "./types"
import { get } from "./ipa"

interface syllabify_options {
    ignore_initial_syllab?: boolean;
    ignore_final_syllab?: boolean;
}

const DEF_OPTS: syllabify_options = {
    ignore_initial_syllab: true,
    ignore_final_syllab: true
}

export function syllabify(_input: ipa_segment[], options?: syllabify_options): word | undefined {
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
        const initial = input[0]
        if (!is_phone(initial)) {
            if (initial.branner === syllable_break.branner) {
                input = input.slice(1)
            }
        }
    }

    if (options.ignore_final_syllab) {
        const final = input[input.length - 1]
        if (!is_phone(final)) {
            if (final.branner === syllable_break.branner) {
                input = input.slice(0, input.length - 1)
            }
        }
    }
}