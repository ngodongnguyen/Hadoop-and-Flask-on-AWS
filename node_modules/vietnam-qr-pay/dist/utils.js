"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToUint8Array = void 0;
const stringToUint8Array = (content) => {
    if (typeof TextEncoder !== 'undefined') {
        const encoder = new TextEncoder();
        return encoder.encode(content);
    }
    const octets = [];
    const length = content.length;
    let i = 0;
    while (i < length) {
        const codePoint = content.codePointAt(i);
        let c = 0;
        let bits = 0;
        if (codePoint <= 0x0000007F) {
            c = 0;
            bits = 0x00;
        }
        else if (codePoint <= 0x000007FF) {
            c = 6;
            bits = 0xC0;
        }
        else if (codePoint <= 0x0000FFFF) {
            c = 12;
            bits = 0xE0;
        }
        else if (codePoint <= 0x001FFFFF) {
            c = 18;
            bits = 0xF0;
        }
        octets.push(bits | (codePoint >> c));
        c -= 6;
        while (c >= 0) {
            octets.push(0x80 | ((codePoint >> c) & 0x3F));
            c -= 6;
        }
        i += codePoint >= 0x10000 ? 2 : 1;
    }
    return new Uint8Array(octets);
};
exports.stringToUint8Array = stringToUint8Array;
