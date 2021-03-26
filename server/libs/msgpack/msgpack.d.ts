declare namespace msgpack {
  function encode(data: any): Uint8Array;
  function decode(Uint8Array): any;
}