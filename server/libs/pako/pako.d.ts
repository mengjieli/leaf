declare module pako {
    export function gzip(data:Uint8Array, options):Uint8Array;
    export function ungzip(data:Uint8Array):Uint8Array;
}