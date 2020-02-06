import { phone, stop, ipa_consonant, sonorant, voiceless } from "./types";
export declare function devoice(input: phone): voiceless | undefined;
export declare function voice(input: phone): phone | undefined;
export declare function nasalize(input: sonorant): phone | undefined;
export declare function denasalize(input: phone): phone | undefined;
export declare function ejectivize(input: stop): phone | undefined;
export declare function aspirate(input: ipa_consonant): ipa_consonant | undefined;
