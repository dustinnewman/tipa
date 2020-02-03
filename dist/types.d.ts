export declare enum feature {
    neg = -1,
    zero = 0,
    pos = 1
}
export declare type place = string;
export declare type manner = string;
export interface feature_matrix {
    SYL: feature;
    STRES: feature;
    LONG: feature;
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
export declare type ipa_symbol = {
    name: string;
    type: string;
    ipa_sym: string;
    ipa_ent: string;
    branner: string;
    number: number;
};
export declare type ipa_diacritic = ipa_symbol;
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
export declare type word = ipa_symbol[];
export declare function is_diacritic(symbol: ipa_symbol): symbol is ipa_diacritic;
export declare function is_letter(symbol: ipa_symbol): symbol is ipa_letter;
