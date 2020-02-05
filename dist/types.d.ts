export declare enum feature {
    neg = -1,
    zero = 0,
    pos = 1
}
export declare type place = string;
export declare type manner = string;
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
export declare type feature_string = string;
export declare type ipa_symbol = {
    name: string;
    type: string;
    ipa_sym: string;
    ipa_ent: string;
    branner: string;
    number: number;
};
export declare type ipa_diacritic = ipa_symbol;
export declare type ipa_suprasegmental = ipa_symbol;
export declare type ipa_vowel = ipa_symbol & {
    place: place;
    consonant: boolean;
    vowel: boolean;
    features: feature_matrix;
};
export declare type ipa_consonant = ipa_vowel & {
    manner: manner;
};
export declare type ipa_letter = ipa_vowel | ipa_consonant;
export declare type phone = ipa_letter | ([ipa_letter, ...Array<ipa_diacritic>]);
export declare type ipa_segment = phone | ipa_suprasegmental;
export declare type mora = phone[];
export declare enum syllable_weight {
    light = "light",
    heavy = "heavy",
    superheavy = "superheavy"
}
export declare type syllable = {
    onset?: ipa_segment[];
    nucleus?: ipa_segment[];
    coda?: ipa_segment[];
    weight?: syllable_weight;
    segments: ipa_segment[];
};
export declare type word = syllable[];
export declare type correspondence = (number | null)[];
export declare type markedness_constraint = (output: word) => number;
export declare type faithfulness_constraint = (input: word, output: word, corr: correspondence) => number;
export declare const LETTER = "letter";
export declare const DIAC = "diacritic";
export declare const SUPRA = "suprasegmental";
export declare function is_diacritic(symbol: ipa_symbol): symbol is ipa_diacritic;
export declare function is_supra(symbol: ipa_symbol): symbol is ipa_suprasegmental;
export declare function is_letter(symbol: ipa_symbol): symbol is ipa_letter;
export declare function is_phone(symbol: (ipa_symbol | (ipa_symbol[]))): symbol is phone;
export declare function is_consonant(symbol: phone): symbol is ipa_consonant;
export declare function is_vowel(symbol: phone): symbol is ipa_vowel;
export declare function is_syllabic(symbol: phone): boolean;
