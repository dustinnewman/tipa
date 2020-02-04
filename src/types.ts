export enum feature {
    neg = -1,
    zero = 0,
    pos = 1,
}

export type place = string
export type manner = string

export interface feature_matrix {
    SYL: feature;
    CONS: feature;
    SON: feature;
    CONT: feature;
    DELREL: feature;
    APPROX: feature;
    TAP: feature;
    TRIL: feature;
    LAT: feature;
    NASAL: feature;
    VOICE: feature;
    SP_GLOT: feature;
    CON_GLOT: feature;
    LABIAL: feature;
    ROUND: feature;
    LAB_DEN: feature;
    CORONAL: feature;
    ANT: feature;
    DISTRO: feature;
    STRID: feature;
    DORSAL: feature;
    HIGH: feature;
    LOW: feature;
    FRONT: feature;
    BACK: feature;
    TENSE: feature;
}

export type feature_string = string

export type ipa_symbol = {
    name: string;
    type: string;
    ipa_sym: string;
    ipa_ent: string;
    branner: string;
    number: number;
}

export type ipa_diacritic = ipa_symbol

export type ipa_suprasegmental = ipa_symbol

export type ipa_vowel = ipa_symbol & {
    place: place;
    consonant: boolean;
    vowel: boolean;
    features: feature_matrix;
}

export type ipa_consonant = ipa_vowel & {
    manner: manner;
}

export type ipa_letter = ipa_vowel | ipa_consonant

export type phone = ipa_letter | ([ipa_letter, ...Array<ipa_diacritic>])

export type ipa_segment = phone | ipa_suprasegmental

export type mora = phone[]

export enum syllable_weight {
    light = "light",
    heavy = "heavy",
    superheavy = "superheavy"
}

export type syllable = {
    onset?: ipa_segment[],
    nucleus?: ipa_segment[],
    coda?: ipa_segment[],
    weight?: syllable_weight,
    segments: ipa_segment[]
}

export type word = syllable[]

export type correspondence = (number | null)[]

export type markedness_constraint = (output: word) => number

export type faithfulness_constraint = (input: word, output: word, corr: correspondence) => number

export const LETTER = "letter"
export const DIAC = "diacritic"
export const SUPRA = "suprasegmental"

export function is_diacritic(symbol: ipa_symbol): symbol is ipa_diacritic {
    return (symbol as ipa_diacritic).type === DIAC
}

export function is_supra(symbol: ipa_symbol): symbol is ipa_suprasegmental {
    if (symbol === undefined) {
        return false
    }
    return (symbol as ipa_suprasegmental).type === SUPRA
}

export function is_letter(symbol: ipa_symbol): symbol is ipa_letter {
    if (symbol === undefined) {
        return false
    }
    return (symbol as ipa_symbol).type === LETTER
}

export function is_phone(symbol: (ipa_symbol | (ipa_symbol[]))): symbol is phone {
    if (symbol === undefined) {
        return false
    }
    if (Array.isArray(symbol)) {
        const base_letter = symbol[0]
        if (is_letter(base_letter)) {
            if (symbol.length === 1) {
                return true
            }
            return symbol.slice(1).every(x => is_diacritic(x))
        }
        return false
    }

    return is_letter(symbol)
}

export function is_consonant(symbol: phone): symbol is ipa_consonant {
    if (Array.isArray(symbol)) {
        const base_consonant = symbol[0]
        return is_consonant(base_consonant)
    }
    return (symbol as ipa_consonant).consonant === true;
}

export function is_vowel(symbol: phone): symbol is ipa_vowel {
    if (Array.isArray(symbol)) {
        const base_vowel = symbol[0]
        return is_vowel(base_vowel)
    }
    return (symbol as ipa_vowel).vowel === true;
}