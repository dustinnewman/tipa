// This is ORDERED and must be done in the order specified
const branner_map: Map<string, string> = new Map([
    // FIRST do affricates as they contain other symbols
    ['dl3")))', "d͡ɮ"], // Must precede d and l3")
    ["tl-))", "t͡ɬ"], // Must precede t and l-
    ["tS))", "t͡ʃ"], // Must precede t and S
    ['d3"))', "d͡ʒ"], // Must precede d and 3"
    ["p[f))", "p̪͡f"], // Must precede p and f
    ["b[v))", "b̪͡v"], // Must precede b and v and v)
    ["ts))", "t͡s"], // Must precede t and s
    ["dz))", "d͡z"], // Must precede d and z
    // Now do three letter symbols
    ["ae)", "æ"],
    ["xr^", ""], // TODO
    ['a"&', "ɒ"], // Must precede a"
    ["o/)", "ø"],
    ["oe)", "œ"],
    ["OE)", "Œ"],
    ["l~)", "ɫ"],
    ["ng)", "ŋ"],
    ["nr)", ""], // TODO
    ["nj)", ""], // TODO
    ['l3")', "ɮ"], // Must precede 3"
    ["rr)", ""], // TODO
    ['m&"', ""], // TODO Must precede m&
    ['3"', "ʒ"], // Must precede 3
    ['c"', ""], // TODO
    ['j"', ""], // TODO
    ['v"', "ʋ"], // Must precede v
    ['v)', "\u032C"], // Must precede v
    ["l-", "ɬ"], // Must precede l
    ['a"', "ɑ"], // Must precede a
    ["m&", "ɯ"], // Must precede m
    ['P"', "ɸ"], // Must precede P
    ['B"', "β"], // Must precede B
    ['m"', "ɱ"], // Must precede m
    ['r"', "ɾ"], // Must precede r
    ['g"', "ɣ"], // Must precede g
    ["o-", "ɵ"], // Must precede o
    ["i-", "ɨ"], // Must precede i
    ["u-", "ʉ"], // Must precede u
    ["e&", "ɘ"], // Must precede e
    ["E&", "ɜ"], // Must precede E
    ['E"', "ɞ"], // Must precede E
    ['U"', "ɤ"], // Must precede U
    ["v&", "ʌ"], // Must precede v
    ["c&", "ɔ"], // Must precede c
    ["r&", "ɹ"], // Must precede r
    ["?&", "ʕ"], // Must precede ?
    ["0-", "θ"],
    ["d-", "ð"],
    ["?", "ʔ"],
    ["B", "ʙ"],
    ["G", "ɢ"],
    ["N", "ɴ"],
    ["@", "ə"],
    ["5", "\u030B"],
    ["4", "\u0301"],
    ["3", "\u0304"],
    ["2", "\u0300"],
    ["1", "\u030F"],
    ["V)", "\u0325"],
    [",)", "\u0329"]
])

// Source: https://stackoverflow.com/a/3561711
function escape_regex(s: string) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

export function branner_to_ipa(input: string): string {
    for (let [branner, ipa_sym] of branner_map) {
        const reg_ex = new RegExp(escape_regex(branner), "g")
        input = input.replace(reg_ex, ipa_sym)
    }

    return input
}