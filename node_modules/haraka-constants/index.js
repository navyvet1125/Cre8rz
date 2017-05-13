'use strict';

var translationTable = {};

exports.cont               = 900;
exports.stop               = 901;
exports.deny               = 902;
exports.denysoft           = 903;
exports.denydisconnect     = 904;
exports.disconnect         = 905;
exports.ok                 = 906;
exports.next_hook          = 907;
exports.delay              = 908;
exports.denysoftdisconnect = 909;

exports.import = function (object) {
    for (var k in exports) {
        if (k === 'import') continue;
        if (k === 'translate') continue;
        if (exports.hasOwnProperty(k)) {
            object[k.toUpperCase()] = exports[k];
        }
    }
};

exports.translate = function (value) {

    // cache the translationTable object
    if (Object.keys(translationTable).length === 0) {
        for (var k in exports) {
            if (typeof exports[k] === 'number') {
                translationTable[exports[k]] = k.toUpperCase();
            }
        }
    }

    if (translationTable[value]) return translationTable[value];
    return 'UNKNOWN';
};

exports.import(exports);