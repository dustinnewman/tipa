import { word, syllable } from "./types";
interface syllabify_options {
    ignore_initial_syllab?: boolean;
    ignore_final_syllab?: boolean;
}
export declare function syllabify(_input: word, options?: syllabify_options): syllable[] | undefined;
export {};
