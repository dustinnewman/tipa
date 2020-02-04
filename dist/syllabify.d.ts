import { word, ipa_segment } from "./types";
interface syllabify_options {
    ignore_initial_syllab?: boolean;
    ignore_final_syllab?: boolean;
}
export declare function syllabify(_input: ipa_segment[], options?: syllabify_options): word | undefined;
export {};
