"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var NEG_CHAR = "-";
var POS_CHAR = "+";
var ZERO_CHAR = "0";
function get_char(f) {
    if (f === types_1.feature.neg) {
        return NEG_CHAR;
    }
    else if (f === types_1.feature.pos) {
        return POS_CHAR;
    }
    else if (f === types_1.feature.zero) {
        return ZERO_CHAR;
    }
    else {
        return "?";
    }
}
var feat_ord;
(function (feat_ord) {
    feat_ord[feat_ord["SYL"] = 0] = "SYL";
    feat_ord[feat_ord["CONS"] = 1] = "CONS";
    feat_ord[feat_ord["SON"] = 2] = "SON";
    feat_ord[feat_ord["CONT"] = 3] = "CONT";
    feat_ord[feat_ord["DELREL"] = 4] = "DELREL";
    feat_ord[feat_ord["APPROX"] = 5] = "APPROX";
    feat_ord[feat_ord["TAP"] = 6] = "TAP";
    feat_ord[feat_ord["TRIL"] = 7] = "TRIL";
    feat_ord[feat_ord["LAT"] = 8] = "LAT";
    feat_ord[feat_ord["NASAL"] = 9] = "NASAL";
    feat_ord[feat_ord["VOICE"] = 10] = "VOICE";
    feat_ord[feat_ord["SP_GLOT"] = 11] = "SP_GLOT";
    feat_ord[feat_ord["CON_GLOT"] = 12] = "CON_GLOT";
    feat_ord[feat_ord["LABIAL"] = 13] = "LABIAL";
    feat_ord[feat_ord["ROUND"] = 14] = "ROUND";
    feat_ord[feat_ord["LAB_DEN"] = 15] = "LAB_DEN";
    feat_ord[feat_ord["CORONAL"] = 16] = "CORONAL";
    feat_ord[feat_ord["ANT"] = 17] = "ANT";
    feat_ord[feat_ord["DISTRO"] = 18] = "DISTRO";
    feat_ord[feat_ord["STRID"] = 19] = "STRID";
    feat_ord[feat_ord["DORSAL"] = 20] = "DORSAL";
    feat_ord[feat_ord["HIGH"] = 21] = "HIGH";
    feat_ord[feat_ord["LOW"] = 22] = "LOW";
    feat_ord[feat_ord["FRONT"] = 23] = "FRONT";
    feat_ord[feat_ord["BACK"] = 24] = "BACK";
    feat_ord[feat_ord["TENSE"] = 25] = "TENSE";
})(feat_ord || (feat_ord = {}));
function get(fs, index) {
    var char = fs[index];
    if (char === NEG_CHAR) {
        return types_1.feature.neg;
    }
    else if (char === POS_CHAR) {
        return types_1.feature.pos;
    }
    else {
        return types_1.feature.zero;
    }
}
function get_syl(fs) {
    return get(fs, feat_ord.SYL);
}
exports.get_syl = get_syl;
function get_cons(fs) {
    return get(fs, feat_ord.SYL);
}
exports.get_cons = get_cons;
function get_son(fs, value) {
    return get(fs, feat_ord.SON);
}
exports.get_son = get_son;
function get_cont(fs, value) {
    return get(fs, feat_ord.CONT);
}
exports.get_cont = get_cont;
function get_delrel(fs, value) {
    return get(fs, feat_ord.DELREL);
}
exports.get_delrel = get_delrel;
function get_approx(fs, value) {
    return get(fs, feat_ord.APPROX);
}
exports.get_approx = get_approx;
function get_tap(fs, value) {
    return get(fs, feat_ord.TAP);
}
exports.get_tap = get_tap;
function get_tril(fs, value) {
    return get(fs, feat_ord.TRIL);
}
exports.get_tril = get_tril;
function get_lat(fs, value) {
    return get(fs, feat_ord.LAT);
}
exports.get_lat = get_lat;
function get_nasal(fs, value) {
    return get(fs, feat_ord.NASAL);
}
exports.get_nasal = get_nasal;
function get_voice(fs, value) {
    return get(fs, feat_ord.VOICE);
}
exports.get_voice = get_voice;
function get_sp_glot(fs, value) {
    return get(fs, feat_ord.SP_GLOT);
}
exports.get_sp_glot = get_sp_glot;
function get_con_glot(fs, value) {
    return get(fs, feat_ord.CON_GLOT);
}
exports.get_con_glot = get_con_glot;
function get_labial(fs, value) {
    return get(fs, feat_ord.LABIAL);
}
exports.get_labial = get_labial;
function get_round(fs, value) {
    return get(fs, feat_ord.ROUND);
}
exports.get_round = get_round;
function get_lab_dent(fs, value) {
    return get(fs, feat_ord.LAB_DEN);
}
exports.get_lab_dent = get_lab_dent;
function get_coronal(fs, value) {
    return get(fs, feat_ord.CORONAL);
}
exports.get_coronal = get_coronal;
function get_ant(fs, value) {
    return get(fs, feat_ord.ANT);
}
exports.get_ant = get_ant;
function get_distro(fs, value) {
    return get(fs, feat_ord.DISTRO);
}
exports.get_distro = get_distro;
function get_strid(fs, value) {
    return get(fs, feat_ord.STRID);
}
exports.get_strid = get_strid;
function get_dorsal(fs, value) {
    return get(fs, feat_ord.DORSAL);
}
exports.get_dorsal = get_dorsal;
function get_high(fs, value) {
    return get(fs, feat_ord.HIGH);
}
exports.get_high = get_high;
function get_low(fs, value) {
    return get(fs, feat_ord.LOW);
}
exports.get_low = get_low;
function get_front(fs, value) {
    return get(fs, feat_ord.FRONT);
}
exports.get_front = get_front;
function get_back(fs, value) {
    return get(fs, feat_ord.BACK);
}
exports.get_back = get_back;
function get_tense(fs, value) {
    return get(fs, feat_ord.TENSE);
}
exports.get_tense = get_tense;
function set_feature(fs, value, index) {
    var char = get_char(value);
    return fs.slice(0, index) + char + fs.slice(index + 1, fs.length);
}
function set_syl(fs, value) {
    return set_feature(fs, value, feat_ord.SYL);
}
exports.set_syl = set_syl;
function set_cons(fs, value) {
    return set_feature(fs, value, feat_ord.CONS);
}
exports.set_cons = set_cons;
function set_son(fs, value) {
    return set_feature(fs, value, feat_ord.SON);
}
exports.set_son = set_son;
function set_cont(fs, value) {
    return set_feature(fs, value, feat_ord.CONT);
}
exports.set_cont = set_cont;
function set_delrel(fs, value) {
    return set_feature(fs, value, feat_ord.DELREL);
}
exports.set_delrel = set_delrel;
function set_approx(fs, value) {
    return set_feature(fs, value, feat_ord.APPROX);
}
exports.set_approx = set_approx;
function set_tap(fs, value) {
    return set_feature(fs, value, feat_ord.TAP);
}
exports.set_tap = set_tap;
function set_tril(fs, value) {
    return set_feature(fs, value, feat_ord.TRIL);
}
exports.set_tril = set_tril;
function set_lat(fs, value) {
    return set_feature(fs, value, feat_ord.LAT);
}
exports.set_lat = set_lat;
function set_nasal(fs, value) {
    return set_feature(fs, value, feat_ord.NASAL);
}
exports.set_nasal = set_nasal;
function set_voice(fs, value) {
    return set_feature(fs, value, feat_ord.VOICE);
}
exports.set_voice = set_voice;
function set_sp_glot(fs, value) {
    return set_feature(fs, value, feat_ord.SP_GLOT);
}
exports.set_sp_glot = set_sp_glot;
function set_con_glot(fs, value) {
    return set_feature(fs, value, feat_ord.CON_GLOT);
}
exports.set_con_glot = set_con_glot;
function set_labial(fs, value) {
    return set_feature(fs, value, feat_ord.LABIAL);
}
exports.set_labial = set_labial;
function set_round(fs, value) {
    return set_feature(fs, value, feat_ord.ROUND);
}
exports.set_round = set_round;
function set_lab_dent(fs, value) {
    return set_feature(fs, value, feat_ord.LAB_DEN);
}
exports.set_lab_dent = set_lab_dent;
function set_coronal(fs, value) {
    return set_feature(fs, value, feat_ord.CORONAL);
}
exports.set_coronal = set_coronal;
function set_ant(fs, value) {
    return set_feature(fs, value, feat_ord.ANT);
}
exports.set_ant = set_ant;
function set_distro(fs, value) {
    return set_feature(fs, value, feat_ord.DISTRO);
}
exports.set_distro = set_distro;
function set_strid(fs, value) {
    return set_feature(fs, value, feat_ord.STRID);
}
exports.set_strid = set_strid;
function set_dorsal(fs, value) {
    return set_feature(fs, value, feat_ord.DORSAL);
}
exports.set_dorsal = set_dorsal;
function set_high(fs, value) {
    return set_feature(fs, value, feat_ord.HIGH);
}
exports.set_high = set_high;
function set_low(fs, value) {
    return set_feature(fs, value, feat_ord.LOW);
}
exports.set_low = set_low;
function set_front(fs, value) {
    return set_feature(fs, value, feat_ord.FRONT);
}
exports.set_front = set_front;
function set_back(fs, value) {
    return set_feature(fs, value, feat_ord.BACK);
}
exports.set_back = set_back;
function set_tense(fs, value) {
    return set_feature(fs, value, feat_ord.TENSE);
}
exports.set_tense = set_tense;
function get_feature_string(i) {
    var fs = "";
    fs += get_char(i.SYL);
    fs += get_char(i.CONS);
    fs += get_char(i.SON);
    fs += get_char(i.CONT);
    fs += get_char(i.DELREL);
    fs += get_char(i.APPROX);
    fs += get_char(i.TAP);
    fs += get_char(i.TRIL);
    fs += get_char(i.LAT);
    fs += get_char(i.NASAL);
    fs += get_char(i.VOICE);
    fs += get_char(i.SP_GLOT);
    fs += get_char(i.CON_GLOT);
    fs += get_char(i.LABIAL);
    fs += get_char(i.ROUND);
    fs += get_char(i.LAB_DEN);
    fs += get_char(i.CORONAL);
    fs += get_char(i.ANT);
    fs += get_char(i.DISTRO);
    fs += get_char(i.STRID);
    fs += get_char(i.DORSAL);
    fs += get_char(i.HIGH);
    fs += get_char(i.LOW);
    fs += get_char(i.FRONT);
    fs += get_char(i.BACK);
    fs += get_char(i.TENSE);
    return fs;
}
exports.get_feature_string = get_feature_string;
