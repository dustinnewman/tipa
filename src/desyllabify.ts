import { word, ipa_segment, ipa_suprasegmental, syllable_stress } from "./types"
import { get } from "./ipa"

interface desyllabify_options {
    leading_syllab?: boolean;
    trailing_syllab?: boolean;
}

const DEF_OPTS: desyllabify_options = {
    leading_syllab: false,
    trailing_syllab: false
}

const syllable_break = get("syllable break")
const primary = get("primary stress")
const secondary = get("secondary stress")

export function desyllabify(input: word, options?: desyllabify_options): ipa_segment[] | undefined {
    options = options ? { ...DEF_OPTS, ...options } : DEF_OPTS

    // Don't try to desyllabify if there is no way to separate
    // the original syllables or we will lose information
    if (!syllable_break) {
        return undefined
    }

    let segments: ipa_segment[] = []

    if (options.leading_syllab) {
        segments.push(syllable_break)
    }

    const num_sylls = input.length
    for (let i = 0; i < num_sylls; i++) {
        // We should check what mark to add
        const stress = input[i].stress
        let mark: ipa_suprasegmental = syllable_break
        if (stress !== undefined) {
            if (stress === syllable_stress.primary && primary) {
                mark = primary
            } else if (stress === syllable_stress.secondary && secondary) {
                mark = secondary
            }
        }
        // Don't double syllabify if we already added the regular
        // syllable break already
        if (i !== 0 || mark.number !== syllable_break.number) {
            segments.push(mark)
        }

        input[i].segments.forEach(segment => {
            segments.push(segment)
        })
    }

    if (options.trailing_syllab) {
        segments.push(syllable_break)
    }

    return segments
}