import { phone, feature, ipa_letter, feature_string, ipa_diacritic } from "./types"
import { get_feature_string, set_voice } from "./feature_string"
import { get, get_by_feature_string } from "./ipa"

function set_diacritic(
    input: phone,
    set_fn: (input_fs: feature_string, value: feature) => feature_string,
    set_val: feature,
    diacritic: ipa_diacritic | undefined): phone | undefined {
    if (!Array.isArray(input)) {
        const input_fs = get_feature_string(input.features)
        const target_fs = set_fn(input_fs, set_val)
        if (input_fs === target_fs) {
            // Input is already transformed
            return input
        }
        const target_letter = get_by_feature_string(target_fs)
        if (target_letter !== undefined) {
            // Ideal case: we found the counterpart
            return target_letter
        } else {
            // We could not find the transformed counterpart
            // so we create an array and add the given
            // diacritic in the second position
            if (diacritic !== undefined) {
                const target_segment: phone = [input, diacritic]
                return target_segment
            } else {
                // In the very unusual case we do not find the
                // desired diacritic return undefined to signal
                // to the caller that no such representation exists
                return undefined
            }
        }
    } else {
        // If we were not passed a single letter
        // we were likely passed a letter followed
        // by a series of modifying diacritics (such
        // as tone markers).
        // In this case, simply add the given
        // diacritic after the others
        const letter: ipa_letter = input[0]
        if (diacritic !== undefined) {
            return [letter, diacritic, ...input.slice(1)]
        } else {
            // In the very unusual case we do not find the
            // voiceless diacritic return undefined to signal
            // to the caller that no such representation exists
            return undefined
        }
    }
}

export function devoice(input: phone): phone | undefined {
    const voiceless_diac = get("voiceless diacritic")
    return set_diacritic(input, set_voice, feature.neg, voiceless_diac)
}

export function voice(input: phone): phone | undefined {
    const voiced_diac = get("voiced diacritic")
    return set_diacritic(input, set_voice, feature.pos, voiced_diac)
}