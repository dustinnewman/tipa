import { word, ipa_segment } from "./types";
interface syllabify_options {
    ignore_initial_syllab?: boolean;
    ignore_final_syllab?: boolean;
    diphthong_is_heavy?: boolean;
    coda_is_heavy?: boolean;
    long_is_heavy?: boolean;
    mark_superheavy?: boolean;
}
export declare function syllabify(_input: ipa_segment[], options?: syllabify_options): word | undefined;
export {};
