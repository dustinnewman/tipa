import { ipa_segment, is_letter, feature, ipa_letter } from "./types"
import { get_feature_string, set_voice } from "./feature_string"
import { get, get_by_feature_string } from "./ipa"

export function devoice(input: ipa_segment): ipa_segment | undefined {
    if (is_letter(input)) {
        const input_fs = get_feature_string(input.features)
        const target_fs = set_voice(input_fs, feature.neg)
        if (input_fs === target_fs) {
            // Input is already voiceless
            return input
        }
        const target_letter = get_by_feature_string(target_fs)
        if (target_letter !== undefined) {
            // Ideal case: we found the voiceless counterpart
            return target_letter
        } else {
            // We could not find the voiceless counterpart
            // so we create an array and add the voiceless
            // diacritic in the second position
            const voiceless_diac = get("voiceless diacritic")
            if (voiceless_diac !== undefined) {
                const target_segment: ipa_segment = [input, voiceless_diac]
                return target_segment
            } else {
                // In the very unusual case we do not find the
                // voiceless diacritic return undefined to signal
                // to the caller that no such representation exists
                return undefined
            }
        }
    } else {
        // If we were not passed a single letter
        // we were likely passed a letter followed
        // by a series of modifying diacritics (such
        // as tone markers).
        // In this case, simply add the voiceless
        // diacritic after the others
        const letter: ipa_letter = input[0]
        const voiceless_diac = get("voiceless diacritic")
        if (voiceless_diac !== undefined) {
            return [letter, voiceless_diac, ...input.slice(1)]
        } else {
            // In the very unusual case we do not find the
            // voiceless diacritic return undefined to signal
            // to the caller that no such representation exists
            return undefined
        }
    }
}