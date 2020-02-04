import { ipa_symbol, ipa_segment, is_supra, is_letter, is_diacritic, phone, is_phone } from "./types"

function clear_accum(accumulator: any[], output: ipa_segment[]) {
    // If there is only one element in the
    // accumulator we definitely prefer to
    // just push the letter itself
    if (is_phone(accumulator)) {
        if (accumulator.length === 1) {
            output.push(accumulator[0])
        } else {
            output.push(accumulator)
        }
    }

    return []
}

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