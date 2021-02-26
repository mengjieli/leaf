var Base64 = {
    e: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    decode: (r) => {
        var o = String(r).replace(/=+$/, "");
        if (o.length % 4 == 1) throw "'atob' failed: The string to be decoded is not correctly encoded.";
        for (var n, a, i = 0, c = 0, d = ""; a = o.charAt(c++); ~a && (n = i % 4 ? 64 * n + a : a, i++ % 4) ? d += String.fromCharCode(255 & n >> (-2 * i & 6)) : 0)a = Base64.e.indexOf(a);
        return d
    },
    encode: (r) => {
        for (var o, n, a = String(r), i = 0, c = Base64.e, d = ""; a.charAt(0 | i) || (c = "=", i % 1); d += c.charAt(63 & o >> 8 - i % 1 * 8)) {
            if (n = a.charCodeAt(i += .75), n > 255) throw "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.";
            o = o << 8 | n
        }
        return d
    }
}

export function compressJSON(json) {
    let str = JSON.stringify(json);
    let arr = encodeUTF8(str);
    let byte = new Uint8Array(arr);
    let cm = pako.gzip(byte, { level: 9 });
    let encode = (bytes) => {
        var bString = "";
        for (var i = 0, len = bytes.length; i < len; ++i) {
            bString += String.fromCharCode(bytes[i]);
        }
        return Base64.encode(bString);
    }
    return `["${encode(cm)}"]`;
}

export function decodeJSON(content) {
    let decode = (base64Str) => {
        var bString = base64Str//Base64.decode(base64Str);
        var len = bString.length;
        var arr = new Uint8Array(len);
        while (len--) {
            arr[len] = bString.charCodeAt(len);
        }
        return arr;
    }
    return JSON.parse(decodeUTF8(Array.from(pako.ungzip(decode(content)))));
}