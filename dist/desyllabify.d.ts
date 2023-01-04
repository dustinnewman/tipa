import { word, ipa_segment } from "./types";
interface desyllabify_options {
    leading_syllab?: boolean;
    trailing_syllab?: boolean;
}
export declare function desyllabify(input: word, options?: desyllabify_options): ipa_segment[] | undefined;
export {};
