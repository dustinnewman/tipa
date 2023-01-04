import { ipa_symbol } from "./types";
interface tokenize_options {
    use_branner?: boolean;
    use_ipa_sym?: boolean;
    use_ipa_ent?: boolean;
    auto_syllabify_start?: boolean;
    auto_syllabify_end?: boolean;
}
export declare function tokenize(_input: string, options?: tokenize_options): ipa_symbol[] | undefined;
export {};
