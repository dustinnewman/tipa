import { word, syllable, ipa_segment, is_phone, is_supra, is_syllabic, ipa_letter, syllabic } from "./types"
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

    let word: word = []
    let onset: ipa_segment[] = []
    let nucleus: syllabic[] = []
    let coda: ipa_segment[] = []
    let syllable_segments: ipa_segment[] = []
    let encountered_syllabic: boolean = false
    const len = input.length
    for (let i = 0; i < len; i++) {
        const curr = input[i]
        if (is_phone(curr)) {
            if (is_syllabic(curr)) {
                encountered_syllabic = true
                nucleus.push(curr)
            } else if (encountered_syllabic) {
                coda.push(curr)
            } else {
                onset.push(curr)
            }
            syllable_segments.push(curr)
        } else if (is_supra(curr)) {
            // Encountered syllable break so push all the
            // accumulated segments into the syllable
            if (syllable_segments.length > 0) {
                const syllable: syllable = {
                    onset: onset,
                    nucleus: nucleus,
                    coda: coda,
                    segments: syllable_segments
                }
                word.push(syllable)
                // Reset all the accumulators
                encountered_syllabic = false
                syllable_segments = []
                onset = []
                nucleus = []
                coda = []
            }
        }
    }

    if (syllable_segments.length > 0) {
        const syllable: syllable = {
            onset: onset,
            nucleus: nucleus,
            coda: coda,
            segments: syllable_segments
        }
        word.push(syllable)
    }

    return word
}