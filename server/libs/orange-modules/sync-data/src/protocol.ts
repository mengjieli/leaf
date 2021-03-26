namespace syncData {

  export class Protocol implements orange.INetProtocol {

    /**
     * @internal
     */
    private _seq = 1;

    /**
     * @internal
     */
    setSeq = 0;

    public compressed: 'gzip' | null = null;

    public encode(data: any): orange.INetSendMessage {
      let msgSeq = this.setSeq || this._seq++;
      let bytes = null;
      let msg = {
        cmd: data.cmd,
        seq: msgSeq,
        body: msgpack.encode(data.params)
      };
      (bytes = msgpack.encode(msg));
      if (this.compressed == 'gzip') {
        (bytes = pako.gzip(bytes, { level: 9 }));
      }
      if (orange.hasListener(this, orange.Event.SEND)) {
        orange.emitWith(this, orange.Event.SEND, data);
      }
      return {
        sequence: msgSeq,
        bytes: bytes
      };
    }

    public decode(bytes: Uint8Array): INetReceiveMessage {
      if (this.compressed == 'gzip') {
        (bytes = pako.ungzip(bytes));
      }
      let data = msgpack.decode(bytes);
      if (orange.hasListener(this, orange.Event.DATA)) {
        orange.emitWith(this, orange.Event.DATA, data);
      }
      return {
        errorCode: data.code == null ? 0 : data.code,
        errorMessage: data.error,
        command: data.cmd,
        sequence: data.rSeq,
        serverSequence: data.seq,
        body: data.body ? msgpack.decode(data.body) : null
      };
    }
  }
}