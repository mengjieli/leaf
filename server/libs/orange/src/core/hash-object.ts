namespace orange {

  var hash = 1;

  export class HashObject {

    constructor() {
      this._hash = hash++;
    }

    /**
     * @internal
     */
    _hash: number;

    public get hash() {
      return this._hash;
    }

    static get hash(): number {
      return hash;
    }

  }
}