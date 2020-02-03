import {
    feature,
    feature_matrix,
    feature_string,
} from "./types"

function get_char(f: feature): string {
    if (f === feature.neg) {
        return "-"
    } else if (f === feature.pos) {
        return "+"
    } else if (f === feature.zero) {
        return "0"
    } else {
        return "?"
    }
}

export function get_feature_string(i: feature_matrix): feature_string {
    let fs: feature_string = ""
    fs += get_char(i.SYL)
    fs += get_char(i.STRES)
    fs += get_char(i.LONG)
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