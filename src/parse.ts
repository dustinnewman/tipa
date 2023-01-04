import { word } from "./types"
import { tokenize } from "./tokenize"
import { collapse } from "./collapse"
import { syllabify } from "./syllabify"

interface parse_options {
    use_branner?: boolean;
    use_ipa_sym?: boolean;
    use_ipa_ent?: boolean;
}

const DEF_OPTS: parse_options = {
    use_branner: false,
    use_ipa_sym: true,
    use_ipa_ent: false,
}

export function parse(input: string, opts?: parse_options): word | undefined {
    opts = opts ? { ...DEF_OPTS, ...opts } : DEF_OPTS

    const tokens = tokenize(input, opts)
    if (tokens === undefined) {
        return undefined
    }

    const segments = collapse(tokens)
    if (segments === undefined) {
        return undefined
    }

    const word = syllabify(segments)
    if (word === undefined) {
        return undefined
    }

    return word
}