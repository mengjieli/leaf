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
      const array = new ByteArray();
      array.writeShortUTF(data.srv);
      array.writeShortUTF(data.cmd);
      array.writeInt(msgSeq);
      if (this.compressed == 'gzip') {
        array._writeUint8Array(msgpack.encode(data.params));
      }
      if (orange.hasListener(this, orange.Event.SEND)) {
        orange.emitWith(this, orange.Event.SEND, data);
      }
      return {
        sequence: msgSeq,
        bytes: pako.gzip(array.bytes, { level: 9 })
      };
    }

    public decode(bytes: Uint8Array): NetReceiveMessage {
      if (this.compressed == 'gzip') {
        (bytes = pako.ungzip(bytes));
      }
      let data = msgpack.decode(bytes);
      if (orange.hasListener(this, orange.Event.DATA)) {
        orange.emitWith(this, orange.Event.DATA, data);
      }
      return new NetReceiveMessage(
        {
          errorCode: data.code == null ? 0 : data.code,
          errorMessage: data.error,
          command: data.cmd,
          sequence: data.rSeq,
          serverSequence: data.seq,
          serverTime: data.time,
          body: data.body ? msgpack.decode(data.body) : null
        }
      );
    }
  }
}