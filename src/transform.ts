import { phone, feature, ipa_letter, feature_string, ipa_diacritic } from "./types"
import { get_feature_string, set_voice, set_nasal, set_con_glot, set_sp_glot } from "./feature_string"
import { get, get_by_feature_string } from "./ipa"

function set_diacritic(
    input: phone,
    set_fn: (input_fs: feature_string) => feature_string,
    diacritic: ipa_diacritic | undefined): phone | undefined {
    if (!Array.isArray(input)) {
        const input_fs: feature_string = get_feature_string(input.features)
        const target_fs: feature_string = set_fn(input_fs)
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
    const diac = get("voiceless diacritic")
    return set_diacritic(input, x => set_voice(x, feature.neg), diac)
}

export function voice(input: phone): phone | undefined {
    const diac = get("voiced diacritic")
    return set_diacritic(input, x => set_voice(x, feature.pos), diac)
}

export function nasalize(input: phone): phone | undefined {
    const diac = get("nasal diacritic")
    return set_diacritic(input, x => set_nasal(x, feature.pos), diac)
}

export function denasalize(input: phone): phone | undefined {
    const diac = get("denasal diacritic")
    return set_diacritic(input, x => set_nasal(x, feature.neg), diac)
}

export function ejectivize(input: phone): phone | undefined {
    const diac = get("ejective")
    const set_fn = (x: feature_string) => set_sp_glot(set_con_glot(x, feature.pos), feature.neg)
    return set_diacritic(input, set_fn, diac)
}

export function aspirate(input: phone): phone | undefined {
    const diac = get("aspirated")
    const set_fn = (x: feature_string) => set_sp_glot(set_con_glot(x, feature.neg), feature.pos)
    return set_diacritic(input, set_fn, diac)
}