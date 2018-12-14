'use strict';

// node.js class
const node_const = require('constants');

const translationTable = {};

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
exports.write_excl  = node_const.O_CREAT | node_const.O_TRUNC | node_const.O_WRONLY | node_const.O_EXCL;

exports.import = function (object) {
    for (const k in exports) {
        if (k === 'import') continue;
        if (k === 'translate') continue;
        if (k === 'connection') continue;
        if (exports.hasOwnProperty(k)) {
            object[k.toUpperCase()] = exports[k];
        }
    }
};

exports.translate = function (value) {

    // cache the translationTable object
    if (Object.keys(translationTable).length === 0) {
        for (const k in exports) {
            if (typeof exports[k] === 'number') {
                translationTable[exports[k]] = k.toUpperCase();
            }
        }
    }

    if (translationTable[value]) return translationTable[value];
    return 'UNKNOWN';
};

exports.import(exports);

exports.connection = {
    state: {
        CMD:             1,
        LOOP:            2,
        DATA:            3,
        PAUSE:           4,
        PAUSE_SMTP:      5,
        PAUSE_DATA:      6,
        DISCONNECTING:   99,
        DISCONNECTED:    100,
    }
}

Object.keys(exports.connection.state).forEach((state) => {
    exports.connection.state['STATE_' + state] = exports.connection.state[state];
})