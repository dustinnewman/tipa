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

export type word = ipa_symbol[]

export type ipa_segment = (ipa_letter) | ([ipa_letter, ...Array<ipa_diacritic>])

export type correspondence = (number | null)[]

export type markedness_constraint = (output: word) => number

export type faithfulness_constraint = (input: word, output: word, corr: correspondence) => number

export type mora = ipa_letter[]

export enum syllable_weight {
    light = "light",
    heavy = "heavy"
}

export type syllable = {
    onset?: ipa_letter[],
    nucleus: ipa_letter[],
    coda?: ipa_letter[],
    weight: syllable_weight,
    tone?: ""
}

export const LETTER = "letter"
export const DIAC = "diacritic"
export const SUPRA = "suprasegmental"

export function is_diacritic(symbol: ipa_symbol): symbol is ipa_diacritic {
    return (symbol as ipa_diacritic).type === DIAC;
}

export function is_supra(symbol: ipa_symbol): symbol is ipa_suprasegmental {
    return (symbol as ipa_suprasegmental).type === SUPRA;
}

export function is_letter(symbol: ipa_symbol | ipa_segment): symbol is ipa_letter {
    if (Array.isArray(symbol)) {
        return false
    }
    return (symbol as ipa_letter).type === LETTER;
}

export function is_consonant(symbol: ipa_letter): symbol is ipa_consonant {
    return (symbol as ipa_consonant).consonant === true;
}

export function is_vowel(symbol: ipa_letter): symbol is ipa_vowel {
    return (symbol as ipa_vowel).vowel === true;
}