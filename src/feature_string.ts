import {
    feature,
    feature_matrix,
    feature_string,
} from "./types"

const NEG_CHAR = "-"
const POS_CHAR = "+"
const ZERO_CHAR = "0"

function get_char(f: feature): string {
    if (f === feature.neg) {
        return NEG_CHAR
    } else if (f === feature.pos) {
        return POS_CHAR
    } else if (f === feature.zero) {
        return ZERO_CHAR
    } else {
        return "?"
    }
}

enum feat_ord {
    SYL = 0,
    CONS,
    SON,
    CONT,
    DELREL,
    APPROX,
    TAP,
    TRIL,
    LAT,
    NASAL,
    VOICE,
    SP_GLOT,
    CON_GLOT,
    LABIAL,
    ROUND,
    LAB_DEN,
    CORONAL,
    ANT,
    DISTRO,
    STRID,
    DORSAL,
    HIGH,
    LOW,
    FRONT,
    BACK,
    TENSE
}

function get(fs: feature_string, index: number): feature {
    const char = fs[index]
    if (char === NEG_CHAR) {
        return feature.neg
    } else if (char === POS_CHAR) {
        return feature.pos
    } else {
        return feature.zero
    }
}

export function get_syl(fs: feature_string): feature {
    return get(fs, feat_ord.SYL)
}

export function get_cons(fs: feature_string): feature {
    return get(fs, feat_ord.SYL)
}

export function get_son(fs: feature_string, value: feature): feature {
    return get(fs, feat_ord.SON)
}

export function get_cont(fs: feature_string, value: feature): feature {
    return get(fs, feat_ord.CONT)
}

export function get_delrel(fs: feature_string, value: feature): feature {
    return get(fs, feat_ord.DELREL)
}

export function get_approx(fs: feature_string, value: feature): feature {
    return get(fs, feat_ord.APPROX)
}

export function get_tap(fs: feature_string, value: feature): feature {
    return get(fs, feat_ord.TAP)
}

export function get_tril(fs: feature_string, value: feature): feature {
    return get(fs, feat_ord.TRIL)
}

export function get_lat(fs: feature_string, value: feature): feature {
    return get(fs, feat_ord.LAT)
}

export function get_nasal(fs: feature_string, value: feature): feature {
    return get(fs, feat_ord.NASAL)
}

export function get_voice(fs: feature_string, value: feature): feature {
    return get(fs, feat_ord.VOICE)
}

export function get_sp_glot(fs: feature_string, value: feature): feature {
    return get(fs, feat_ord.SP_GLOT)
}

export function get_con_glot(fs: feature_string, value: feature): feature {
    return get(fs, feat_ord.CON_GLOT)
}

export function get_labial(fs: feature_string, value: feature): feature {
    return get(fs, feat_ord.LABIAL)
}

export function get_round(fs: feature_string, value: feature): feature {
    return get(fs, feat_ord.ROUND)
}

export function get_lab_dent(fs: feature_string, value: feature): feature {
    return get(fs, feat_ord.LAB_DEN)
}

export function get_coronal(fs: feature_string, value: feature): feature {
    return get(fs, feat_ord.CORONAL)
}

export function get_ant(fs: feature_string, value: feature): feature {
    return get(fs, feat_ord.ANT)
}

export function get_distro(fs: feature_string, value: feature): feature {
    return get(fs, feat_ord.DISTRO)
}

export function get_strid(fs: feature_string, value: feature): feature {
    return get(fs, feat_ord.STRID)
}

export function get_dorsal(fs: feature_string, value: feature): feature {
    return get(fs, feat_ord.DORSAL)
}

export function get_high(fs: feature_string, value: feature): feature {
    return get(fs, feat_ord.HIGH)
}

export function get_low(fs: feature_string, value: feature): feature {
    return get(fs, feat_ord.LOW)
}

export function get_front(fs: feature_string, value: feature): feature {
    return get(fs, feat_ord.FRONT)
}

export function get_back(fs: feature_string, value: feature): feature {
    return get(fs, feat_ord.BACK)
}

export function get_tense(fs: feature_string, value: feature): feature {
    return get(fs, feat_ord.TENSE)
}

function set_feature(fs: feature_string, value: feature, index: number): feature_string {
    const char = get_char(value)
    return fs.slice(0, index) + char + fs.slice(index + 1, fs.length)
}

export function set_syl(fs: feature_string, value: feature): feature_string {
    return set_feature(fs, value, feat_ord.SYL)
}

