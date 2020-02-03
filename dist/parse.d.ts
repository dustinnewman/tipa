import { word } from "./types";
interface parse_options {
    use_branner?: boolean;
    use_ipa_sym?: boolean;
    use_ipa_ent?: boolean;
    auto_syllabify_start?: boolean;
    auto_syllabify_end?: boolean;
}
export declare function parse(_input: string, options?: parse_options): word | undefined;
export {};
