import { phone, feature, ipa_letter, feature_string, ipa_diacritic, is_diacritic, stop, ipa_consonant, sonorant, voiceless, voiced, is_voiceless, is_voiced, is_consonant, consonant } from "./types"
import { get_feature_string, set_voice, set_nasal, set_con_glot, set_sp_glot } from "./feature_string"
import { get, get_by_feature_string } from "./ipa"

function set_diacritic(
    input: phone,
    set_fn: (input_fs: feature_string) => feature_string,
    diacritic: ipa_diacritic): phone {
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
            input.features = { ...input.features, ...diacritic.features }
            const target_segment: phone = [input, diacritic]
            return target_segment
        }
    } else {
        // If we were not passed a single letter
        // we were likely passed a letter followed
        // by a series of modifying diacritics (such
        // as tone markers).
        // In this case, simply add the given
        // diacritic after the others
        const letter: ipa_letter = input[0]
        letter.features = { ...letter.features, ...diacritic.features }
        return [letter, diacritic, ...input.slice(1)]
    }
}

export function devoice(input: phone): voiceless | undefined {
    const diac = get("voiceless diacritic")
    if (diac && is_diacritic(diac)) {
        const result = set_diacritic(input, x => set_voice(x, feature.neg), diac)
        if (is_voiceless(result)) {
            return result
        }
    }
    return undefined
}

export function voice(input: phone): phone | undefined {
    const diac = get("voiced diacritic")
    if (diac && is_diacritic(diac)) {
        const result = set_diacritic(input, x => set_voice(x, feature.pos), diac)
        if (is_voiced(result)) {
            return result
        }
    }
    return undefined
}

export function nasalize(input: sonorant): phone | undefined {
    const diac = get("nasal diacritic")
    if (diac && is_diacritic(diac)) {
        return set_diacritic(input, x => set_nasal(x, feature.pos), diac)
    }
    return undefined
}

export function denasalize(input: phone): phone | undefined {
    const diac = get("denasal diacritic")
    if (diac && is_diacritic(diac)) {
        return set_diacritic(input, x => set_nasal(x, feature.neg), diac)
    }
    return undefined
}

export function ejectivize(input: stop): phone | undefined {
    const diac = get("ejective")
    if (diac && is_diacritic(diac)) {
        const set_fn = (x: feature_string) => set_sp_glot(set_con_glot(x, feature.pos), feature.neg)
        return set_diacritic(input, set_fn, diac)
    }
    return undefined
}

export function aspirate(input: phone): consonant | undefined {
    if (is_consonant(input)) {
        const diac = get("aspirated")
        if (diac && is_diacritic(diac)) {
            const set_fn = (x: feature_string) => set_sp_glot(set_con_glot(x, feature.neg), feature.pos)
            const result = set_diacritic(input, set_fn, diac)
            if (is_consonant(result)) {
                return result
            }
        }
        return undefined
    }
}