export function set_cons(fs: feature_string, value: feature): feature_string {
    return set_feature(fs, value, feat_ord.CONS)
}

export function set_son(fs: feature_string, value: feature): feature_string {
    return set_feature(fs, value, feat_ord.SON)
}

export function set_cont(fs: feature_string, value: feature): feature_string {
    return set_feature(fs, value, feat_ord.CONT)
}

export function set_delrel(fs: feature_string, value: feature): feature_string {
    return set_feature(fs, value, feat_ord.DELREL)
}

export function set_approx(fs: feature_string, value: feature): feature_string {
    return set_feature(fs, value, feat_ord.APPROX)
}

export function set_tap(fs: feature_string, value: feature): feature_string {
    return set_feature(fs, value, feat_ord.TAP)
}

export function set_tril(fs: feature_string, value: feature): feature_string {
    return set_feature(fs, value, feat_ord.TRIL)
}

export function set_lat(fs: feature_string, value: feature): feature_string {
    return set_feature(fs, value, feat_ord.LAT)
}

export function set_nasal(fs: feature_string, value: feature): feature_string {
    return set_feature(fs, value, feat_ord.NASAL)
}

export function set_voice(fs: feature_string, value: feature): feature_string {
    return set_feature(fs, value, feat_ord.VOICE)
}

export function set_sp_glot(fs: feature_string, value: feature): feature_string {
    return set_feature(fs, value, feat_ord.SP_GLOT)
}

export function set_con_glot(fs: feature_string, value: feature): feature_string {
    return set_feature(fs, value, feat_ord.CON_GLOT)
}

export function set_labial(fs: feature_string, value: feature): feature_string {
    return set_feature(fs, value, feat_ord.LABIAL)
}

export function set_round(fs: feature_string, value: feature): feature_string {
    return set_feature(fs, value, feat_ord.ROUND)
}

export function set_lab_dent(fs: feature_string, value: feature): feature_string {
    return set_feature(fs, value, feat_ord.LAB_DEN)
}

export function set_coronal(fs: feature_string, value: feature): feature_string {
    return set_feature(fs, value, feat_ord.CORONAL)
}

export function set_ant(fs: feature_string, value: feature): feature_string {
    return set_feature(fs, value, feat_ord.ANT)
}

export function set_distro(fs: feature_string, value: feature): feature_string {
    return set_feature(fs, value, feat_ord.DISTRO)
}

export function set_strid(fs: feature_string, value: feature): feature_string {
    return set_feature(fs, value, feat_ord.STRID)
}

export function set_dorsal(fs: feature_string, value: feature): feature_string {
    return set_feature(fs, value, feat_ord.DORSAL)
}

export function set_high(fs: feature_string, value: feature): feature_string {
    return set_feature(fs, value, feat_ord.HIGH)
}

export function set_low(fs: feature_string, value: feature): feature_string {
    return set_feature(fs, value, feat_ord.LOW)
}

export function set_front(fs: feature_string, value: feature): feature_string {
    return set_feature(fs, value, feat_ord.FRONT)
}

export function set_back(fs: feature_string, value: feature): feature_string {
    return set_feature(fs, value, feat_ord.BACK)
}

export function set_tense(fs: feature_string, value: feature): feature_string {
    return set_feature(fs, value, feat_ord.TENSE)
}

export function get_feature_string(i: feature_matrix): feature_string {
    let fs: feature_string = ""
    fs += get_char(i.SYL)
    fs += get_char(i.CONS)
    fs += get_char(i.SON)
    fs += get_char(i.CONT)
    fs += get_char(i.DELREL)
    fs += get_char(i.APPROX)
    fs += get_char(i.TAP)
    fs += get_char(i.TRIL)
    fs += get_char(i.LAT)
    fs += get_char(i.NASAL)
    fs += get_char(i.VOICE)
    fs += get_char(i.SP_GLOT)
    fs += get_char(i.CON_GLOT)
    fs += get_char(i.LABIAL)
    fs += get_char(i.ROUND)
    fs += get_char(i.LAB_DEN)
    fs += get_char(i.CORONAL)
    fs += get_char(i.ANT)
    fs += get_char(i.DISTRO)
    fs += get_char(i.STRID)
    fs += get_char(i.DORSAL)
    fs += get_char(i.HIGH)
    fs += get_char(i.LOW)
    fs += get_char(i.FRONT)
    fs += get_char(i.BACK)
    fs += get_char(i.TENSE)
    return fs
}