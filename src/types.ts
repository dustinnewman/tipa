export enum feature {
    neg = -1,
    zero = 0,
    pos = 1,
}

type place = string
type manner = string

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

export type ipa_diacritic = ipa_symbol & {
    features: feature_matrix | {}
}

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

export type consonant = ipa_consonant | ([ipa_consonant, ...Array<ipa_diacritic>])

export type vowel = ipa_vowel | ([ipa_vowel, ...Array<ipa_diacritic>])

export type stop = consonant

export type oral_stop = stop

export type nasal = stop

export type fricative = consonant

export type vibrant = consonant

export type tap = vibrant

export type trill = vibrant

export type voiced = phone & {
    features: {
        VOICE: feature.pos
    }
}

export type voiceless = phone & {
    features: {
        VOICE: feature.neg
    }
}

export type syllabic = phone & {
    features: {
        SYL: feature.pos
    }
}

export type sonorant = phone

export type ipa_segment = phone | ipa_suprasegmental

export type mora = phone[]

export enum syllable_weight {
    light = "light",
    heavy = "heavy",
    superheavy = "superheavy"
}

export type syllable = {
    onset?: ipa_segment[],
    nucleus?: syllabic[],
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

export function is_consonant(symbol: phone): symbol is consonant {
    if (Array.isArray(symbol)) {
        const base_consonant = symbol[0]
        return is_consonant(base_consonant)
    }
    return (symbol as ipa_consonant).consonant === true;
}

export function is_vowel(symbol: phone): symbol is vowel {
    if (Array.isArray(symbol)) {
        const base_vowel = symbol[0]
        return is_vowel(base_vowel)
    }
    return (symbol as ipa_vowel).vowel === true;
}

export function is_stop(symbol: phone): symbol is stop {
    if (Array.isArray(symbol)) {
        const base_letter = symbol[0]
        return is_stop(base_letter)
    }
    return (is_consonant(symbol)
        && (symbol as ipa_letter).features.SON === feature.neg
        && (symbol as ipa_letter).features.CONT === feature.neg
        && (symbol as ipa_letter).features.DELREL === feature.neg
    )
}

export function is_syllabic(symbol: phone): symbol is syllabic {
    if (Array.isArray(symbol)) {
        const base_letter = symbol[0]
        return is_syllabic(base_letter)
    }
    return (symbol as ipa_letter).features.SYL === feature.pos
}

export function is_voiced(symbol: phone): symbol is voiced {
    if (Array.isArray(symbol)) {
        const base_letter = symbol[0]
        return is_voiced(base_letter)
    }
    return (symbol as ipa_letter).features.VOICE === feature.pos
}

export function is_voiceless(symbol: phone): symbol is voiceless {
    if (Array.isArray(symbol)) {
        const base_letter = symbol[0]
        return is_voiceless(base_letter)
    }
    return (symbol as ipa_letter).features.VOICE === feature.neg
}

export function is_sonorant(symbol: phone): symbol is sonorant {
    if (Array.isArray(symbol)) {
        const base_letter = symbol[0]
        return is_sonorant(base_letter)
    }
    return (symbol as ipa_letter).features.SON === feature.pos
}