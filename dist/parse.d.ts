import { word } from "./types";
interface parse_options {
    use_branner?: boolean;
    use_ipa_sym?: boolean;
    use_ipa_ent?: boolean;
}
export declare function parse(input: string, options?: parse_options): word | undefined;
export {};
