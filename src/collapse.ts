import { ipa_symbol, ipa_segment, is_supra, is_letter, is_diacritic, phone, is_phone } from "./types"

function clear_accum(accumulator: any[], output: ipa_segment[]) {
    // If there is only one element in the
    // accumulator we definitely prefer to
    // just push the letter itself
    if (is_phone(accumulator)) {
        if (accumulator.length === 1) {
            output.push(accumulator[0])
        } else {
            // This is where we apply all the features of the diacritics
            // Onto the base letter so e.g. the syllabic diacritic
            // Will actually make the letter syllabic featured
            const len = accumulator.length
            for (let i = 1; i < len; i++) {
                accumulator[0].features = { ...accumulator[0].features, ...accumulator[i].features }
            }
            output.push(accumulator)
        }
    }

    return []
}

/**
 * Applies a series of diacritics and suprasegmentals to an initial letter
 * @param _input A list of IPA symbols
 * @returns A list of processed IPA segments
 */
export function collapse(_input: ipa_symbol[]): ipa_segment[] | undefined {
    let input = _input

    const len = input.length
    let i = 0
    let output: ipa_segment[] = []
    let accumulator = []
    while (i < len) {
        const curr = input[i]
        if (is_diacritic(curr)) {
            if (accumulator && Array.isArray(accumulator)) {
                accumulator.push(curr)
            }
            i += 1
            continue
        } else {
            accumulator = clear_accum(accumulator, output)
            if (is_supra(curr)) {
                output.push(curr)
                i += 1
                continue
            }

            // We have a letter which can either be standalone
            // or the beginning of a string of modifying
            // diacritics
            if (is_letter(curr)) {
                accumulator = [curr]
                i += 1
                continue
            }
        }
    }

    // Make sure to include the final letter
    clear_accum(accumulator, output)

    return output
}