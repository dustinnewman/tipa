import {
    word,
    syllable,
    ipa_segment,
    is_phone,
    is_supra,
    is_syllabic,
    syllabic,
    syllable_weight,
    ipa_suprasegmental,
    syllable_stress
} from "./types"
import { get } from "./ipa"

interface syllabify_options {
    diphthong_is_heavy?: boolean;
    coda_is_heavy?: boolean;
    long_is_heavy?: boolean;
    mark_superheavy?: boolean;
}

const DEF_OPTS: syllabify_options = {
    diphthong_is_heavy: true,
    coda_is_heavy: true,
    mark_superheavy: false
}

const syllable_break = get("syllable break")
const primary = get("primary stress")
const secondary = get("secondary stress")

export function syllabify(input: ipa_segment[], options?: syllabify_options): word | undefined {
    // Use default options if not provided
    options = options ? { ...DEF_OPTS, ...options } : DEF_OPTS

    if (syllable_break === undefined) {
        // There is no point in attempting to
        // syllabify if we have no marker for it
        return undefined
    }

    const start_new_syllable = (opts: syllabify_options) => {
        if (syllable_segments.length > 0) {
            let weight: syllable_weight = syllable_weight.light
            if (opts.mark_superheavy && nucleus.length > 1 && coda.length > 0) {
                weight = syllable_weight.superheavy
            } else if (opts.diphthong_is_heavy && nucleus.length > 1) {
                weight = syllable_weight.heavy
            } else if (opts.coda_is_heavy && coda.length > 0) {
                weight = syllable_weight.heavy
            }

            let stress: syllable_stress = syllable_stress.unstressed
            if (last_encountered_supra !== undefined) {
                const les_number = last_encountered_supra.number
                if (primary && les_number === primary.number) {
                    stress = syllable_stress.primary
                } else if (secondary && les_number === secondary.number) {
                    stress = syllable_stress.secondary
                }
            }

            const syllable: syllable = {
                onset: onset,
                nucleus: nucleus,
                coda: coda,
                weight: weight,
                stress: stress,
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

    let word: word = []
    let onset: ipa_segment[] = []
    let nucleus: syllabic[] = []
    let coda: ipa_segment[] = []
    let syllable_segments: ipa_segment[] = []
    let encountered_syllabic: boolean = false
    let last_encountered_supra: ipa_suprasegmental | undefined
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
            start_new_syllable(options)
            last_encountered_supra = curr
        }
    }

    start_new_syllable(options)

    return word
}