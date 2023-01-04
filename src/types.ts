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
    light,
    heavy,
    superheavy
}

export enum syllable_stress {
    unstressed,
    primary,
    secondary
}

export type syllable = {
    onset?: ipa_segment[],
    nucleus?: syllabic[],
    coda?: ipa_segment[],
    weight?: syllable_weight,
    stress?: syllable_stress,
    segments: ipa_segment[]
}

export type word = syllable[]

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

export function get_letter_from_phone(phone: phone): ipa_letter | undefined {
    if (Array.isArray(phone)) {
        const base_letter = phone[0]
        if (is_letter(base_letter)) {
            return base_letter
        } else {
            return undefined
        }
    } else if (is_letter(phone)) {
        return phone
    } else {
        return undefined
    }
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
    let letter = get_letter_from_phone(symbol)
    if (letter === undefined) {
        return false
    }
    return (letter as ipa_consonant).consonant === true;
}

export function is_vowel(symbol: phone): symbol is vowel {
    let letter = get_letter_from_phone(symbol)
    if (letter === undefined) {
        return false
    }
    return (letter as ipa_vowel).vowel === true;
}

export function is_stop(symbol: phone): symbol is stop {
    let letter = get_letter_from_phone(symbol)
    if (letter === undefined) {
        return false
    }
    return (is_consonant(letter)
        && letter.features.SON === feature.neg
        && letter.features.CONT === feature.neg
        && letter.features.DELREL === feature.neg
    )
}

export function is_syllabic(symbol: phone): symbol is syllabic {
    let letter = get_letter_from_phone(symbol)
    if (letter === undefined) {
        return false
    }
    return letter.features.SYL === feature.pos
}

export function is_voiced(symbol: phone): symbol is voiced {
    let letter = get_letter_from_phone(symbol)
    if (letter === undefined) {
        return false
    }
    return letter.features.VOICE === feature.pos
}

export function is_voiceless(symbol: phone): symbol is voiceless {
    let letter = get_letter_from_phone(symbol)
    if (letter === undefined) {
        return false
    }
    return letter.features.VOICE === feature.neg
}

export function is_sonorant(symbol: phone): symbol is sonorant {
    let letter = get_letter_from_phone(symbol)
    if (letter === undefined) {
        return false
    }
    return letter.features.SON === feature.pos
}