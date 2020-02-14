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
    ["ae)", "\u00E6"],
    ["xr^", ""], // TODO
    ['a"&', "\u0252"], // Must precede a"
    ["o/)", "ø"],
    ["oe)", "œ"],
    ["OE)", "Œ"],
    ["l~)", "ɫ"],
    ["~/^", "\u034A"], // Must precede ~
    ["ng)", "ŋ"],
    ["nr)", ""], // TODO
    ["nj)", ""], // TODO
    ['l3")', "ɮ"], // Must precede 3"
    ['h")', "\u0324"], // Must precede h
    ["&g^", "\u02E4"], // Must precede g
    ["rr)", ""], // TODO
    ['m&"', ""], // TODO Must precede m&
    ['3"', "ʒ"], // Must precede 3
    ['c"', ""], // TODO Must precede c
    ['j"', ""], // TODO Must precede j
    ['v"', "ʋ"], // Must precede v
    ['u"', "\u03BC"], // Must precede u
    ["v)", "\u032C"], // Must precede v
    ["l-", "ɬ"], // Must precede l
    ['a"', "\u0251"], // Must precede a
    ["m&", "ɯ"], // Must precede m
    ['P"', "ɸ"], // Must precede P
    ['B"', "β"], // Must precede B
    ['m"', "ɱ"], // Must precede m
    ['r"', "ɾ"], // Must precede r
    ['g"', "ɣ"], // Must precede g
    ["o-", "ɵ"], // Must precede o
    ["i-", "\u0268"], // Must precede i
    ["u-", "\u0289"], // Must precede u
    ["e&", "ɘ"], // Must precede e
    ["E&", "ɜ"], // Must precede E
    ['E"', "ɞ"], // Must precede E
    ["R%", "\u0281"], // Must precede R
    ['U"', "\u0264"], // Must precede U
    ["v&", "ʌ"], // Must precede v
    ["c&", "\u0254"], // Must precede c
    ["r&", "ɹ"], // Must precede r
    ["?&", "ʕ"], // Must precede ?
    ["h^", "\u02B0"], // Must precede h
    ["~^", "\u0303"], // Must precede ~
    ["j^", "\u02B2"], // Must precede j
    ["w^", "\u02B7"], // Must precede w
    ["g^", "\u02E0"], // Must precede g
    ["0-", "\u03B8"],
    ["d-", "\u00F0"],
    ["?", "ʔ"],
    ["B", "ʙ"],
    ["G", "ɢ"],
    ["N", "ɴ"],
    ["@", "ə"],
    ["j", "\u006A"],
    ["5", "\u030B"],
    ["4", "\u0301"],
    ["3", "\u0304"],
    ["2", "\u0300"],
    ["1", "\u030F"],
    ["V)", "\u0325"],
    [",)", "\u0329"],
    ["~", "\u0330"],
    ["`", "\u02BC"],
    ["'", "\u02C8"],
    [",", "\u02CC"]
])

// Source: https://stackoverflow.com/a/3561711
function escape_regex(s: string) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
}

export function branner_to_ipa(input: string): string {
    for (let [branner, ipa_sym] of branner_map) {
        const reg_ex = new RegExp(escape_regex(branner), "g")
        input = input.replace(reg_ex, ipa_sym)
    }

    return input
}