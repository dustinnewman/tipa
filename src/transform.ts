import { ipa_segment, is_letter, feature } from "./types"
import { get_feature_string, set_voice } from "./feature_string"
import { get, get_by_feature_string } from "./ipa"

export function devoice(input: ipa_segment): ipa_segment {
    if (is_letter(input)) {
        const input_fs = get_feature_string(input.features)
        const target_fs = set_voice(input_fs, feature.neg)
        if (input_fs === target_fs) {
            return input
        }
        const target_letter = get_by_feature_string(target_fs)
        if (target_letter !== undefined) {
            return target_letter
        } else {
            const voiceless_diac = get("voiceless diacritic")
            if (voiceless_diac !== undefined) {
                const target_segment: ipa_segment = [input, voiceless_diac]
                return target_segment
            } else {
                return input
            }
        }
    } else {
        return input
    }
}